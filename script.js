// --- 1. DATA KUMPULAN FLASHCARD (Array of Objects) ---
const flashcardData = [
    {
        question: "Apa kepanjangan dari HTML?",
        answer: "HyperText Markup Language"
    },
    {
        question: "Apa fungsi utama dari CSS dalam pengembangan web?",
        answer: "Mengatur tampilan visual, tata letak (layout), dan estetika halaman web."
    },
    {
        question: "Apa perbedaan utama antara tag <div> dan <span>?",
        answer: "<div> adalah elemen block-level (memakan satu baris penuh), sedangkan <span> adalah inline-level (hanya memakan ruang seukuran teksnya)."
    },
    {
        question: "Apa fungsi perintah 'git commit' di dalam Version Control Git?",
        answer: "Menyimpan rekam jejak (snapshot) perubahan kode yang sudah dipilih (staged) ke dalam riwayat repositori lokal."
    }
];

// --- 2. MENGAMBIL ELEMEN HTML BERDASARKAN ID ---
const cardCounter = document.querySelector('#card-counter');
const cardText = document.querySelector('#card-text');
const cardLabel = document.querySelector('#card-label');
const flashcardEl = document.querySelector('#flashcard');
const btnFlip = document.querySelector('#btn-flip');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

// --- 3. STATE (STATUS APLIKASI) ---
let currentCardIndex = 0; // Menandakan kartu aktif saat ini (mulai dari 0)
let showingAnswer = false;  // Status apakah sedang menampilkan jawaban atau pertanyaan

// --- 4. FUNGSI UNTUK MENAMPILKAN KARTU KE LAYAR ---
function displayCard() {
    const currentCard = flashcardData[currentCardIndex];
    
    // Perbarui teks indikator posisi (Contoh: Kartu 1 dari 4)
    cardCounter.textContent = `Kartu ${currentCardIndex + 1} dari ${flashcardData.length}`;

    // Tampilkan teks berdasarkan status (Pertanyaan atau Jawaban)
    if (showingAnswer) {
        cardLabel.textContent = "Jawaban";
        cardText.textContent = currentCard.answer;
        flashcardEl.style.backgroundColor = "#e6fcf5"; // Ubah sedikit warna latar saat melihat jawaban
    } else {
        cardLabel.textContent = "Pertanyaan";
        cardText.textContent = currentCard.question;
        flashcardEl.style.backgroundColor = "#fafbfc"; // Kembalikan warna normal
    }
}

// --- 5. FUNGSI MEMBALIK KARTU (TOGGLE PERTANYAAN ↔ JAWABAN) ---
function toggleCard() {
    showingAnswer = !showingAnswer; // Membalik nilai boolean (true jadi false, false jadi true)
    displayCard();
}

// --- 6. FUNGSI NAVIGASI (BERPINDAH KARTU) ---
function nextCard() {
    showingAnswer = false; // Reset ke mode pertanyaan saat pindah kartu
    currentCardIndex++;
    
    // Jika sudah di kartu terakhir, putar balik ke kartu pertama (Looping)
    if (currentCardIndex >= flashcardData.length) {
        currentCardIndex = 0;
    }
    
    displayCard();
}

function prevCard() {
    showingAnswer = false; // Reset ke mode pertanyaan saat pindah kartu
    currentCardIndex--;
    
    // Jika di kartu pertama lalu menekan prev, pindah ke kartu paling akhir
    if (currentCardIndex < 0) {
        currentCardIndex = flashcardData.length - 1;
    }
    
    displayCard();
}

// --- 7. EVENT LISTENERS (MENDENGARKAN AKSI KLIK PENGGUNA) ---
btnFlip.addEventListener('click', toggleCard);
flashcardEl.addEventListener('click', toggleCard); // Kartu juga bisa diklik untuk membalik
btnNext.addEventListener('click', nextCard);
btnPrev.addEventListener('click', prevCard);

// --- 8. MENJALANKAN FUNGSI PERTAMA KALI SAAT HALAMAN DIBUKA ---
displayCard();