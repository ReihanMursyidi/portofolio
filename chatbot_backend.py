from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

NAMA = "Reihan Mursyidi"
POSISI = "Junior AI Engineer & Backend Developer"

print("🔄 Memuat database & Menghubungkan ke Groq Cloud...")

qa_chain = None

try:
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    faiss_path = os.path.join(current_dir, "faiss_index")

    if os.path.exists(faiss_path):
        vectorstore = FAISS.load_local(faiss_path, embeddings, allow_dangerous_deserialization=True)
        retreiver = vectorstore.as_retriever(search_kwargs={"k": 3})

        llm = ChatGroq(
            temperature=0.6,
            model_name="llama-3.1-8b-instant",
            api_key=os.getenv("GROQ_API_KEY")
        )

        prompt_template = f"""Anda adalah AI Digital Twin dari {NAMA}.
        Tugas Anda adalah menjawab pertanyaan rekruter atau pengunjung tentang diri {NAMA} ({POSISI}).
        
        TUGAS:
        Jawablah pertanyaan selayaknya {NAMA} menjawab chat profesional di WhatsApp/LinkedIn.
        
        ATURAN LOGIKA (WAJIB DIPATUHI):
        1. **DETEKSI SAPAAN:** - JIKA user hanya bilang "Halo", "Hi", "Pagi" -> Jawab dengan ramah: "Halo! Ada yang bisa dibantu?"
           
        2. **DETEKSI PERTANYAAN (PENTING):**
           - JIKA user bertanya (contoh: "Lulusan mana?", "Bisa Python?", "Apa hobimu?") -> **JANGAN** gunakan kata "Halo" atau "Hai" lagi di awal kalimat. 
           - **LANGSUNG** jawab intinya.
           - Contoh Salah: "Halo! Saya lulusan..."
           - Contoh Benar: "Saya lulusan Universitas Pamulang tahun 2025."
        
        3. **GAYA BAHASA:** - Gunakan kata ganti "Saya" atau "Aku". 
           - Santai tapi tetap sopan.

        4. **DATA:** Jawab hanya berdasarkan Konteks. Jika tidak ada di konteks, arahkan ke kontak pribadi.

        Konteks Data Diri:
        {{context}}

        Pertanyaan Pengunjung: {{question}}

        Jawaban Anda:"""

        QA_CHAIN_PROMPT = PromptTemplate.from_template(prompt_template)

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retreiver,
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        print("✅ Otak Groq (Llama 3 Cloud) Siap!")
    else:
        print("❌ Folder 'faiss_index' tidak ditemukan. Jalankan train_knowledge.py dulu dengan data_pribadi.")
except Exception as e:
    print(f"❌ Gagal memuat database atau menghubungkan ke Groq Cloud: {e}")

LOG_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "chat_logs")
if not os.path.exists(LOG_FOLDER):
    os.makedirs(LOG_FOLDER)

def save_to_log(session_id, role, message):
    filename = f"{LOG_FOLDER}/chat_{session_id}.json"
    history = []
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            try: history = json.load(f)
            except: history = []
    history.append({"role": role, "message": message})
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=4)

class Question(BaseModel):
    session_id: str
    question: str

@app.post("/chat")
async def chat(request: Question):
    if not qa_chain:
        raise HTTPException(status_code=500, detail="Otak Groq belum siap. Coba lagi nanti.")
    
    try:
        save_to_log(request.session_id, "user", request.question)

        response = qa_chain.invoke({"query": request.question})
        answer = response['result']

        save_to_log(request.session_id, "bot", answer)
        return {"answer": answer}
    except Exception as e:
        return {"answer": "Maaf, server sedang sibuk.", "error": str(e)}
    
@app.get("/history/{session_id}")
def get_history(session_id: str):
    filename = f"{LOG_FOLDER}/chat_{session_id}.json"
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            history = json.load(f)
    return []

@app.get("/")
def root():
    return {"status": "active", "bot": NAMA, "model": "Llama 3 via Groq"}