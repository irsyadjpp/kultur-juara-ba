
# SISTEM MANAJEMEN AKADEMI - KULTUR JUARA PWN

## 1. DESKRIPSI PROYEK

Ini adalah **Sistem Informasi Manajemen (SIM)** berbasis web yang dirancang khusus untuk **Kultur Juara PWN Indonesia Badminton Academy**. Tujuannya adalah untuk mendigitalkan dan mengintegrasikan seluruh alur kerja operasional akademi, mulai dari pendaftaran atlet hingga monitoring performa, berdasarkan prinsip manajemen olahraga modern dan berbasis data.

Aplikasi ini berfungsi sebagai pusat kendali bagi administrator, pelatih, dan staf untuk mengelola data secara efisien, transparan, dan terukur.

---

## 2. FITUR UTAMA

Sistem ini terbagi menjadi beberapa modul utama yang saling terhubung:

### 🔹 A. Manajemen Atlet
- **Registrasi Atlet**: Formulir pendaftaran manual untuk mendata atlet baru secara detail, termasuk data pribadi dan antropometri.
- **Roster & Database**: Pusat data untuk melihat dan mengelola seluruh profil atlet yang terdaftar di akademi.
- **Verifikasi Dokumen**: Antarmuka khusus untuk memvalidasi dokumen legalitas atlet (KTP, Akta) demi memastikan kesesuaian kategori umur.

### 🔹 B. Perencanaan & Program Latihan
- **Program Builder**: Fitur unggulan bagi Pelatih Kepala untuk merancang program latihan tahunan (makrosiklus) yang terstruktur berdasarkan prinsip periodisasi (GP, SP, PC, dll).
- **Masterplan & Anggaran**: Modul bagi manajemen untuk mengajukan, mereview, dan menyetujui program kerja dari berbagai divisi, lengkap dengan monitoring anggaran.

### 🔹 C. Log & Evaluasi Kinerja
- **Daily Training Log**: Formulir bagi pelatih untuk mencatat detail sesi latihan harian setiap atlet (jenis, durasi, intensitas).
- **Athlete Mental Expression Log (AMEL)**: Jurnal harian bagi atlet untuk mengekspresikan kondisi mental dan emosional mereka secara aman dan rahasia.
- **Formulir Evaluasi Periodik**: Kumpulan formulir terstandarisasi untuk menilai atlet secara kuantitatif & kualitatif, mencakup:
  - Evaluasi Fisik
  - Evaluasi Teknik
  - Evaluasi Taktik & Game Sense

### 🔹 D. Portal Publik & Informasi
- **Landing Page**: Halaman utama yang berfungsi sebagai brosur digital akademi.
- **Halaman Informasi**: Menyajikan detail mengenai program, jadwal latihan, lokasi, dan filosofi akademi.
- **Pendaftaran Volunteer**: Formulir online untuk merekrut anggota kepanitiaan atau sukarelawan.

### 🔹 E. Manajemen Sistem
- **Manajemen Pengguna**: Fitur bagi Admin untuk mengelola akun dan hak akses (role) untuk seluruh staf, dari Pelatih Kepala, Coach, hingga Psikolog.

---

## 3. TEKNOLOGI

- **Framework**: Next.js (React) dengan App Router
- **Database**: Google Firebase (Firestore)
- **Autentikasi**: Google Firebase (Authentication)
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **PDF Generation**: jsPDF & html2canvas

---

## 4. FILOSOFI SISTEM

- **Data-Driven Coaching**: Semua fitur evaluasi dan log dirancang untuk mengumpulkan data terstruktur, memungkinkan pelatih membuat keputusan berdasarkan performa historis, bukan hanya insting.
- **Transparansi & Akuntabilitas**: Dengan log digital, seluruh aktivitas (latihan, keuangan, program) dapat dilacak dan dievaluasi, mendukung tata kelola yang baik (Good Corporate Governance).
- **Efisiensi Operasional**: Mengurangi pekerjaan administratif manual dan menyatukan berbagai alur kerja ke dalam satu platform terpusat.
