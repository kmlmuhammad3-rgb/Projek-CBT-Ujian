# 📝 Aplikasi Computer Based Test (CBT) Ujian Online

Aplikasi ujian online berbasis web (**Computer Based Test**) yang dirancang sederhana, responsif, dan mudah digunakan. Projek ini dikembangkan untuk memenuhi tugas/penilaian projek pemrograman web.

---

## 📱 Fitur Utama Aplikasi

1. **Halaman Login & Identitas:**
   - Input Nama Lengkap, Email, dan Kelas siswa sebelum memulai ujian.
2. **Sistem Timer Ujian (Countdown):**
   - Hitung mundur durasi waktu ujian (15 Menit).
   - *Auto-submit* otomatis saat waktu habis.
3. **Penyimpanan Lokal (Anti-Refresh):**
   - Menggunakan `LocalStorage` untuk menyimpan data jawaban dan sisa waktu sementara, sehingga jawaban tidak hilang saat halaman ter-refresh secara tidak sengaja.
4. **Navigasi Soal Interaktif:**
   - Sidebar indikator nomor soal dengan pembeda warna (Hijau: *Sudah Dijawab*, Abu-abu: *Belum Dijawab*).
   - Tombol navigasi *Sebelumnya* dan *Selanjutnya*.
5. **Kalkulasi Nilai Otomatis & Reviu Jawaban:**
   - Perhitungan jumlah jawaban benar, salah, tidak dijawab, dan nilai akhir (skala 100) secara otomatis.
   - Fitur reviu/pembahasan detail per nomor soal setelah ujian diselesaikan.

---

## 🛠️ Teknologi & Bahasa Pemrograman

Projek ini dibangun menggunakan arsitektur **Web Front-End Standalone** (*Separation of Concerns*):

| Teknologi | Fungsi |
| :--- | :--- |
| **HTML5** | Menyusun struktur kerangka halaman login (`index.html`) dan ruang ujian (`ujian.html`). |
| **CSS3** | Menata tampilan visual, layout flexbox/grid, serta pewarnaan UI yang responsif (`css/style.css`). |
| **JavaScript (ES6)** | Menjalankan logika timer, navigasi soal, render dinamis, dan kalkulasi nilai (`js/app.js`). |
| **JSON / JS Object** | Menyimpan data bank soal dan kunci jawaban secara terstruktur (`js/data.js`). |

---

## 📂 Struktur Folder Projek

```text
Projek-CBT-Ujian/
├── css/
│   └── style.css       # File styling & tata letak
├── js/
│   ├── data.js         # Bank soal & konfigurasi durasi
│   └── app.js          # Logika utama aplikasi CBT
├── index.html          # Halaman Login / Data Diri
├── ujian.html          # Halaman Ruang Ujian
└── README.md           # Dokumentasi Projek
