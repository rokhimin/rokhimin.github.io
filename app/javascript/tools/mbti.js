
const questions = [
    // Original questions
    {
        question: "Saat berada di lingkungan sosial, Anda cenderung:",
        options: {
            A: "Merasa energik dan bersemangat setelah berinteraksi dengan banyak orang",
            B: "Perlu waktu sendiri untuk mengisi ulang energi setelah bersosialisasi"
        },
        dimension: "EI"
    },
    {
        question: "Ketika menghadapi masalah baru, Anda lebih suka:",
        options: {
            A: "Mengandalkan pengalaman dan fakta yang ada",
            B: "Mencari pola dan menggunakan intuisi"
        },
        dimension: "SN"
    },
    {
        question: "Dalam membuat keputusan penting, Anda lebih memprioritaskan:",
        options: {
            A: "Logika dan objektivitas",
            B: "Nilai-nilai dan dampak pada perasaan orang lain"
        },
        dimension: "TF"
    },
    {
        question: "Dalam menjalani hidup sehari-hari, Anda lebih suka:",
        options: {
            A: "Memiliki rencana dan jadwal yang teratur",
            B: "Bersikap fleksibel dan spontan"
        },
        dimension: "JP"
    },
    {
        question: "Dalam percakapan, Anda cenderung:",
        options: {
            A: "Berbicara terlebih dahulu, berpikir kemudian",
            B: "Berpikir terlebih dahulu, berbicara kemudian"
        },
        dimension: "EI"
    },
    {
        question: "Anda lebih tertarik pada:",
        options: {
            A: "Hal-hal yang nyata dan praktis",
            B: "Ide-ide abstrak dan kemungkinan-kemungkinan baru"
        },
        dimension: "SN"
    },
    {
        question: "Kritik yang menyakitkan namun benar, bagi Anda:",
        options: {
            A: "Berguna meskipun menyakitkan",
            B: "Sebaiknya disampaikan dengan cara yang lebih halus"
        },
        dimension: "TF"
    },
    {
        question: "Ketika bekerja pada proyek, Anda lebih suka:",
        options: {
            A: "Menyelesaikan satu tugas sebelum memulai yang lain",
            B: "Bekerja pada beberapa tugas secara bergantian"
        },
        dimension: "JP"
    },
    {
        question: "Anda merasa lebih nyaman ketika:",
        options: {
            A: "Berada di sekitar banyak orang",
            B: "Menghabiskan waktu dengan beberapa teman dekat atau sendiri"
        },
        dimension: "EI"
    },
    {
        question: "Anda cenderung lebih fokus pada:",
        options: {
            A: "Detail dan fakta spesifik",
            B: "Gambaran besar dan koneksi antar konsep"
        },
        dimension: "SN"
    },
    {
        question: "Saat teman menghadapi masalah, Anda lebih suka:",
        options: {
            A: "Membantu menemukan solusi praktis",
            B: "Memberikan dukungan emosional"
        },
        dimension: "TF"
    },
    {
        question: "Anda lebih menyukai:",
        options: {
            A: "Kepastian dan perencanaan yang jelas",
            B: "Menjaga opsi tetap terbuka dan adaptif"
        },
        dimension: "JP"
    },
    {
        question: "Di waktu luang, Anda lebih suka:",
        options: {
            A: "Pergi ke acara sosial dan bertemu banyak orang",
            B: "Melakukan aktivitas sendiri atau dengan teman dekat"
        },
        dimension: "EI"
    },
    {
        question: "Anda lebih menghargai orang yang:",
        options: {
            A: "Memiliki pemikiran yang praktis dan realistis",
            B: "Memiliki imajinasi yang kuat dan visi ke depan"
        },
        dimension: "SN"
    },
    {
        question: "Anda merasa lebih nyaman membuat keputusan berdasarkan:",
        options: {
            A: "Analisis dan pertimbangan rasional",
            B: "Nilai-nilai personal dan dampak pada orang lain"
        },
        dimension: "TF"
    },
    {
        question: "Dalam pekerjaan, Anda lebih suka:",
        options: {
            A: "Mengikuti prosedur yang sudah ditetapkan",
            B: "Mencari cara-cara baru dan inovatif"
        },
        dimension: "JP"
    },
    {
        question: "Saat berada di ruangan yang ramai, Anda cenderung:",
        options: {
            A: "Merasa bersemangat dan ingin terlibat",
            B: "Merasa kewalahan dan ingin menyendiri"
        },
        dimension: "EI"
    },
    {
        question: "Anda lebih terkesan dengan orang yang:",
        options: {
            A: "Menguasai fakta dan detail",
            B: "Memiliki ide-ide kreatif dan inovatif"
        },
        dimension: "SN"
    },
    {
        question: "Dalam konflik, Anda cenderung:",
        options: {
            A: "Fokus pada argumen dan logika yang benar",
            B: "Mempertimbangkan perasaan dan menjaga harmoni"
        },
        dimension: "TF"
    },
    {
        question: "Anda merasa lebih nyaman ketika hidup Anda:",
        options: {
            A: "Terstruktur dan terorganisir",
            B: "Fleksibel dan mengalir"
        },
        dimension: "JP"
    },
    
    // Additional questions
    {
        question: "Ketika membaca, Anda lebih menikmati buku-buku yang:",
        options: {
            A: "Menggambarkan situasi dan karakter dengan jelas",
            B: "Memiliki makna tersembunyi dan simbolisme"
        },
        dimension: "SN"
    },
    {
        question: "Dalam diskusi kelompok, Anda lebih cenderung:",
        options: {
            A: "Berbicara dan berkontribusi secara aktif",
            B: "Mendengarkan dan berbicara ketika memiliki sesuatu yang penting"
        },
        dimension: "EI"
    },
    {
        question: "Anda lebih menghargai diri sendiri atas:",
        options: {
            A: "Kejujuran dan ketegasan",
            B: "Kebaikan dan pengertian"
        },
        dimension: "TF"
    },
    {
        question: "Ketika berlibur, Anda lebih suka:",
        options: {
            A: "Memiliki jadwal dan rencana yang jelas",
            B: "Mengalir dan melihat apa yang terjadi"
        },
        dimension: "JP"
    },
    {
        question: "Ketika mempelajari topik baru, Anda lebih suka:",
        options: {
            A: "Berdiskusi dan bertukar pendapat dengan orang lain",
            B: "Membaca dan merenungkannya sendiri"
        },
        dimension: "EI"
    },
    {
        question: "Anda lebih mempercayai:",
        options: {
            A: "Pengalaman dan pengamatan langsung",
            B: "Teori dan spekulasi"
        },
        dimension: "SN"
    },
    {
        question: "Anda merasa lebih produktif ketika lingkungan Anda:",
        options: {
            A: "Terstruktur dan terorganisasi",
            B: "Fleksibel dan tidak terlalu terbatas"
        },
        dimension: "JP"
    },
    {
        question: "Saat menghadapi ketidaksepakatan, Anda cenderung:",
        options: {
            A: "Berfokus pada fakta dan logika dalam argumen",
            B: "Mempertimbangkan nilai-nilai dan dampak pada hubungan"
        },
        dimension: "TF"
    },
    {
        question: "Dalam memilih pekerjaan, aspek yang Anda prioritaskan adalah:",
        options: {
            A: "Stabilitas dan prediktabilitas",
            B: "Kreativitas dan fleksibilitas"
        },
        dimension: "JP"
    },
    {
        question: "Anda lebih suka bekerja dengan orang-orang yang:",
        options: {
            A: "Praktis dan realistis",
            B: "Imajinatif dan penuh ide"
        },
        dimension: "SN"
    },
    {
        question: "Saat mengajar atau menjelaskan sesuatu, Anda biasanya:",
        options: {
            A: "Menekankan pada fakta dan contoh konkret",
            B: "Menekankan pada konsep dan teori"
        },
        dimension: "SN"
    },
    {
        question: "Ketika seseorang tidak setuju dengan Anda, Anda lebih cenderung:",
        options: {
            A: "Berdebat dan mempertahankan posisi Anda secara logis",
            B: "Mencari kompromi dan menghindari konfrontasi"
        },
        dimension: "TF"
    },
    {
        question: "Anda lebih suka pemimpin yang:",
        options: {
            A: "Tegas dan langsung ke pokok permasalahan",
            B: "Mempertimbangkan perasaan dan kebutuhan semua orang"
        },
        dimension: "TF"
    },
    {
        question: "Cara belajar yang Anda sukai adalah:",
        options: {
            A: "Dengan interaksi dan diskusi dengan orang lain",
            B: "Dengan refleksi dan pemikiran mandiri"
        },
        dimension: "EI"
    },
    {
        question: "Saat memecahkan masalah, Anda lebih suka:",
        options: {
            A: "Menggunakan metode dan pendekatan yang terbukti",
            B: "Mencoba pendekatan baru dan eksperimental"
        },
        dimension: "SN"
    },
    {
        question: "Ketika bertemu orang baru, Anda biasanya:",
        options: {
            A: "Memulai percakapan dan berkenalan",
            B: "Menunggu mereka memperkenalkan diri terlebih dahulu"
        },
        dimension: "EI"
    },
    {
        question: "Dalam perencanaan pesta, Anda lebih cenderung:",
        options: {
            A: "Membuat daftar dan jadwal terperinci",
            B: "Menyiapkan elemen dasar dan berimprovisasi"
        },
        dimension: "JP"
    },
    {
        question: "Ketika berada di bawah tekanan, Anda cenderung:",
        options: {
            A: "Mencari interaksi sosial untuk mengurangi stres",
            B: "Menarik diri untuk menenangkan pikiran"
        },
        dimension: "EI"
    },
    {
        question: "Dalam mengevaluasi ide, Anda lebih memperhatikan:",
        options: {
            A: "Kegunaan praktis dan implementasi",
            B: "Potensi inovasi dan kreativitas"
        },
        dimension: "SN"
    }
];

// Number of questions that will be used in the test
const QUESTIONS_PER_TEST = 20;

let selectedQuestions = [];
let currentQuestion = 0;
let answers = {
    'E': 0, 'I': 0,
    'S': 0, 'N': 0,
    'T': 0, 'F': 0,
    'J': 0, 'P': 0
};

// DOM elements
const introSection = document.getElementById('intro');
const testSection = document.getElementById('test');
const resultSection = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const retakeBtn = document.getElementById('retakeBtn');
const questionText = document.getElementById('question');
const optionAText = document.getElementById('optionA');
const optionBText = document.getElementById('optionB');
const optionALabel = document.getElementById('optionALabel');
const optionBLabel = document.getElementById('optionBLabel');
const progressBar = document.getElementById('progress');
const questionNumber = document.getElementById('questionNumber');

// Event listeners
startBtn.addEventListener('click', startTest);
nextBtn.addEventListener('click', nextQuestion);
retakeBtn.addEventListener('click', retakeTest);

// Functions
function randomizeQuestions() {
    // We want an even distribution of question types (EI, SN, TF, JP)
    const questionsByDimension = {
        'EI': [],
        'SN': [],
        'TF': [],
        'JP': []
    };
    
    // Sort questions by dimension
    questions.forEach(q => {
        questionsByDimension[q.dimension].push(q);
    });
    
    // Shuffle each dimension's questions
    for (const dimension in questionsByDimension) {
        shuffleArray(questionsByDimension[dimension]);
    }
    
    // Take equal number of questions from each dimension
    const questionsPerDimension = QUESTIONS_PER_TEST / 4;
    selectedQuestions = [];
    
    for (const dimension in questionsByDimension) {
        selectedQuestions = selectedQuestions.concat(
            questionsByDimension[dimension].slice(0, questionsPerDimension)
        );
    }
    
    // Shuffle the final selection to mix up the dimensions
    shuffleArray(selectedQuestions);
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTest() {
    // Reset values
    currentQuestion = 0;
    answers = {
        'E': 0, 'I': 0,
        'S': 0, 'N': 0,
        'T': 0, 'F': 0,
        'J': 0, 'P': 0
    };
    
    // Select and randomize questions
    randomizeQuestions();
    
    // Update progress bar max value
    progressBar.max = QUESTIONS_PER_TEST;
    
    // Show test section
    introSection.classList.add('hidden');
    testSection.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < selectedQuestions.length) {
        const q = selectedQuestions[currentQuestion];
        questionText.textContent = q.question;
        optionAText.textContent = q.options.A;
        optionBText.textContent = q.options.B;
        
        // Reset radio buttons and styling
        document.querySelectorAll('input[name="answer"]').forEach(radio => {
            radio.checked = false;
        });
        optionALabel.classList.remove('selected');
        optionBLabel.classList.remove('selected');
        
        // Update progress
        progressBar.value = currentQuestion;
        questionNumber.textContent = currentQuestion + 1;
        
        // Disable next button until an option is selected
        nextBtn.disabled = true;
        
        // Add listeners for option selection
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', function() {
                // Find the radio button inside this label
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Remove selected class from all options
                document.querySelectorAll('.answer-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to this option
                this.classList.add('selected');
                
                // Enable next button
                nextBtn.disabled = false;
            });
        });
    } else {
        showResults();
    }
}

function nextQuestion() {
    // Get selected answer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        return; // No option selected
    }
    
    // Record answer
    const dimension = selectedQuestions[currentQuestion].dimension;
    if (selectedOption.value === 'A') {
        answers[dimension.charAt(0)]++;
    } else {
        answers[dimension.charAt(1)]++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < selectedQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    testSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    // Calculate MBTI type
    const type = [
        answers.E > answers.I ? 'E' : 'I',
        answers.S > answers.N ? 'S' : 'N',
        answers.T > answers.F ? 'T' : 'F',
        answers.J > answers.P ? 'J' : 'P'
    ].join('');
    
    // Update result elements
    document.getElementById('mbtiResult').textContent = type;
    document.getElementById('eScore').textContent = answers.E;
    document.getElementById('iScore').textContent = answers.I;
    document.getElementById('sScore').textContent = answers.S;
    document.getElementById('nScore').textContent = answers.N;
    document.getElementById('tScore').textContent = answers.T;
    document.getElementById('fScore').textContent = answers.F;
    document.getElementById('jScore').textContent = answers.J;
    document.getElementById('pScore').textContent = answers.P;
    
    // Set personality description
    document.getElementById('personalityTitle').textContent = personalityTypes[type].title;
    document.getElementById('personalityDescription').textContent = personalityTypes[type].description;
}

function retakeTest() {
    // Reset and go back to intro
    resultSection.classList.add('hidden');
    introSection.classList.remove('hidden');
}

// Add listeners for radio buttons to update styling
document.querySelectorAll('input[name="answer"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'A') {
            optionALabel.classList.add('selected');
            optionBLabel.classList.remove('selected');
        } else {
            optionBLabel.classList.add('selected');
            optionALabel.classList.remove('selected');
        }
        nextBtn.disabled = false;
    });
});