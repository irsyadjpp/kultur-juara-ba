# SISTEM MANAJEMEN AKADEMI - KULTUR JUARA

## 1. DESKRIPSI PROYEK

**Kultur Juara Indonesia Badminton Academy Management System (SIM)** adalah platform digital terintegrasi yang dirancang untuk mendigitalkan seluruh operasional akademi bulu tangkis modern. Sistem ini menggabungkan manajemen atlet berbasis *Sport Science*, administrasi operasional, dan perencanaan latihan periodisasi dalam satu ekosistem terpusat.

Dibangun dengan teknologi web modern, aplikasi ini memastikan data atlet, evaluasi pelatih, dan laporan manajemen tersimpan aman, terstruktur, dan mudah diakses oleh pihak yang berwenang.

---

## 2. FITUR UTAMA

Sistem ini diorganisir ke dalam modul-modul spesifik (Route Groups) untuk memisahkan concern bisnis:

### 🔹 A. Academy Core (`/admin/(academy)`)
Fokus pada pengembangan atlet dan kepelatihan:
- **Master Metrics Registration**: Sistem pendaftaran atlet yang mencakup **13 Pilar Performa** (Antropometri, Kinematika, Nutrisi, Psikologi, Fisik, Teknik, dll).
- **Athlete Database**: Profil lengkap atlet termasuk riwayat cedera, prestasi, dan perkembangan fisik.
- **Training Management**: Perencanaan program latihan makrosiklus.
- **Evaluations**: Rapor berkala dan penilaian performa.

### 🔹 B. Operations (`/admin/(operations)`)
Menangani aspek non-teknis akademi:
- **Inventory**: Manajemen peralatan dan aset.
- **Reports**: Laporan kehadiran dan administrasi umum.

### 🔹 C. System Administration (`/admin/(system)`)
Kontrol penuh terhadap akses dan konfigurasi:
- **User Management**: Mengelola akun staf, pelatih, dan atlet.
- **Role-Based Access Control (RBAC)**: Sistem keamanan bertingkat (Super Admin, Admin, Head Coach, Coach, Medical, Athlete, Guest).
- **Settings**: Konfigurasi global aplikasi.

---

## 3. MASTER METRICS INTEGRATION (NEW)

Sistem ini kini mendukung pencatatan data komprehensif berdasarkan **13 Pilar Performa Atlet Elite**:
1.  **Antropometri**: Tinggi, Berat, Rentang Lengan, Tinggi Duduk.
2.  **Kinematika**: Kecepatan Grip, Kinetic Linkage.
3.  **Biomotor**: Kecepatan, Kelincahan (Agility), Power.
4.  **Fisiologi**: VO2Max, Heart Rate.
5.  **Biomekanika**: Analisis gerakan.
6.  **Nutrisi**: Status Hidrasi (Warna Urin), Asupan Kalori.
7.  **Recovery**: Kualitas Tidur, HRV, DOMS (Muscle Soreness).
8.  **Psikologi**: Ketahanan Mental (Grit), Fokus.
9.  **Teknik**: Pukulan dasar hingga lanjut.
10. **Taktik**: Game sense dan strategi.
11. **Sosial Ekonomi**: Dukungan keluarga dan latar belakang.
12. **Medis**: Riwayat cedera dan kesehatan.
13. **Administrasi**: Legalitas dan kontrak.

---

## 4. TEKNOLOGI

- **Frontend**: Next.js 14 (App Router), React, TypeScript.
- **Styling**: Tailwind CSS, ShadCN UI (Radix Primitives).
- **State Management**: React Hooks, Server Actions.
- **Backend / Database**: Google Firebase (Firestore, Authentication, Storage).
- **Security**: Middleware-based Route Protection, Server-side Role Validation.

---

## 5. STRUKTUR PROYEK

```
src/app/
├── (auth)/                 # Login & Authentication routes
├── admin/                  # Protected Admin Area
│   ├── (academy)/          # Athletes, Training, Evaluations
│   ├── (operations)/       # Reports, Inventory
│   ├── (system)/           # Users, Settings
│   └── (personal)/         # Profile, Notifications
├── athletes/               # Athlete Portal (Dashboard, Logs)
├── superadmin/             # Super Admin Exclusive Area
└── api/                    # Backend API Routes
```

---

## 6. KEAMANAN (SECURITY)

Sistem menerapkan prinsip *Least Privilege*:
- **Middleware**: Memblokir akses rute berdasarkan klaim token pengguna.
- **Server Actions**: Validasi role ganda di setiap fungsi backend untuk mencegah *Unauthorized Access*.
- **Data Protection**: Pengguna hanya bisa melihat/mengedit data sesuai yurisdiksi role mereka (misal: Pelatih Fisik hanya bisa edit data fisik).

---

## 7. CARA MENJALANKAN

1.  **Clone Repository**
    ```bash
    git clone https://github.com/kultur-juara-ba/sim.git
    cd kultur-juara-ba
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env.local` dan isi konfigurasi Firebase:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    # ... dst
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build untuk Produksi**
    ```bash
    npm run build
    npm start
    ```
