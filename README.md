# 🚀 FinTrack AI - Smart Financial Management (Backend)

> FinTrack AI adalah aplikasi manajemen keuangan cerdas yang dirancang untuk membantu pengguna mengelola anggaran, melacak transaksi, dan mencapai tujuan finansial dengan bantuan Insight AI.

*Repository ini khusus memuat kodingan untuk sisi Backend (Server, API, Database, dan Integrasi AI).*

---

# ✨ Fitur Utama (Backend)

- 🔐 **Authentication & Authorization**
  - Login dan registrasi pengguna menggunakan JWT Authentication.
  - Dukungan login menggunakan Google OAuth.

- 👤 **User Management**
  - Mengelola data profil pengguna.
  - Update informasi akun dan foto profil.

- 💰 **Transaction Management**
  - CRUD data pemasukan dan pengeluaran.
  - Kategorisasi transaksi berdasarkan kebutuhan, keinginan, dan tabungan.

- 📊 **Smart Budgeting API**
  - Perhitungan otomatis metode budgeting 50/30/20.
  - Menampilkan ringkasan alokasi dana pengguna.

- 🎯 **Goals Saving Management**
  - Membuat target tabungan.
  - Tracking progres pencapaian target secara real-time.

- 🤖 AI Financial Insight**
  - Analisis kondisi keuangan pengguna.
  - Memberikan rekomendasi dan tips keuangan yang dipersonalisasi.

- 📷 OCR Receipt Scanner**
  - Membaca data struk belanja menggunakan teknologi OCR.
  - Mengubah hasil scan menjadi data transaksi otomatis.

- ☁️ File Upload Management**
  - Upload dan penyimpanan foto profil pengguna.
  - Pengelolaan file berbasis server.

---

# 🛠️ Teknologi yang Digunakan

Aplikasi backend ini dibangun menggunakan teknologi modern untuk memastikan performa yang cepat, aman, dan scalable:

### Backend Framework
- Node.js
- Express.js

### Database
- MySQL

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt

### API Communication
- RESTful API
- Axios

### AI & OCR
- Google Gemini API
- OCR API

### File Upload
- Multer

### Development Tools
- Nodemon
- Git & GitHub
- Postman

---

# 🚀 Cara Menjalankan di Lokal (Development)

## 1. Clone Repository

```bash
git clone https://github.com/username/Fintrackai-Backend.git
cd Fintrackai-Backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Konfigurasi Environment

Buat file `.env` pada root project:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fintrack_ai

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

## 4. Jalankan Database

Pastikan MySQL sudah berjalan dan database telah dibuat:

```sql
CREATE DATABASE fintrack_ai;
```

Import file database jika tersedia.

## 5. Menjalankan Server

Mode Development:

```bash
npm run dev
```

Mode Production:

```bash
npm start
```

## 6. Akses API

Server akan berjalan pada:

```bash
http://localhost:5000
```

Contoh endpoint:

```bash
POST /api/login
POST /api/register
GET  /api/user/:id
PUT  /api/user/:id
GET  /api/transaksi
POST /api/transaksi
GET  /api/goals
POST /api/goals
```

---

# 📌 Catatan

Pastikan seluruh konfigurasi environment, database, dan API key telah diatur dengan benar sebelum menjalankan aplikasi.

Backend ini berfungsi sebagai penyedia layanan API untuk aplikasi **FinTrack AI Frontend**.
