---
layout: post
title: Cara pasang tema di jekyll
date: 2025-02-12
thumbnail: assets/img/jekyll.png
comments: true
---
#### First
jika belum install jekyll

install jekyll (lewati jika sudah instal)

```bash
gem install jekyll
```


buat app jekyll (lewat jika sudah buat)

```bash
jekyll new nama_app
```

#### Setup Theme

tambahkan di file gemfile (disini saya mau memakai tema [Niri](https://github.com/rokhimin/jekyll-niri), tema jekyll buatan saya :promosi hehe )

```bash
gem "niri", "~> 1.4"
```

kemudian 

```bash
bundle
```

tambahkan di file _config.yml

```bash
theme: niri
```

#### finish

jalankan jekyll

```bash
bundle exec jekyll s
```

buka browser dan ketik di address bar 

**http://localhost:4000**

#### misc

tambahan : untuk menggunakan tema jekyll di github page agak berbeda, harus menggunakan remote repo dari github.

tambahkan di file _config.yml

```yaml
remote_theme: rokhimin/jekyll-niri
```

#### another theme jekyll

kalian bisa mencari tema lainya di 

- [jekyllthemes.org](http://jekyllthemes.org/)
- [jekylltheme.io](https://jekyllthemes.io/)
- [jamstackthemes](https://jamstackthemes.dev/ssg/jekyll/)
- Github kata kunci search 'jekyll theme'
- dll

![](https://s3.gifyu.com/images/bSMG2.png)

