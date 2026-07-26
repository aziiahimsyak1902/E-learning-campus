import { CATEGORY_COLORS } from '../constants/colors';

// Dummy data — di project nyata bisa diganti fetch() ke REST API kampus
export const COURSES = [
  {
    id: 'c1',
    name: 'Pemrograman Mobile',
    lecturer: 'Pak Bahlil Siregar',
    schedule: 'Senin, 08:00 - 10:30',
    icon: '💻',
    color: CATEGORY_COLORS.blue,
    description:
      'Mata kuliah yang membahas pengembangan aplikasi mobile menggunakan React Native dan Expo, mulai dari komponen dasar hingga deployment ke Play Store.',
    material: 'Modul 5: State Management & AsyncStorage',
  },
  {
    id: 'c2',
    name: 'Basis Data Lanjut',
    lecturer: 'Bu Sri Wahyuni',
    schedule: 'Selasa, 10:30 - 13:00',
    icon: '🗄️',
    color: CATEGORY_COLORS.purple,
    description:
      'Pendalaman perancangan basis data relasional, normalisasi, dan optimasi query untuk aplikasi skala menengah.',
    material: 'Modul 7: Indexing & Query Optimization',
  },
  {
    id: 'c3',
    name: 'Interaksi Manusia & Komputer',
    lecturer: 'Pak Andi Prasetyo',
    schedule: 'Rabu, 13:00 - 15:30',
    icon: '🎨',
    color: CATEGORY_COLORS.pink,
    description:
      'Prinsip perancangan antarmuka yang berpusat pada pengguna, termasuk usability testing dan heuristik evaluasi.',
    material: 'Modul 4: Usability Testing',
  },
  {
    id: 'c4',
    name: 'Jaringan Komputer',
    lecturer: 'Bu Maya Kusuma',
    schedule: 'Kamis, 08:00 - 10:30',
    icon: '🌐',
    color: CATEGORY_COLORS.teal,
    description:
      'Konsep dasar jaringan komputer, protokol TCP/IP, dan praktik konfigurasi jaringan sederhana.',
    material: 'Modul 6: Subnetting',
  },
  {
    id: 'c5',
    name: 'Kecerdasan Buatan',
    lecturer: 'Pak Rian Hidayat',
    schedule: 'Jumat, 08:00 - 10:30',
    icon: '🤖',
    color: CATEGORY_COLORS.orange,
    description:
      'Pengenalan konsep machine learning, algoritma pencarian, dan penerapan AI dalam aplikasi sehari-hari.',
    material: 'Modul 3: Supervised Learning',
  },
  {
    id: 'c6',
    name: 'Struktur Data & Algoritma',
    lecturer: 'Bu Dewi Anggraini',
    schedule: 'Senin, 13:00 - 15:30',
    icon: '🧮',
    color: CATEGORY_COLORS.green,
    description:
      'Pembahasan struktur data (linked list, tree, graph) serta analisis kompleksitas algoritma.',
    material: 'Modul 8: Graph Traversal',
  },
  {
    id: 'c7',
    name: 'Pemrograman Web',
    lecturer: 'Pak Fajar Nugroho',
    schedule: 'Selasa, 08:00 - 10:30',
    icon: '🌍',
    color: CATEGORY_COLORS.cyan,
    description:
      'Pengembangan aplikasi web modern menggunakan HTML, CSS, JavaScript, dan framework front-end populer.',
    material: 'Modul 6: React Fundamentals',
  },
  {
    id: 'c8',
    name: 'Sistem Operasi',
    lecturer: 'Bu Rina Marlina',
    schedule: 'Rabu, 08:00 - 10:30',
    icon: '⚙️',
    color: CATEGORY_COLORS.slate,
    description:
      'Konsep proses, manajemen memori, penjadwalan CPU, dan sinkronisasi pada sistem operasi modern.',
    material: 'Modul 5: Process Scheduling',
  },
  {
    id: 'c9',
    name: 'Keamanan Siber',
    lecturer: 'Pak Hendra Gunawan',
    schedule: 'Kamis, 13:00 - 15:30',
    icon: '🔒',
    color: CATEGORY_COLORS.red,
    description:
      'Dasar-dasar keamanan jaringan dan aplikasi, kriptografi, serta praktik etika hacking.',
    material: 'Modul 4: Cryptography Basics',
  },
  {
    id: 'c10',
    name: 'Rekayasa Perangkat Lunak',
    lecturer: 'Bu Nurul Fitriani',
    schedule: 'Jumat, 13:00 - 15:30',
    icon: '🏗️',
    color: CATEGORY_COLORS.amber,
    description:
      'Metodologi pengembangan perangkat lunak, manajemen proyek Agile/Scrum, dan dokumentasi teknis.',
    material: 'Modul 5: Agile & Scrum',
  },
  {
    id: 'c11',
    name: 'Cloud Computing',
    lecturer: 'Pak Yusuf Iskandar',
    schedule: 'Senin, 10:30 - 13:00',
    icon: '☁️',
    color: CATEGORY_COLORS.sky,
    description:
      'Konsep komputasi awan, layanan IaaS/PaaS/SaaS, serta praktik deployment aplikasi di cloud.',
    material: 'Modul 2: Cloud Service Models',
  },
  {
    id: 'c12',
    name: 'Etika Profesi TI',
    lecturer: 'Bu Lestari Handayani',
    schedule: 'Selasa, 13:00 - 15:30',
    icon: '⚖️',
    color: CATEGORY_COLORS.indigo,
    description:
      'Pembahasan kode etik profesi di bidang teknologi informasi, hak kekayaan intelektual, dan studi kasus pelanggaran etika.',
    material: 'Modul 3: Studi Kasus Pelanggaran Data',
  },
];