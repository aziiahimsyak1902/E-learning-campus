# E-Learning Campus — Domain: E-Learning

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)
![AsyncStorage](https://img.shields.io/badge/AsyncStorage-Local_Persistence-00b894)

> E-Learning Campus adalah aplikasi mobile pembelajaran daring untuk mahasiswa, menampilkan daftar mata kuliah, detail materi & jadwal, pengumpulan tugas berupa foto, serta pelacakan progres belajar — semuanya tersimpan secara lokal di perangkat menggunakan AsyncStorage. Aplikasi ini membantu mahasiswa memantau perkembangan akademik mereka langsung dari HP tanpa perlu koneksi ke server eksternal.

---

## 📸 Screenshots

| Progres Belajar | Icon Aplikasi di HP |
|:---:|:---:|
| <a href="https://ibb.co.com/LDP6Xx1z"><img src="https://i.ibb.co.com/j95GPyDv/Whats-App-Image-2026-07-26-at-08-42-04.jpg" alt="Whats-App-Image-2026-07-26-at-08-42-04" border="0"></a>

## 🎥 Demo Video

| Fitur | Video |
|-------|-------|
| Login (input email & password) | https://github.com/user-attachments/assets/f3983352-85ae-4238-b83d-a4cf70408111
| Home — Daftar Mata Kuliah (FlatList) | https://github.com/user-attachments/assets/be5f8a73-2f9d-484b-b394-7f3fda1d2140
| Edit Nama & Nickname Profil | https://github.com/user-attachments/assets/b862ae9d-e9e8-4dd1-bb2c-c62851f5fcaa |
| Ubah Foto Profil | https://github.com/user-attachments/assets/0d3b3c98-7c22-44d7-8407-4c39e5dd591f |
| Pengumpulan Tugas (Upload Foto) | https://github.com/user-attachments/assets/e8fc4b40-0f38-4ab9-bd42-e5e1fffd1fe6 |
| Membuka Aplikasi di HP | https://github.com/user-attachments/assets/d53483a2-6c46-4b4b-a22a-95348ebf6b1b |

---

## ✨ Fitur Utama

- [x] Login mahasiswa dengan input email & password (session tersimpan via AsyncStorage)
- [x] Daftar Mata Kuliah dengan FlatList (12 mata kuliah, tiap kategori punya ikon & warna berbeda)
- [x] Detail Mata Kuliah dengan navigasi Stack (dosen, jadwal, deskripsi, materi)
- [x] Pengumpulan tugas berupa foto via **expo-image-picker**
- [x] Edit profil: nama, nickname, dan foto profil (upload via expo-image-picker)
- [x] Halaman Progres Belajar — menampilkan status pengumpulan tugas per mata kuliah secara real-time
- [x] Data persisten dengan **AsyncStorage** (session, progres tugas, profil)
- [x] Bottom Tab Navigation (Matkul, Progres, Profil) + Stack Navigation untuk halaman Detail

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React Native + Expo |
| Navigation | React Navigation v6 (Stack + Bottom Tab) |
| Storage | @react-native-async-storage/async-storage |
| Device | expo-image-picker |
| Build | EAS Build (Expo Application Services) |

---

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
npm install
npx expo start
```

Scan QR Code dengan Expo Go di HP.

---

## 📦 Download APK

[Download APK terbaru](https://expo.dev/accounts/idhos/projects/e-learning-kampus/builds/ad96e8f3-0a5a-4102-84a0-7ad87e3ce322)

---

## 🌐 Expo Snack

[Buka di Expo Snack](https://snack.expo.dev/@idhos/e-learning-kampus)

---

## 👤 Developer

**Idho Jonathan Sembiring** | NIM 243303621251 | Kelas 4 Pagi A

Universitas Prima Indonesia — Prodi Sistem Informasi
Mata Kuliah: Pemrograman Mobile (TI-MOBILE-01)
