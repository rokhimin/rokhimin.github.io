---
layout: post
title: Cara pasang tema di jekyll
date: 2025-02-12
author: whdzera
comments: true
---
Halo teman-teman developer!   
Kalau kamu sedang membangun blog statis pakai Jekyll dan pengen tampil beda, kamu bisa mulai dengan mengganti **tema Jekyll-nya**. Di artikel ini, aku akan tunjukin langkah-langkah simpel buat pasang tema di Jekyll, sekaligus promosi dikit tema buatanku sendiri: **[Niri](https://github.com/rokhimin/jekyll-niri)**. 

---

#### 1. Instalasi Jekyll (Lewati Jika Sudah)

Kalau kamu belum install Jekyll, jalankan perintah ini:

```bash
gem install jekyll
```

Lalu buat proyek Jekyll baru (atau lewati jika kamu sudah punya):

```bash
jekyll new nama_app
```

#### 2. Tambahkan Tema ke Proyek Jekyll

Untuk menggunakan tema Niri, edit file `Gemfile` kamu dan tambahkan:
```bash
gem "niri", "~> 1.4"
```

Setelah itu jalankan:
```
bundle
```

Selanjutnya, buka file `_config.yml` dan tambahkan:
```bash
theme: niri
```

#### 3. Jalankan Proyekmu

Saatnya lihat hasilnya! Jalankan Jekyll server:
```bash
bundle exec jekyll s
```

Buka browser dan arahkan ke:

`http://localhost:4000`

Voila! Tema baru kamu sudah tampil.

#### 4. Untuk Github Pages

Jika kamu ingin deploy ke GitHub Pages, kamu perlu menggunakan `remote_theme` karena GitHub Pages tidak mengizinkan semua gem pihak ketiga. Tambahkan ini di `_config.yml`:
```bash
remote_theme: rokhimin/jekyll-niri
```

#### 5. Cari Tema Jekyll Lainnya

Kalau kamu ingin eksplorasi tema-tema lain, cek beberapa situs berikut:

- [jekyllthemes.org](http://jekyllthemes.org/)
- [jekylltheme.io](https://jekyllthemes.io/)
- [jamstackthemes](https://jamstackthemes.dev/ssg/jekyll/)
- Github kata kunci search 'jekyll theme'

| Tips: Selalu cek dokumentasi masing-masing tema untuk cara instalasi yang tepat ya!



