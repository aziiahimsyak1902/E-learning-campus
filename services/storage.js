import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys terpusat supaya tidak ada typo tersebar di banyak file
const KEYS = {
  SESSION: '@elearning:session',
  PROGRESS: '@elearning:progress',
  PROFILE: '@elearning:profile',
};

// ---- Session (data user login) ----
export async function saveSession(user) {
  try {
    await AsyncStorage.setItem(KEYS.SESSION, JSON.stringify(user));
    return true;
  } catch (e) {
    console.warn('Gagal menyimpan session', e);
    return false;
  }
}

export async function loadSession() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Gagal memuat session', e);
    return null;
  }
}

export async function clearSession() {
  try {
    await AsyncStorage.removeItem(KEYS.SESSION);
    return true;
  } catch (e) {
    console.warn('Gagal menghapus session', e);
    return false;
  }
}

// ---- Progress belajar per mata kuliah ----
// object: { [courseId]: { done: bool, taskPhoto: uri, submittedAt: string } }
export async function saveProgress(progressObj) {
  try {
    await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(progressObj));
    return true;
  } catch (e) {
    console.warn('Gagal menyimpan progress', e);
    return false;
  }
}

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Gagal memuat progress', e);
    return {};
  }
}

export async function updateCourseProgress(courseId, patch) {
  const current = await loadProgress();
  const updated = {
    ...current,
    [courseId]: { ...(current[courseId] || {}), ...patch },
  };
  await saveProgress(updated);
  return updated;
}

// ---- Profil mahasiswa (nama, nickname, foto profil) ----
export async function saveProfile(profileObj) {
  try {
    await AsyncStorage.setItem(KEYS.PROFILE, JSON.stringify(profileObj));
    return true;
  } catch (e) {
    console.warn('Gagal menyimpan profil', e);
    return false;
  }
}

export async function loadProfile() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Gagal memuat profil', e);
    return null;
  }
}