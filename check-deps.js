/**
 * check-deps.js
 * Script untuk memindai seluruh project React Native/Expo,
 * menemukan semua import package pihak ketiga,
 * lalu membandingkannya dengan package.json.
 * Hasil akhir: daftar package yang HILANG + perintah install siap pakai.
 *
 * Cara pakai:
 *   1. Taruh file ini di root folder project (sejajar package.json)
 *   2. Jalankan: node check-deps.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(['node_modules', '.git', '.expo', 'android', 'ios', 'dist', 'build']);
const VALID_EXT = new Set(['.js', '.jsx', '.ts', '.tsx']);

// Regex untuk menangkap: import ... from '...'  dan  require('...')
const importRegex = /import\s+(?:[^'"]+?\s+from\s+)?['"]([^'"]+)['"]/g;
const requireRegex = /require\(\s*['"]([^'"]+)['"]\s*\)/g;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (VALID_EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function extractPackageName(importPath) {
  // Abaikan import relatif/lokal
  if (importPath.startsWith('.') || importPath.startsWith('/')) return null;
  // Package scoped seperti @react-navigation/native -> ambil 2 segmen pertama
  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    return parts.slice(0, 2).join('/');
  }
  // Package biasa seperti react-native-gesture-handler/... -> ambil segmen pertama
  return importPath.split('/')[0];
}

function main() {
  const pkgJsonPath = path.join(ROOT, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) {
    console.error('❌ package.json tidak ditemukan di folder ini. Jalankan script dari root project.');
    process.exit(1);
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  const installed = new Set([
    ...Object.keys(pkgJson.dependencies || {}),
    ...Object.keys(pkgJson.devDependencies || {}),
    'react', 'react-native', 'expo', // built-in / selalu ada
  ]);

  const files = walk(ROOT);
  const found = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const pkg = extractPackageName(match[1]);
      if (pkg) found.add(pkg);
    }
    while ((match = requireRegex.exec(content)) !== null) {
      const pkg = extractPackageName(match[1]);
      if (pkg) found.add(pkg);
    }
  }

  const missing = [...found].filter(pkg => !installed.has(pkg)).sort();

  console.log(`\n📦 Total package pihak ketiga yang di-import di kode: ${found.size}`);
  console.log(`✅ Sudah terdaftar di package.json: ${found.size - missing.length}`);
  console.log(`❌ BELUM terdaftar / kemungkinan hilang: ${missing.length}\n`);

  if (missing.length === 0) {
    console.log('🎉 Semua package yang di-import sudah ada di package.json!');
    console.log('   Kalau masih error "Unable to resolve module", coba hapus node_modules lalu npm install ulang.');
  } else {
    console.log('Package yang perlu diinstall:');
    missing.forEach(pkg => console.log('  -', pkg));
    console.log('\n👉 Jalankan perintah ini untuk install semuanya sekaligus:\n');
    console.log(`npx expo install ${missing.join(' ')}\n`);
  }
}

main();