import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/colors';
import { COURSES } from '../services/courseData';
import { loadProfile, saveProfile, loadProgress } from '../services/storage';
import EmptyState from '../components/EmptyState';

const DEFAULT_PROFILE = { name: 'Mahasiswa Baru', nickname: '', avatar: null };

export default function ProfileScreen() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const p = (await loadProfile()) || DEFAULT_PROFILE;
        setProfile(p);
        setNameInput(p.name);
        setNicknameInput(p.nickname);

        const progress = await loadProgress();
        const submitted = COURSES
          .filter(c => progress[c.id]?.done)
          .map(c => ({ ...c, ...progress[c.id] }));
        setTasks(submitted);
      })();
    }, [])
  );

  const pickAvatar = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Izin dibutuhkan', 'Aplikasi butuh akses galeri untuk mengganti foto profil.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (result.canceled) return;

    const updated = { ...profile, avatar: result.assets[0].uri };
    setProfile(updated);
    await saveProfile(updated);
  };

  const handleSave = async () => {
    const updated = { ...profile, name: nameInput.trim() || DEFAULT_PROFILE.name, nickname: nicknameInput.trim() };
    setProfile(updated);
    await saveProfile(updated);
    setEditing(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickAvatar} activeOpacity={0.8}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{(profile.name || '?').charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.avatarEditBadge}>
            <Text style={styles.avatarEditIcon}>📷</Text>
          </View>
        </TouchableOpacity>

        {editing ? (
          <View style={styles.editForm}>
            <TextInput
              style={styles.input}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Nama lengkap"
              placeholderTextColor="#C7D2FE"
            />
            <TextInput
              style={styles.input}
              value={nicknameInput}
              onChangeText={setNicknameInput}
              placeholder="Nickname"
              placeholderTextColor="#C7D2FE"
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{profile.name}</Text>
            {profile.nickname ? <Text style={styles.nickname}>@{profile.nickname}</Text> : null}
            <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
              <Text style={styles.editBtnText}>Edit Profil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{COURSES.length}</Text>
          <Text style={styles.statLabel}>Mata Kuliah</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Tugas Selesai</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Data Tugas</Text>
      {tasks.length === 0 ? (
        <EmptyState message="Belum ada tugas yang dikumpulkan." icon="📝" />
      ) : (
        tasks.map(t => (
          <View key={t.id} style={styles.taskRow}>
            <Image source={{ uri: t.taskPhoto }} style={styles.taskThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.taskName} numberOfLines={1}>{t.name}</Text>
              <Text style={styles.taskDate}>{t.submittedAt ? `Dikumpulkan ${t.submittedAt}` : ''}</Text>
            </View>
            <View style={[styles.taskBadge, { backgroundColor: t.color }]}>
              <Text style={styles.taskBadgeText}>{t.icon}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 40 },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#fff' },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarInitial: { fontSize: 36, fontWeight: '800', color: '#fff' },
  avatarEditBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: COLORS.accent,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarEditIcon: { fontSize: 13 },
  name: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 14 },
  nickname: { fontSize: 13, color: '#E0E7FF', marginTop: 2 },
  editBtn: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  editBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  editForm: { width: '100%', marginTop: 16 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 14,
    color: '#fff',
    marginBottom: 10,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: -18, gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: { fontSize: 22, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  taskThumb: { width: 44, height: 44, borderRadius: 12, marginRight: 12 },
  taskName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  taskDate: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  taskBadge: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  taskBadgeText: { fontSize: 14 },
});