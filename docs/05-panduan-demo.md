# 5. Panduan demo dan akun

## Akun demo bawaan

| Peran | Username | Password |
|---|---|---|
| Masyarakat | `warga` | `warga123` |
| Petugas keamanan | `petugas` | `petugas123` |
| Admin | `admin` | `admin123` |
| Ketua RT | `ketua.rt` | `rt123` |

Halaman login juga menyediakan tombol cepat untuk masing-masing akun.

## Skenario demo yang disarankan

### A. Siklus laporan end-to-end

1. Login sebagai `warga` lalu buat laporan baru.
2. Logout, masuk sebagai `admin`, buka antrean verifikasi, dan konfirmasi laporan tersebut.
3. Logout, masuk sebagai `petugas`, ambil laporan yang telah diverifikasi.
4. Buka detail, tulis hasil penanganan, lalu simpan.
5. Login kembali sebagai `warga` untuk melihat notifikasi dan status selesai.
6. Login sebagai `ketua.rt` untuk melihat daftar laporan dan mengunduh CSV.

### B. Manajemen akun dan rekap

1. Login sebagai admin.
2. Buat akun baru untuk masyarakat/petugas/RT.
3. Coba reset password demo atau nonaktifkan akun.
4. Terbitkan rekap pada periode yang berisi data laporan.
5. Login sebagai Ketua RT dan lihat arsip rekap.

## Reset demo

Hapus localStorage key `lapormas-prototype-v01` dari browser, kemudian refresh. Semua akun dan laporan akan kembali ke seed awal.

**Peringatan:** akun/password hanya kredensial contoh. Jangan gunakan password pribadi.
