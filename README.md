# 📦 Şirket Varlık Takip Sistemi (Asset Tracking Automation)

Bu proje, şirket içi fiziksel varlıkların (laptop, telefon, araç vb.) takibini sağlamak, personele zimmetlemek ve zimmet geçmişini yönetmek için geliştirilmiş modern bir web uygulamasıdır.

## 🚀 Özellikler

- **Dashboard:** Toplam varlık, zimmetli ürün, personel sayısı ve bakım durumu özeti.
- **Varlık Yönetimi:**
  - Yeni varlık ekleme (Seri No, Marka, Model, Kategori).
  - Varlık listeleme, arama ve filtreleme.
  - Durum takibi (Mevcut, Zimmetli, Bakımda, Emekli).
- **Zimmet İşlemleri:**
  - "Mevcut" durumdaki ürünleri personele zimmetleme (`Assign`).
  - Zimmetlenen ürünleri personelden geri alma (`Return`).
  - **Özel Popup:** İade işlemi için güvenli onay penceresi.
- **Personel Yönetimi:**
  - Çalışan listesi ve departman bilgileri.
  - Yeni çalışan ekleme.
- **Teknolojiler:**
  - **Frontend:** Next.js 14 (App Router), Vanilla CSS (Premium Design).
  - **Backend:** Node.js (Express.js).
  - **Veritabanı:** PostgreSQL (Dockerized).
  - **Altyapı:** Docker & Docker Compose (Tek komutla kurulum).

---

## 🛠️ Kurulum ve Çalıştırma

Proje tamamen Dockerize edilmiştir. Bilgisayarınızda `Docker` ve `Docker Compose` kurulu olması yeterlidir.

### 1. Projeyi Başlatma
Terminali açın ve proje dizininde şu komutu çalıştırın:
```bash
docker-compose up --build
```
*Bu komut veritabanını, backend servisini ve frontend uygulamasını sırasıyla hazırlar ve başlatır.*

### 2. Uygulamaya Erişim
- **Web Arayüzü (Frontend):** [http://localhost:3001](http://localhost:3001)
- **API Servisi (Backend):** [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Veritabanı Bilgileri

Sistem ilk açıldığında `init.sql` dosyası sayesinde gerekli tabloları ve örnek verileri (Departmanlar, Kategoriler) otomatik oluşturur.

- **Host:** `localhost` (Site içi: `db`)
- **Port:** `5432`
- **Kullanıcı:** `admin`
- **Şifre:** `securepassword123`
- **Veritabanı:** `asset_db`

---

## 📖 Kullanım Senaryosu

1.  **Varlık Ekle:** `/assets/new` sayfasına gidin ve şirkete alınan yeni bir bilgisayarı kaydedin. Durumu "Mevcut" olacaktır.
2.  **Çalışan Ekle:** `/employees/new` sayfasından yeni işe başlayan bir personeli kaydedin.
3.  **Zimmetle:** Varlık listesinde (`/assets`), eklediğiniz ürünün yanındaki **"Zimmetle"** butonuna basın. Çalışanı seçip kaydedin.
4.  **Kontrol Et:** Listede ürünün durumu **"Zimmetli"** olacak ve personelin adı görünecektir.
5.  **İade Al:** Personel ürünü teslim ettiğinde, listedeki **"İade Al"** butonuna basın. Açılan onay penceresine "Onayla" dediğinizde ürün tekrar havuza döner.

---

## 🔮 Gelecek Planları (Roadmap)

- [ ] Kullanıcı Girişi (Login/Auth) sistemi.
- [ ] Detaylı zimmet geçmişi (Log) sayfası.
- [ ] Varlıklar için QR Kod oluşturma.
- [ ] Bakım (Maintenance) modülü entegrasyonu.

---
*Geliştirici: Antigravity (Google DeepMind)*
