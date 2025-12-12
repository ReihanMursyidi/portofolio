// 1. SETUP SESSION ID (Agar history tersimpan)
let sessionId = localStorage.getItem('portfolio_chat_id');
if (!sessionId) {
    sessionId = "guest_" + Date.now();
    localStorage.setItem('portfolio_chat_id', sessionId);
}

const API_URL = "https://reihanmursyidi-portofolio-chatbot.hf.space"; // Ganti URL ini nanti jika pakai Ngrok

// 2. DETEKSI ENTER (Tanpa Refresh)
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

// 3. FUNGSI BUKA/TUTUP
function toggleChat() {
    const w = document.getElementById('chatWindow');
    if (w.style.display === 'flex') {
        w.style.display = 'none';
    } else {
        w.style.display = 'flex';
        setTimeout(() => document.getElementById('userInput').focus(), 100);
        loadHistory(); // Cek history saat dibuka
    }
}

// 4. LOAD HISTORY
async function loadHistory() {
    const chatBody = document.getElementById('chatBody');
    // Cek apakah sudah pernah load (biar gak dobel)
    if(chatBody.getAttribute("data-loaded") === "true") return;

    try {
        const res = await fetch(`${API_URL}/history/${sessionId}`);
        const history = await res.json();
        
        if (history && history.length > 0) {
            // Bersihkan pesan default jika ada history
            chatBody.innerHTML = ""; 
            
            history.forEach(item => {
                let cssClass = (item.role === "user") ? "msg-user" : "msg-bot";
                let content = item.message;
                if (item.role === "bot") content = marked.parse(content);
                chatBody.innerHTML += `<div class="msg ${cssClass}">${content}</div>`;
            });
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        chatBody.setAttribute("data-loaded", "true"); // Tandai sudah load
    } catch (e) { console.log("Belum ada history"); }
}

// 5. KIRIM PESAN
async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const text = input.value.trim();

    if (!text) return;

    // Tampilkan User Msg
    chatBody.innerHTML += `<div class="msg msg-user">${text}</div>`;
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Loading Animation
    const loadId = "load-" + Date.now();
    chatBody.innerHTML += `<div class="msg msg-bot" id="${loadId}">Sedang mengetik...</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const res = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text, session_id: sessionId })
        });
        
        const data = await res.json();
        document.getElementById(loadId).remove();
        
        let answer = marked.parse(data.answer);
        chatBody.innerHTML += `<div class="msg msg-bot">${answer}</div>`;

    } catch (err) {
        document.getElementById(loadId).innerHTML = "⚠️ Maaf, Reihan AI sedang offline (Server Error).";
    }
    chatBody.scrollTop = chatBody.scrollHeight;

}
