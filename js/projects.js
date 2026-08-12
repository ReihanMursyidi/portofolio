const projectsData = [
    {
        title: "Skripsi AI Generator",
        image: "img/skripsi-ai.png", // Pastikan Anda menyiapkan gambar ini di folder img
        desc: "Platform pintar buat mahasiswa tingkat akhir. Dibangun dengan React untuk UI yang clean, ditenagai FastAPI, dan menggunakan arsitektur Vector Search (ChromaDB) agar AI bisa menganalisis kejenuhan topik.",
        tags: ["React", "FastAPI", "ChromaDB", "MySQL", "LLM"],
        links: {
            demo: "#", // Ganti dengan link asli jika ada
            source: "https://github.com/ReihanMursyidi"
        },
        hasCaseStudy: true // <-- INI ADALAH KUNCI PEMICUNYA
    },
    {
        title: "Blackwood Barbershop",
        image: "img/barbershop.png",
        desc: "Platform digital komprehensif untuk barbershop yang mengintegrasikan Landing Page elegan dengan sistem reservasi (booking) cerdas berbasis time-blocking.",
        tags: ["React", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL"],
        links: {
            demo: "https://barbershop-frontend-orpin.vercel.app/",
            source: [
                "https://github.com/ReihanMursyidi/barbershop-frontend", 
                "https://github.com/ReihanMursyidi/barbershop-backend"
            ]
        }
    },
    {
        title: "Student Radar",
        image: "img/student-radar.png",
        desc: "Aplikasi analisis prediktif berbasis web yang memadukan kekuatan LLM dan Machine Learning untuk mengidentifikasi potensi kendala akademik serta perilaku siswa secara akurat.",
        tags: ["JavaScript", "FastAPI", "Scikit-learn", "Pandas", "Gemini AI", "SQLite"],
        links: {
            demo: "https://huggingface.co/spaces/reihanmursyidi/student-radar",
            source: "https://github.com/ReihanMursyidi/student-radar"
        }
    },
    {
        title: "Katalis AI",
        image: "img/katalis.png",
        desc: "Platform asisten cerdas bagi tenaga pendidik yang memanfaatkan Google Gemini API untuk mengotomatisasi dan menyederhanakan berbagai tugas administratif.",
        tags: ["JavaScript", "FastAPI", "Scikit-learn", "Gemini AI", "HTML/CSS"],
        links: {
            demo: "https://katalis1.vercel.app",
            source: "https://github.com/ReihanMursyidi/katalis-ai"
        }
    },
    {
        title: "Scent Consultant AI",
        image: "img/parfum-preview.png",
        desc: "Sistem rekomendasi virtual yang menganalisis profil kepribadian pengguna untuk memberikan saran aroma parfum yang paling cocok melalui integrasi Gemini AI.",
        tags: ["JavaScript", "FastAPI", "Scikit-learn", "Gemini AI", "HTML/CSS"],
        links: {
            demo: "https://reihanmursyidi.github.io/Scent-Consultant-AI/",
            source: "https://github.com/ReihanMursyidi/Scent-Consultant-AI"
        }
    },
    {
        title: "AI Customer Service Akademi Crypto",
        image: "img/chatbot-ac.png",
        desc: "Chatbot cerdas untuk layanan pelanggan yang mengimplementasikan teknologi RAG (Retrieval-Augmented Generation) guna memberikan jawaban akurat seputar Akademi Crypto.",
        tags: ["JavaScript", "FastAPI", "Langchain", "FAISS", "Gemini AI"],
        links: {
            demo: "https://reihanmursyidi.github.io/chatbot-akademi-crypto/",
            source: "https://github.com/ReihanMursyidi/chatbot-akademi-crypto"
        }
    },
    {
        title: "AI Financial Tracker Bot",
        image: "img/chatbot-telegram-preview.png",
        desc: "Bot Telegram asisten keuangan yang menggunakan NLP (Natural Language Processing) untuk mengubah pesan percakapan sehari-hari menjadi data pengeluaran terstruktur.",
        tags: ["Python", "FastAPI", "Telegram API", "Groq AI", "PostgreSQL"],
        links: {
            demo: null, 
            source: "https://github.com/ReihanMursyidi/finance-bot"
        }
    }
];
