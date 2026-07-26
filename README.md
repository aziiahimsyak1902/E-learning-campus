
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
<a href="https://ibb.co.com/CNfC807"><img src="https://i.ibb.co.com/8THvs85/Whats-App-Image-2026-07-26-at-10-47-45.jpg" alt="Whats-App-Image-2026-07-26-at-10-47-45" border="0"></a>

## 🎥 Demo Video

| Fitur | Video |
|-------|-------|
| Login (input email & password) | https://github.com/user-attachments/assets/70e0ea8b-99be-4231-b2a9-ab1eed4e72c2
| Home — Daftar Mata Kuliah (FlatList) | https://github.com/user-attachments/assets/e5bcbd2e-f62f-4d8b-92a7-f3d81b7c843b
| Edit Nama & Nickname Profil | https://github.com/user-attachments/assets/479df383-b3ab-4f44-9f18-50407f4a67ae |
| Ubah Foto Profil | https://github.com/user-attachments/assets/c97829be-4e7b-4e81-bb23-5f5e9f1c6e3a |
| Pengumpulan Tugas (Upload Foto) | https://github.com/user-attachments/assets/2daeabc1-604c-4156-a474-e0585d5dddb8 |
| Membuka Aplikasi di HP | https://github.com/user-attachments/assets/5821281c-b607-4307-9ac8-53ce736a19ec |

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

[Download APK terbaru]( )

---

## 🌐 Expo Snack

[Buka di Expo Snack]( )

---

## 👤 Developer

** Azi Ahimsyak** | NIM 243303621216 | Kelas 4 Pagi A

Universitas Prima Indonesia — Prodi Sistem Informasi
Mata Kuliah: Pemrograman Mobile (TI-MOBILE-01)
