import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { COURSES } from '../services/courseData';
import { loadProgress } from '../services/storage';
import EmptyState from '../components/EmptyState';

export default function ProgressScreen() {
  const [progress, setProgress] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
    }, [])
  );

  const total = COURSES.length;
  const done = COURSES.filter(c => progress[c.id]?.done).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress Belajar 🎯</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.headerSubtitle}>{done} dari {total} mata kuliah • {pct}%</Text>
      </View>

      <FlatList
        data={COURSES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState message="Belum ada mata kuliah." />}
        renderItem={({ item }) => {
          const p = progress[item.id];
          return (
            <View style={styles.row}>
              {p?.taskPhoto ? (
                <Image source={{ uri: p.taskPhoto }} style={styles.thumb} />
              ) : (
                <View style={[styles.iconWrap, { backgroundColor: item.color + '22' }]}>
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.courseName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.courseMeta}>
                  {p?.done ? `Dikumpulkan${p.submittedAt ? ' • ' + p.submittedAt : ''}` : 'Belum dikerjakan'}
                </Text>
              </View>
              <View style={[styles.statusDot, { backgroundColor: p?.done ? COLORS.success : COLORS.border }]} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 14 },
  progressBarBg: { height: 10, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 6, overflow: 'hidden' },
  progressBarFill: { height: 10, backgroundColor: '#fff', borderRadius: 6 },
  headerSubtitle: { color: '#E0E7FF', fontSize: 13, marginTop: 8 },

  list: { paddingVertical: 16, paddingBottom: 32 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  iconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconText: { fontSize: 20 },
  thumb: { width: 42, height: 42, borderRadius: 12, marginRight: 12 },
  courseName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  courseMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginLeft: 8 },
});