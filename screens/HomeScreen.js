import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COURSES } from '../services/courseData';
import { loadProgress } from '../services/storage';
import ItemCard from '../components/ItemCard';
import { COLORS } from '../constants/colors';

export default function HomeScreen({ navigation }) {
  const [progress, setProgress] = useState({});

  useFocusEffect(
    useCallback(() => {
      loadProgress().then(setProgress);
    }, [])
  );

  const doneCount = COURSES.filter(c => progress[c.id]?.done).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mata Kuliah 📚</Text>
        <Text style={styles.headerSubtitle}>
          {doneCount}/{COURSES.length} tugas selesai semester ini
        </Text>
      </View>

      <FlatList
        data={COURSES}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            subtitle={`${item.lecturer} • ${item.schedule}`}
            icon={item.icon}
            color={item.color}
            badge={progress[item.id]?.done ? '✓ Selesai' : null}
            onPress={() => navigation.navigate('Detail', { course: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#E0E7FF',
    marginTop: 6,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});