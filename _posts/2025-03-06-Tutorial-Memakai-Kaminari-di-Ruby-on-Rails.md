---
layout: post
title: Tutorial Memakai Kaminari di Ruby on Rails
date: 2025-03-06
author: whdzera
comments: true
---
### Apa Itu Kaminari?
Kaminari adalah sebuah gem Ruby untuk melakukan pagination pada ActiveRecord, Mongoid, dan berbagai ORM lainnya. 
Pagination adalah fitur penting dalam aplikasi web untuk menampilkan data dalam jumlah besar secara efisien, kamu bisa dengan mudah membatasi jumlah item yang ditampilkan di satu halaman, serta menyediakan navigasi untuk pindah ke halaman-halaman berikutnya.

Berikut ini cara memakai Gem Kaminari di Ruby on rails.

#### 1. Instalasi

Tambahkan Kaminari ke file `Gemfile`:
```ruby
gem 'kaminari'
```
Kemudian jalankan perintah:
```ruby
bundle install
```

#### 2. Setup Pagination di Controller

Misalkan kamu punya model Post, dan ingin menampilkan daftar postingan yang dipaginasi.

Di `posts_controller.rb`, ubah action index seperti berikut:
```ruby
def index
  @posts = Post.order(created_at: :desc).page(params[:page]).per(10)
end
```
`page(params[:page])` Menentukan halaman saat ini berdasarkan parameter URL `?page=`

#### 3. Tampilkan Pagination di View

Di file `app/views/posts/index.html.erb`, tambahkan kode berikut setelah daftar item:
```erb
<% @posts.each do |post| %>
  <div class="post">
    <h2><%= post.title %></h2>
    <p><%= truncate(post.content, length: 100) %></p>
  </div>
<% end %>

<%= paginate @posts %>
```

#### 4. Kustomisasi Tampilan Paginasi

Kaminari menyediakan generator untuk membuat file partial yang bisa kamu modifikasi:
```bash
rails g kaminari:views default
```

Ini akan menghasilkan file-file ERB di `app/views/kaminari/`. Kamu bisa mengedit tampilan tombol pagination sesuai selera, atau menambahkan class Tailwind, Bulma, Bootstrap, dsb.

Contoh kustomisasi tombol:
```erb
<li class="page-item <%= 'active' if current_page? %>">
  <%= link_to page, url, class: "page-link" %>
</li>
```

#### 5. Contoh URL Paginasi

Setelah setup di atas, kamu bisa membuka URL seperti:
```
http://localhost:3000/posts?page=2
```
Dan Rails akan menampilkan halaman ke-2 dari daftar Post

Dengan gem Kaminari, proses pagination di aplikasi Rails menjadi sangat mudah dan fleksibel. Kamu bisa menggunakannya di berbagai model, mengkustom tampilan, serta menggabungkannya dengan AJAX atau infinite scrolling untuk pengalaman pengguna yang lebih modern.

Semoga tutorial ini bermanfaat! Jika ada pertanyaan atau saran, silakan tinggalkan komentar di bawah.

