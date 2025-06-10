---
layout: post
title: Automasi Discord + RSS dengan Huginn dan Zappier
date: 2024-08-12
author: whdzera
thumbnail: app/assets/images/dc-rss.png
comments: true
---

Pernah ingin membuat bot Discord yang secara otomatis membagikan update terbaru dari situs favoritmu? Misalnya, setiap ada anime baru di suatu website, langsung muncul notifikasi di server Discord kamu?

Nah, di tutorial ini saya akan bahas dua cara mudah untuk mewujudkannya:
- Menggunakan **Zapier** (tanpa coding, cocok untuk pemula)
- Menggunakan **Huginn** (lebih fleksibel dan powerful)

Keduanya akan mengambil data dari **RSS Feed** dan mengirimkannya ke **Discord** melalui webhook.

#### 🔁 Alur Kerja (Flow)
```
Sumber RSS Feed → Zapier/Huginn → Formatter (opsional) → Webhook → Discord
```

#### 💬 Setup Webhook di Discord

1. Masuk ke server Discord-mu.
2. Buka menu **Server Settings > Integrations > Webhooks**.
3. Klik **Create Webhook**, beri nama, pilih channel, dan salin **Webhook URL**.
4. Simpan URL tersebut, karena akan digunakan nanti.

---

### Zapier

Zapier cocok untuk kamu yang ingin solusi cepat tanpa repot setup server.

#### 1. Buat Zap di [Zapier](https://zapier.com)

#### 2. Trigger: **RSS by Zapier**
- Tambahkan URL RSS feed yang ingin dipantau (misalnya feed berita anime).
- Zapier akan membaca feed secara berkala.

![rss1](https://s3.gifyu.com/images/rss1.md.jpg)

#### 3. (Opsional) Formatter
- Jika ingin mengekstrak link, memperpendek judul, atau membersihkan teks.
- Gunakan “Text” atau “Formatter by Zapier”.

![formatter1](https://s3.gifyu.com/images/formatter1.md.jpg)

#### 4. Action: **Webhooks by Zapier**
- Pilih **Custom Request**
- Method: `POST`
- URL: masukkan URL webhook Discord kamu
- Headers: Content-Type: application/json
- Payload (Contoh isi data):

```json
{
"content": "***[UPDATE ANIME TERBARU]*** @everyone",
"embeds": [
  {
    "title": "__**{{title}}**__",
    "description": "{{description}}",
    "url": "{{link}}",
    "color": 1127128,
    "image": {
      "url": "{{img}}"
    }
  }
]
}
```
![](https://s3.gifyu.com/images/jahd8383883.md.jpg)

#### 5. Tes Zap
Klik tombol Test dan lihat apakah pesan berhasil masuk ke Discord. Jika ya, selamat! Otomasi berhasil dibuat.

---

### Huginn

Kalau kamu ingin solusi open-source yang bisa kamu host sendiri, Huginn adalah pilihan yang sangat fleksibel.

#### 1. Deploy Huginn
Kamu bisa deploy Huginn ke server pribadi atau pakai Heroku. Contoh repo yang bisa kamu coba:
[github.com/rokhimin/huginn-test](https://github.com/rokhimin/huginn-test)

#### 2. Buat Agen (Agent) di Huginn

📰 RSS Agent
Tujuan: membaca feed secara berkala

Set URL feed yang ingin dipantau

Schedule: 1 menit (bisa diatur 5m, 10m, dll)

Output: dikirim ke Formatter Agent

![](https://s3.gifyu.com/images/huginn0.jpg)

🛠️ Formatter Agent (Opsional)
Untuk memfilter atau memformat isi feed

Gunakan Liquid Filter dari Shopify

Sumber: RSS Agent

Tujuan: Post Agent

![](https://s3.gifyu.com/images/huginn1.jpg)

📤 Post Agent
Jadwal: never (karena hanya dijalankan saat menerima data dari Formatter Agent)

Tujuan: mengirim data ke Discord menggunakan webhook

Payload JSON mirip seperti contoh di Zapier

Gunakan fitur dry run untuk memastikan semuanya berjalan dengan benar

![](https://s3.gifyu.com/images/huginn2.jpg)

Setelah semua konfigurasi selesai, kamu akan mendapatkan bot otomatis yang memposting update dari RSS ke Discord, seperti contoh berikut:

![](https://s3.gifyu.com/images/rssdiscord-whd-28922.jpg)

## Kesimpulan

Dengan Zapier atau Huginn, kamu bisa membuat sistem autoposting Discord yang powerful. Zapier cocok untuk yang ingin instan tanpa coding. Huginn cocok buat kamu yang suka eksplorasi dan ingin kontrol penuh.

Semoga tutorial ini bermanfaat! Jangan ragu untuk bereksperimen dan tingkatkan sesuai kebutuhanmu seperti filter berdasarkan keyword, atau notifikasi multi-channel? Bisa banget!

Kalau kamu suka artikel ini, kasih komentar dan share, ya! 