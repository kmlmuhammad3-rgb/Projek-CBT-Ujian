// Durasi Ujian dalam menit
const DURASI_UJIAN_MENIT = 15;

// Bank Soal Pilihan Ganda (10 Soal)
const bankSoal = [
  {
    id: 1,
    pertanyaan: "Apa kepanjangan dari CBT dalam sistem ujian modern?",
    pilihan: ["Computer Based Test", "Computer Basic Technology", "Central Based Test", "Computer Binary Task"],
    kunci: 0
  },
  {
    id: 2,
    pertanyaan: "Bahasa pemrograman mana yang berfungsi untuk memberikan logika dan interaktivitas pada web?",
    pilihan: ["HTML", "CSS", "JavaScript", "SQL"],
    kunci: 2
  },
  {
    id: 3,
    pertanyaan: "Fitur di VS Code yang digunakan untuk running preview web secara real-time adalah...",
    pilihan: ["Git Bash", "Live Server", "Prettier", "Auto Rename Tag"],
    kunci: 1
  },
  {
    id: 4,
    pertanyaan: "Tag HTML yang digunakan untuk menghubungkan file CSS eksternal adalah...",
    pilihan: ["<script>", "<style>", "<link>", "<css>"],
    kunci: 2
  },
  {
    id: 5,
    pertanyaan: "Format penyimpanan data terstruktur yang sering digunakan di JavaScript adalah...",
    pilihan: ["JSON", "TXT", "DOCX", "PDF"],
    kunci: 0
  },
  {
    id: 6,
    pertanyaan: "Properti CSS yang digunakan untuk mengubah warna latar belakang sebuah elemen adalah...",
    pilihan: ["color", "background-color", "font-style", "border-color"],
    kunci: 1
  },
  {
    id: 7,
    pertanyaan: "Atribut HTML yang digunakan untuk memberikan teks petunjuk singkat di dalam kolom input adalah...",
    pilihan: ["placeholder", "value", "title", "name"],
    kunci: 0
  },
  {
    id: 8,
    pertanyaan: "Fitur pada browser yang digunakan untuk menyimpan data jawaban secara lokal dinamakan...",
    pilihan: ["SessionData", "LocalStorage", "CookieStorage", "CacheData"],
    kunci: 1
  },
  {
    id: 9,
    pertanyaan: "Di bawah ini yang merupakan simbol untuk membuat komentar di dalam file JavaScript adalah...",
    pilihan: ["<!-- comment -->", "/* comment */", "// comment", "# comment"],
    kunci: 2
  },
  {
    id: 10,
    pertanyaan: "Metode JavaScript yang digunakan untuk mengubah objek JS menjadi string JSON adalah...",
    pilihan: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toString()"],
    kunci: 1
  }
];