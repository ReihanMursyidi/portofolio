import os
import sys
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, UnstructuredWordDocumentLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

def train_bot():
    # 1. TENTUKAN LOKASI SCRIPT
    current_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"📂 Sedang mencari data (PDF/DOCX) di folder:\n   -> {current_dir}")

    documents = []
    
    # --- 2. BACA FILE WORD (.docx) ---
    try:
        # Gunakan glob untuk mencari semua file .docx
        docx_loader = DirectoryLoader(current_dir, glob="*.docx", loader_cls=UnstructuredWordDocumentLoader)
        docx_docs = docx_loader.load()
        if docx_docs:
            print(f"   📄 Ditemukan {len(docx_docs)} file Word (.docx)")
            documents.extend(docx_docs)
    except Exception as e:
        print(f"   ⚠️ Info: Gagal membaca DOCX atau tidak ada file DOCX. ({e})")

    # --- 3. BACA FILE PDF (.pdf) ---
    try:
        # Gunakan glob untuk mencari semua file .pdf
        # Kita pakai PyPDFLoader yang lebih cepat dan ringan
        pdf_loader = DirectoryLoader(current_dir, glob="*.pdf", loader_cls=PyPDFLoader)
        pdf_docs = pdf_loader.load()
        if pdf_docs:
            print(f"   📕 Ditemukan {len(pdf_docs)} file PDF")
            documents.extend(pdf_docs)
    except Exception as e:
        print(f"   ⚠️ Info: Gagal membaca PDF atau tidak ada file PDF. ({e})")

    # --- CEK TOTAL DOKUMEN ---
    if not documents:
        print("\n❌ GAGAL: Tidak ada file .docx maupun .pdf yang ditemukan!")
        print("👉 Pastikan Anda menaruh file CV/Portofolio di folder yang sama dengan script ini.")
        return
    else:
        print(f"✅ Total {len(documents)} dokumen berhasil dimuat.")

    # --- 4. PECAH TEXT (CHUNKING) ---
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    print(f"✂️  Dokumen dipecah menjadi {len(texts)} potongan informasi.")

    # --- 5. BUAT EMBEDDING (LOKAL) ---
    print("🧠 Sedang menanamkan ingatan (HuggingFace Local)...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    
    # --- 6. SIMPAN DATABASE ---
    vectorstore = FAISS.from_documents(texts, embeddings)
    
    save_path = os.path.join(current_dir, "faiss_index")
    vectorstore.save_local(save_path)
    
    print(f"🎉 Selesai! Database tersimpan di:\n   -> {save_path}")

if __name__ == "__main__":
    train_bot()