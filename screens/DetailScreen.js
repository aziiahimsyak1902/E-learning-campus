import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/colors';
import { loadProgress, updateCourseProgress } from '../services/storage';

export default function DetailScreen({ route }) {
  const course = route.params?.course;
  const [progress, setProgress] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (course) {
      loadProgress().then(all => setProgress(all[course.id] || null));
    }
  }, [course]);

  if (!course) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Tidak ada detail mata kuliah.</Text>
      </View>
    );
  }

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Izin dibutuhkan', 'Aplikasi butuh akses galeri untuk mengunggah foto tugas.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
    });

    if (result.canceled) return;

    setUploading(true);
    try {
      const uri = result.assets[0].uri;
      const updated = await updateCourseProgress(course.id, {
        done: true,
        taskPhoto: uri,
        submittedAt: new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      });
      setProgress(updated[course.id]);
    } finally {
      setUploading(false);
    }
  };

  const removeSubmission = async () => {
    const updated = await updateCourseProgress(course.id, {
      done: false,
      taskPhoto: null,
      submittedAt: null,
    });
    setProgress(updated[course.id]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.heroBadge, { backgroundColor: course.color + '22' }]}>
        <Text style={styles.heroIcon}>{course.icon}</Text>
      </View>

      <Text style={styles.title}>{course.name}</Text>

      <View style={styles.metaRow}>
        <View style={[styles.metaChip, { backgroundColor: course.color }]}>
          <Text style={styles.metaChipText}>{course.lecturer}</Text>
        </View>
        <View style={styles.metaChipOutline}>
          <Text style={styles.metaChipOutlineText}>{course.schedule}</Text>
        </View>
      </View>

      <Text style={styles.label}>Deskripsi</Text>
      <Text style={styles.text}>{course.description}</Text>

      <Text style={styles.label}>Materi</Text>
      <Text style={styles.text}>{course.material}</Text>

      <Text style={styles.label}>Tugas</Text>

      {progress?.taskPhoto ? (
        <View style={styles.submissionCard}>
          <Image source={{ uri: progress.taskPhoto }} style={styles.submissionImage} />
          <View style={styles.submissionInfo}>
            <View style={styles.doneRow}>
              <Text style={styles.doneCheck}>✓</Text>
              <Text style={styles.doneText}>Tugas terkumpul</Text>
            </View>
            {progress.submittedAt ? (
              <Text style={styles.submittedAt}>Dikumpulkan {progress.submittedAt}</Text>
            ) : null}
            <View style={styles.submissionActions}>
              <TouchableOpacity style={styles.reuploadBtn} onPress={pickImage} disabled={uploading}>
                <Text style={styles.reuploadText}>Ganti Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeBtn} onPress={removeSubmission} disabled={uploading}>
                <Text style={styles.removeText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadBox, { borderColor: course.color }]}
          onPress={pickImage}
          disabled={uploading}
          activeOpacity={0.7}
        >
          {uploading ? (
            <ActivityIndicator color={course.color} />
          ) : (
            <>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={[styles.uploadText, { color: course.color }]}>Upload Foto Tugas</Text>
              <Text style={styles.uploadHint}>Ambil dari galeri sebagai bukti pengumpulan</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 48 },
  heroBadge: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroIcon: { fontSize: 32 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 12 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  metaChip: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 8 },
  metaChipText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  metaChipOutline: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  metaChipOutlineText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '800', color: COLORS.textMuted, marginTop: 20, letterSpacing: 0.5, textTransform: 'uppercase' },
  text: { fontSize: 16, color: COLORS.text, marginTop: 6, lineHeight: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background, padding: 24 },
  message: { fontSize: 16, color: COLORS.textMuted, textAlign: 'center' },

  uploadBox: {
    marginTop: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: COLORS.card,
  },
  uploadIcon: { fontSize: 30, marginBottom: 8 },
  uploadText: { fontSize: 15, fontWeight: '700' },
  uploadHint: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },

  submissionCard: {
    marginTop: 10,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  submissionImage: { width: 90, height: 90, borderRadius: 12, marginRight: 12 },
  submissionInfo: { flex: 1, justifyContent: 'center' },
  doneRow: { flexDirection: 'row', alignItems: 'center' },
  doneCheck: { color: COLORS.success, fontSize: 16, fontWeight: '900', marginRight: 6 },
  doneText: { color: COLORS.success, fontWeight: '700', fontSize: 14 },
  submittedAt: { color: COLORS.textMuted, fontSize: 12, marginTop: 4 },
  submissionActions: { flexDirection: 'row', marginTop: 10 },
  reuploadBtn: { backgroundColor: COLORS.primary, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, marginRight: 8 },
  reuploadText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  removeBtn: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: COLORS.danger },
  removeText: { color: COLORS.danger, fontSize: 12, fontWeight: '700' },
});