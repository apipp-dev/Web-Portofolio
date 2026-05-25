# 🎬 Portofolio Visual Afif

Selamat datang di repositori website portofolio pribadi **Muhammad Afif**! Ini adalah ruang digital interaktif kelas premium yang dirancang khusus untuk memamerkan karya-karya *video editing*, *motion graphics*, dan keahlian kreatif lainnya dengan performa tinggi dan user experience (UX) yang sangat mulus.

---

## 🎯 Tujuan Pembuatan
Website ini dibangun sebagai wadah presentasi profesional berkualitas tinggi. Fokus utamanya adalah menyajikan cuplikan video (*creative assets*) dalam resolusi terbaik tanpa mengorbankan waktu muat (*loading speed*). 

Lebih dari sekadar galeri, prototipe web ini dirancang secara detail untuk membuktikan sentuhan keahlian kelas dunia dalam **Estetika Visual**, **Koreografi Animasi**, dan **Responsivitas Antarmuka** (UI/UX).

---

## 💡 Referensi & Konsep Desain
Desain website ini mengawinkan fungsionalitas modern dengan visual premium bertaraf tinggi:

### 1. 🍱 Bento Grid Layout & Portfolio Showcase
* Menggunakan struktur **Bento Grid** modular untuk memisahkan karya sinematik, statistik pencapaian, dan alur kerja kreatif secara proporsional.
* Dilengkapi pemutaran video otomatis pintar (*smart intersection observer*) untuk memastikan video diputar hanya saat berada di layar pembaca demi performa maksimal.

### 🏝️ 2. Dynamic Island Navigation Widget
* Kontrol navigasi menggunakan pendekatan **iOS-Style Interaction**. Saat pertama kali dimuat, widget navigasi berukuran minimalis untuk memberi ruang bagi konten utama (*immersive layout*).
* Widget akan mekar secara dinamis (*morphed animation*) ketika disentuh atau diarahkan kursor untuk membuka panel navigasi lengkap, pilihan bahasa, serta sakelar tema.

### ⏳ 3. Interactive Professional Journey Timeline
* Peta jalan karier dikonstruksi dalam bentuk visual **Timeline** vertikal dengan indikator status aktif berupa denyut cahaya (*radar glowing effect*).
* Dirancang adaptif untuk layar ponsel dengan resolusi tinggi (seperti layar 2400 x 1080) sehingga teks dan garis waktu tidak terpotong (bebas dari bug zoom horizontal).

### ☀️ 4. Sistem Dual-Theme (Liquid Palette)
Peralihan tema dilakukan secara instan lewat transisi selembut sutra (*smooth color-fade blend*):
* **Tema Gelap (Liquid Dark Premium):** Memakai latar *obsidian deep dark* dengan aksen *Cyan* elektrik menyala, merepresentasikan fokus ruang studio editing profesional yang sunyi.
* **Tema Terang (Apple-Grade Clean UI):** Memiliki latar sebersih es dengan balutan aksen **Vibrant Purple** mewah untuk poin teks & ikon navigasi, dipadukan dengan **Electric Cyan** untuk indikator keaktifan.

### 🌐 5. Bilingual Integration (Dual Language)
* Mendukung penuh lokalisasi bahasa dalam **Bahasa Indonesia** dan **English (Inggris)** secara dinamis tanpa muat ulang halaman.

### 🚀 6. Smooth Scroll to Top Button
* Tombol cepat dengan animasi fisika pegas (*spring animate physics*) yang muncul secara elegan di sudut kanan bawah apabila pembaca menggulir halaman lebih dari 400 piksel, memudahkan navigasi kembali ke atas halaman dengan sekali tekan.

---

## ⚙️ Arsitektur & Teknologi yang Digunakan
Untuk menghadirkan animasi interaktif bebas lag dengan konsumsi memori seefisien mungkin:

* **React 18 & Vite:** Fondasi pengembangan utama yang memastikan proses rendering sangat cepat dan ukuran bundel aplikasi sangat ringkas.
* **TypeScript:** Memberikan keandalan kode tingkat lanjut (*strict type safety*) agar seluruh elemen interaktif, penanganan multi-bahasa, dan status dinamis berjalan stabil tanpa risiko *runtime breakdown*.
* **Tailwind CSS:** Digunakan untuk eksekusi visual gaya modern, konfigurasi responsif penuh (sehingga seluruh halaman tampil proporsional tanpa terpotong di layar HP beresolusi tinggi), serta implementasi skema transisi warna.
* **Framer Motion (`motion/react`):** Mesin di balik kelembutan animasi mikro, efek transisi halaman, efek pegas tombol *scroll-to-top*, dan pembukaan menu *Dynamic Island*.
* **Lucide React:** Sumber daya visual ikon garis (*stroke lines icons*) bernuansa modern dan seragam di semua komponen.

---

## 🛠️ Cara Menjalankan Project Secara Lokal

Untuk menguji atau menjalankan portofolio ini di komputer Anda sendiri:

1. **Clone Repositori ini:**
   ```bash
   git clone https://github.com/afifm192/portofolio-afif.git
   cd portofolio-afif
   ```

2. **Instal seluruh dependensi proyek:**
   ```bash
   npm install
   ```

3. **Jalankan server mode pengembangan:**
   ```bash
   npm run dev
   ```

4. **Buka di peramban Anda:**
   Akses URL lokal `http://localhost:3000` (atau port yang dideklarasikan oleh sistem Anda).

---
*Dibuat oleh Afif — Elevate your visual narrative.*
