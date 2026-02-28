# KULTUR JUARA INDONESIA — Company Profile

## 1. DESKRIPSI PROYEK

**Kultur Juara Indonesia** adalah platform digital yang merepresentasikan ekosistem terintegrasi antara **Sport-Tech** dan **Edutech**. Website ini berfungsi sebagai profil perusahaan resmi untuk memperkenalkan solusi digital dalam transformasi pendidikan (Kurikulum Merdeka) dan pembinaan talenta olahraga berbasis data.

Dibangun dengan standar performa tinggi, website ini menggabungkan kecepatan akses, desain premium, dan pengalaman pengguna yang interaktif melalui teknologi web terbaru.

---

## 2. FITUR UTAMA

Website ini dirancang sebagai pusat informasi dan interaksi ekosistem:

### 🔹 A. Content Management System (CMS-less)
Menggunakan pendekatan berbasis file untuk konten yang dinamis namun tetap cepat (SSG/SSR):
- **Wawasan (Blog)**: Artikel edukasi dan berita terbaru yang dikelola melalui file Markdown (`src/content/blog`).
- **Studi Kasus**: Dokumentasi keberhasilan implementasi solusi di sekolah dan komunitas olahraga (`src/content/cases`).

### 🔹 B. Interactive Contact System
Sistem komunikasi dua arah yang profesional:
- **Rich Text Editor (Tiptap)**: Form pesan yang mendukung format teks kaya (Bold, Italic, List) secara WYSIWYG.
- **Resend Integration**: Pengiriman pesan dari form kontak langsung ke email operasional dengan template HTML yang premium.

### 🔹 C. Ecosystem Hub
Navigasi terintegrasi ke berbagai unit layanan:
- **School Portal**: Solusi SIM Sekolah.
- **Academy Portal**: Manajemen pembinaan atlet.
- **Event Portal**: Sistem manajemen turnamen.

### 🔹 D. Performance & SEO
- **Framer Motion**: Animasi transisi dan scroll yang halus untuk kesan premium.
- **SEO Optimized**: Metadata dinamis per halaman, `sitemap.xml`, dan `robots.txt` otomatis.
- **Analytics**: Integrasi Google Analytics untuk pemantauan perilaku pengguna.

---

## 3. TEKNOLOGI

- **Framework**: Next.js 15 (App Router / Turbopack), React 19, TypeScript.
- **Styling**: Tailwind CSS, Shadcn UI (Lucide Icons).
- **Animations**: Framer Motion.
- **Content Engine**: Markdown (Gray-matter, Marked, Tailwind Typography).
- **Rich Text Engine**: Tiptap Editor.
- **Email Service**: Resend (Server Actions).

---

## 4. STRUKTUR PROYEK

```
src/
├── app/                  # Route handlers & main pages
│   ├── blog/             # Dinamis blog routes
│   ├── cases/            # Dinamis case studies routes
│   ├── actions/          # Server Actions (Contact form logic)
│   └── (others)          # About, Solutions, Careers, dsb.
├── components/           # Reusable UI components
│   ├── layout/           # Header, Footer
│   ├── sections/         # Landing page sections (Hero, FAQ, dsb.)
│   └── ui/               # Base UI components (Shadcn)
├── content/              # Markdown data (Blog & Cases)
└── lib/                  # Utilities (Content parser, dsb.)
```

---

## 5. CARA MENJALANKAN

1.  **Clone Repository**
    ```bash
    git clone https://github.com/irsyadjpp/kultur-juara-ba.git
    cd kultur-juara-ba
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env.local` dan tambahkan key berikut:
    ```env
    RESEND_API_KEY=re_...
    CONTACT_EMAIL_TO=...
    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
    NEXT_PUBLIC_APP_URL=http://localhost:9002
    ```

4.  **Run Development Server**
    ```bash
    npm run dev -- -p 9002
    ```

5.  **Build untuk Produksi**
    ```bash
    npm run build
    npm start
    ```

---

## 6. KONTRIBUSI KONTEN
Untuk menambahkan artikel blog atau studi kasus baru, cukup tambahkan file `.md` baru di direktori `src/content/blog/` atau `src/content/cases/` dengan format frontmatter yang sesuai.
