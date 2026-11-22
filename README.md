# Jadwal Master (TimetableMaster AI) 📅✨

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Jadwal Master** adalah platform penyusun jadwal pelajaran sekolah otomatis berbasis kecerdasan buatan (*AI-powered scheduling system*) yang dirancang khusus untuk memecahkan kerumitan penyusunan jadwal sekolah di Indonesia. 

Mulai dari bentrok guru, batas kapasitas ruang/laboratorium, guru mengajar beberapa rombel sekaligus (*kelas gabungan*), penugasan guru piket, izin/cuti, hingga peminatan mapel pilihan siswa (*IB / Kurikulum Merdeka*).

---

## 🌟 Fitur Utama

### 1. ⚡ Generator Jadwal Otomatis Bebas Bentrok
- **Algoritma Pintar**: Mengisi ratusan jam pelajaran hanya dalam hitungan detik tanpa ada guru atau ruangan yang bentrok.
- **Dukungan Kelas Gabungan (Joint Class)**: Mendukung skenario 1 guru mengajar 2 kelas sekaligus (misal: gabungan Bahasa Daerah atau Seni di aula).
- **Aturan Konstrain Fleksibel**:
  - Olahraga (PJOK) dilarang ditempatkan pada jam terakhir siang.
  - Praktikum IPA otomatis ditempatkan di Ruang Laboratorium.
  - Batas maksimal 1 kali mata pelajaran yang sama per hari per kelas.
- **Kunci Jam (Lock Period)**: Guru atau admin dapat mengunci jam-jam tertentu agar tidak tergeser saat proses generate otomatis ulang.

### 2. 👥 Manajemen Guru Piket & Penugasan Pengganti (Smart Cover)
- Toggle kehadiran guru hari ini (*Hadir / Izin / Cuti*).
- Sistem otomatis menghitung dan merekomendasikan guru pengganti paling cocok berdasarkan:
  1. Kecocokan mata pelajaran yang diampu.
  2. Ketersediaan jam kosong (*free period*).
  3. Keadilan beban tugas piket mingguan.
- Riwayat penugasan piket lengkap dengan fitur batalkan (*revert*).

### 3. 📝 Pengajuan & Persetujuan Cuti / Izin Guru Terintegrasi
- Alur persetujuan (*Approve / Reject*) cuti guru oleh Kepala Sekolah/Kurikulum.
- Jenis permohonan: Sakit, Kepentingan Pribadi, atau Tugas Dinas Luar.
- Pengurangan otomatis saldo cuti tahunan dan sinkronisasi langsung ke antrean guru piket.

### 4. 📅 Kalender & Agenda Sekolah
- Menjadwalkan Ujian Semester, Libur Nasional, Upacara Bendera, dan Acara Sekolah.
- Menampilkan badge kegiatan langsung pada header tabel hari jadwal pelajaran.

### 5. 🎓 Mapel Pilihan Siswa & Penjadwalan Blok (IB / Peminatan)
- Pengelolaan siswa dan pendaftaran mata pelajaran pilihan/peminatan.
- Pengecekan bentrok jadwal antar blok pelajaran untuk tiap siswa.

### 6. 📊 Impor & Ekspor Massal Microsoft Excel (Format Indonesia `;`)
- **Dukungan Excel Indonesia**: Menggunakan pemisah titik koma (`;`) dan UTF-8 BOM, sehingga saat file dibuka di Microsoft Excel langsung terbagi rapi **per cell (Kolom A, B, C, D)** tanpa menumpuk di kolom A.
- **Copy-Paste Instan**: Cukup blok tabel di Microsoft Excel / Google Sheets (`Ctrl+C`) lalu tempelkan (`Ctrl+V`) ke dalam aplikasi web.
- **Kategori Impor**: Data Guru & Beban Mengajar, Data Rombel Kelas, Data Ruangan/Lab, dan Jadwal Lengkap.
- **Unduh Template 1-Klik**: Tersedia template `.csv` siap pakai untuk semua kategori.

### 7. 🤖 Asisten AI Jadwal Sekolah Bahasa Indonesia
- Tanya jawab interaktif seputar beban mengajar guru, analisis bentrok, dan rekomendasi optimasi jadwal.
- Aksi cepat 1-klik untuk menyelesaikan bentrok atau menyetujui izin.

### 8. 💾 Cadangan & Pemulihan Database (JSON)
- Simpan seluruh konfigurasi sekolah, guru, dan jadwal ke file JSON untuk backup berkala atau dipindahkan ke komputer lain.

### 9. 🖨️ Cetak & Unduh PDF
- Tampilan cetak bersih siap print atau save as PDF untuk dibagikan ke guru dan siswa.

---

## 🚀 Cara Menjalankan Aplikasi di Komputer Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18.x atau lebih baru
- npm, yarn, atau pnpm

### Langkah Instalasi
1. **Clone repositori**:
   ```bash
   git clone https://github.com/atiqpunya/Jadwal_Master.git
   cd Jadwal_Master
   ```

2. **Masuk ke folder aplikasi dan instal dependensi**:
   ```bash
   cd app
   npm install
   ```

3. **Jalankan server pengembangan (development server)**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Buka [http://localhost:3000](http://localhost:3000) untuk halaman utama atau [http://localhost:3000/workspace/](http://localhost:3000/workspace/) untuk aplikasi jadwal interaktif.

---

## 📁 Struktur Direktori

```text
Jadwal_Master/
├── app/
│   ├── public/                 # Aset publik, logo, icon, & template Excel CSV
│   │   └── templates/          # Template CSV Excel Indonesia (;)
│   ├── src/
│   │   ├── app/
│   │   │   ├── workspace/      # Aplikasi utama penyusun jadwal & manajemen sekolah
│   │   │   ├── login/          # Halaman masuk sistem
│   │   │   ├── signup/         # Halaman pendaftaran
│   │   │   ├── features/       # Halaman fitur lengkap
│   │   │   ├── pricing/        # Halaman informasi paket & harga
│   │   │   ├── contact/        # Halaman kontak
│   │   │   └── page.tsx        # Landing page utama
│   │   ├── components/         # Komponen UI modular
│   │   └── lib/
│   │       └── workspaceData.ts# State manager, generator jadwal AI, parser Excel
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── AGENTS.md                   # Catatan keputusan arsitektur & living memory
├── README.md                   # Dokumentasi resmi proyek
├── .coderabbit.yaml            # Konfigurasi AI Code Review
└── .gitignore                  # Filter keamanan berkas rahasia & build
```

---

## 🔒 Keamanan & Privasi
- Seluruh data jadwal disimpan secara lokal pada peramban (`localStorage`) dan file cadangan JSON yang diunduh langsung ke komputer Anda.
- Bebas dari pelacak (*trackers*) dan tidak membocorkan data pribadi siswa atau guru ke server pihak ketiga.

---

## 📄 Lisensi
Didistribusikan di bawah lisensi [MIT](LICENSE). Dibuat dengan dedikasi untuk mempermudah tata kelola pendidikan di Indonesia.
