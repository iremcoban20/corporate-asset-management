#!/bin/bash

# Proje dizinine git (Kendi dizininizi buraya sabitleyebilirsiniz eger baska yerden calistiracaksaniz)
# cd /home/irem/my_project 

# Docker kontrolü
if ! command -v docker &> /dev/null; then
    echo "❌ Hata: 'docker' komutu bulunamadı. Lütfen Docker Desktop'ı kurun ve başlatın."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Hata: Docker daemon çalışmıyor. Lütfen Docker Desktop uygulamasını başlatın."
    exit 1
fi

echo "🚀 Varlık Takip Sistemi Başlatılıyor..."

# Docker Compose'u çalıştır
if docker compose up -d; then
    echo ""
    echo "✅ Sistem Arka Planda Çalışıyor!"
    echo "------------------------------------------------"
    echo "🌐 Web Arayüzü: http://localhost:3001"
    echo "🔧 API Servisi: http://localhost:3000"
    echo "------------------------------------------------"
    echo "Durdurmak için terminalde proje dizinine gidip 'docker-compose down' yazabilirsiniz."
else
    echo ""
    echo "❌ Hata: Docker konteynerleri başlatılamadı."
    exit 1
fi
