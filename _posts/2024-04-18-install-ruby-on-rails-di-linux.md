---
layout: post
title: Install Ruby on Rails di Linux Ubuntu
date: 2024-04-18
author: whdzera
thumbnail: app/assets/images/ror.png
comments: true
---

### ALASAN
mengapa ruby on rails ?  karena framework ruby on rails , MVC dan bahasa ruby sangat elegan dan enak dipandang, mungkin :) . tenang, gampang kok instal ruby dan ruby on rails di Ubuntu 

jadi gak usah banyak kata, langsung aja kita mulai : 

### PERSIAPAN 
-Koneksi Internet Stabil 

-Akses Root 

-Sudah terinstal Curl 

```bash
$ sudo apt-get install curl
```


### INSTAL RUBY DENGAN RVM  
rvm adalah ruby version manager . fungsinya untuk memanage versi dari ruby dan rails. 
keuntunganya kita bisa berganti versi dari ruby dan rails dengan mudah dan gak ribet

```bash
$ \curl -L https://get.rvm.io | bash -s stable --ruby
```


update rvm dan instal ruby, disini saya menggunakan ruby versi 2.4.0 

```bash
$ rvm get stable --autolibs=enable
```  

```bash
$ rvm install ruby
```  

```bash
$ rvm --default use ruby-2.4.0
``` 


cek ruby sudah terinstal 

```bash
$ ruby -v
``` 


cek gem 

```bash
$ gem -v
``` 


update gem 

```bash
$ gem update --system
``` 


set rvm global gemset dan gem yg ada 

```bash
$ rvm gemset use global
``` 

```bash
$ gem list
``` 


instal rails dengan ruby gems 

```bash
$ gem install rails
``` 
    
cek rails sudah teinstal 

```bash
$ rails -v
``` 

selesai . kita sudah menginstal ruby dan ruby on rails :) 
kita sudah bisa buat project atau aplikasi dengan ruby on rails 



### BUAT PROJECT BARU DENGAN RUBY ON RAILS   

buat direktori baru 

```bash
$ mkdir project_rubyonrails
``` 


masuk direktori project_rubyonrails 

```bash
$ cd project_rubyonrails
``` 


buat project baru ruby on rails 

```bash
$ rails new appku
``` 


masuk direktori project appku 

```bash
$ cd appku
``` 


test server

```bash
$ rails s
``` 


buka browser dan ketik di address bar 

```http://localhost:3000``` 

jika tidak ada masalah . akan seperti gambar dibawah 


![sucess](https://s3.gifyu.com/images/eNjSzlZ8UOw.jpg)




