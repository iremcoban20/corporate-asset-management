# Asset Management System Automation

Bu proje, bir şirketin fiziksel varlıklarını (laptop, monitör, araçlar, lisanslar vb.) takip etmek, sahipliğini yönetmek ve geçmişini izlemek için PostgreSQL tabanlı bir otomasyon sistemidir. Proje, Docker üzerinde koşan bir PostgreSQL veritabanı ile çalışır.

## Özellikler
- **Varlık Takibi:** Demirbaşların durumu ve özellikleri.
- **Çalışan Yönetimi:** Varlıkların zimmetlendiği çalışanlar.
- **Zimmet Geçmişi:** Kimde, ne zaman, hangi durumda?
- **Normalize Veritabanı:** İlişkisel ve tutarlı veri yapısı.
- **Dockerize Yapı:** Tek komutla tüm ortamın kurulumu.

## Gereksinimler
- Docker ve Docker Compose (Windows 10 üzerinde kurulu olmalı)
- Git (Opsiyonel, repoyu klonlamak için)

## Kurulum ve Çalıştırma

1. **Repoyu Klonlayın veya İndirin**
   ```bash
   git clone <repo-url>
   cd my_project
   ```

2. **Sistemi Başlatın**
   Veritabanını ayağa kaldırmak ve tabloları otomatik oluşturmak için:
   ```bash
   docker-compose up -d
   ```
   Bu komut:
   - PostgreSQL 16 konteynerini indirir.
   - `pgdata` volume'ünü oluşturur (verilerin kalıcılığı için).
   - `init.sql` dosyasını çalıştırarak veritabanı şemasını kurar.

3. **Veritabanına Erişim**
   Konteyner çalıştıktan sonra veritabanına bağlanmak için herhangi bir PostgreSQL istemcisi (DBeaver, pgAdmin) veya komut satırı kullanabilirsiniz.

   - **Host:** `localhost`
   - **Port:** `5432`
   - **Kullanıcı:** `admin`
   - **Şifre:** `securepassword123`
   - **Veritabanı:** `asset_db`

   Komut satırından bağlanmak için:
   ```bash
   docker exec -it asset_management_db psql -U admin -d asset_db
   ```

## Veritabanı Şeması

Proje normalize edilmiş aşağıdaki tablolardan oluşur:

1. **departments:** Şirket departmanları.
2. **employees:** Çalışan bilgileri (İsim, email, departman).
3. **asset_categories:** Varlık kategorileri (Laptop, Monitor, Araç vb.).
4. **assets:** Tüm fiziksel ve dijital varlıklar.
   - `status`: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED
5. **asset_assignments:** Zimmet kayıtları (Geçmiş ve mevcut durumu tutar).

## Geliştirme Yol Haritası (Future Goals)

Projeyi daha da geliştirmek için aşağıdaki adımlar izlenebilir:

### 1. Backend API Geliştirme
Veritabanı ile konuşan bir RESTful API yazın.
- **Teknoloji:** Node.js (Express/NestJS) veya Python (FastAPI/Django).
- **Komut:**
  ```bash
  # Node.js örneği
  npm init -y
  npm install express pg
  ```

### 2. Frontend Arayüzü
API'yi kullanarak kullanıcı dostu bir arayüz yapın.
- **Teknoloji:** React, Vue veya Angular.
- **Komut:**
  ```bash
  npx create-next-app@latest my-asset-app
  ```

### 3. Yönetim Paneli
Admin paneli için hazır araçlar entegre edilebilir (AdminJS, Forest Admin).

### 4. Raporlama
Varlık durumları ve departman bazlı raporlar için SQL sorguları geliştirin veya bir BI aracı bağlayın (Metabase).

## Sorun Giderme
Eğer port hatası alırsanız (5432 doluysa), `docker-compose.yml` dosyasındaki portu değiştirin (örn: `"5433:5432"`).
