# 1. Gunakan Python versi ringan
FROM python:3.9-slim

# 2. Buat folder kerja di dalam server
WORKDIR /app

# 3. Copy requirements dulu (agar caching efisien)
COPY requirements.txt .

# 4. Install library
# --no-cache-dir agar ukuran file kecil
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy semua file project Anda ke dalam server
COPY . .

# 6. Berikan izin akses ke folder (PENTING untuk FAISS & Log)
# Hugging Face menjalankan user non-root (user 1000)
RUN chmod -R 777 /app

# 7. Jalankan Server
# WAJIB: Port harus 7860 di Hugging Face
CMD ["uvicorn", "chatbot_backend:app", "--host", "0.0.0.0", "--port", "7860"]
