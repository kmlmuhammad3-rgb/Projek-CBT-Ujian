// Global State
let soalSaatIni = 0;
let jawabanSiswa = {};
let sisaWaktuDetik = (typeof DURASI_UJIAN_MENIT !== 'undefined' ? DURASI_UJIAN_MENIT : 15) * 60;
let timerInterval = null;

// Deteksi Halaman
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("index.html") || path.endsWith("/") || path === "") {
    initHalamanLogin();
  } else if (path.endsWith("ujian.html")) {
    initHalamanUjian();
  }
});

/* 1. HALAMAN LOGIN */
function initHalamanLogin() {
  const formLogin = document.getElementById("formLogin");
  if (!formLogin) return;

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const kelas = document.getElementById("kelas").value.trim();

    if (nama && email && kelas) {
      localStorage.setItem("cbt_nama", nama);
      localStorage.setItem("cbt_email", email);
      localStorage.setItem("cbt_kelas", kelas);
      
      localStorage.removeItem("cbt_jawaban");
      localStorage.removeItem("cbt_sisa_waktu");

      window.location.href = "ujian.html";
    }
  });
}

/* 2. HALAMAN UJIAN */
function initHalamanUjian() {
  const nama = localStorage.getItem("cbt_nama");
  const email = localStorage.getItem("cbt_email");
  const kelas = localStorage.getItem("cbt_kelas");

  if (!nama || !kelas) {
    alert("Silakan isi data diri terlebih dahulu!");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("displayNama").textContent = `Siswa: ${nama} (${email})`;
  document.getElementById("displayKelas").textContent = `Kelas: ${kelas}`;

  const savedJawaban = localStorage.getItem("cbt_jawaban");
  if (savedJawaban) {
    jawabanSiswa = JSON.parse(savedJawaban);
  }

  const savedTime = localStorage.getItem("cbt_sisa_waktu");
  if (savedTime) {
    sisaWaktuDetik = parseInt(savedTime, 10);
  }

  document.getElementById("btnPrev").addEventListener("click", () => gantiSoal(-1));
  document.getElementById("btnNext").addEventListener("click", () => gantiSoal(1));
  document.getElementById("btnFinish").addEventListener("click", hitungDanSelesaikanUjian);

  renderGridNomor();
  tampilkanSoal(soalSaatIni);
  mulaiTimer();
}

function tampilkanSoal(index) {
  soalSaatIni = index;
  const data = bankSoal[index];

  document.getElementById("nomorSoal").textContent = `Soal No. ${index + 1} dari ${bankSoal.length}`;
  document.getElementById("teksSoal").textContent = data.pertanyaan;

  const containerOpsi = document.getElementById("opsiJawaban");
  containerOpsi.innerHTML = "";

  const abjad = ["A", "B", "C", "D"];

  data.pilihan.forEach((pilihanTeks, idxPilihan) => {
    const isChecked = jawabanSiswa[index] === idxPilihan ? "checked" : "";
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="jawaban" value="${idxPilihan}" ${isChecked} onchange="simpanJawaban(${index}, ${idxPilihan})">
      <strong>${abjad[idxPilihan]}.</strong> &nbsp; ${pilihanTeks}
    `;
    containerOpsi.appendChild(label);
  });

  document.getElementById("btnPrev").disabled = index === 0;
  if (index === bankSoal.length - 1) {
    document.getElementById("btnNext").style.display = "none";
  } else {
    document.getElementById("btnNext").style.display = "inline-block";
  }

  updateGridHighlight();
}

function simpanJawaban(indexSoal, indexJawaban) {
  jawabanSiswa[indexSoal] = indexJawaban;
  localStorage.setItem("cbt_jawaban", JSON.stringify(jawabanSiswa));
  updateGridHighlight();
}

function gantiSoal(arah) {
  const targetIndex = soalSaatIni + arah;
  if (targetIndex >= 0 && targetIndex < bankSoal.length) {
    tampilkanSoal(targetIndex);
  }
}

function renderGridNomor() {
  const gridContainer = document.getElementById("gridNomor");
  gridContainer.innerHTML = "";

  bankSoal.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.className = "num-btn";
    btn.textContent = idx + 1;
    btn.id = `num-btn-${idx}`;
    btn.onclick = () => tampilkanSoal(idx);
    gridContainer.appendChild(btn);
  });
}

function updateGridHighlight() {
  bankSoal.forEach((_, idx) => {
    const btn = document.getElementById(`num-btn-${idx}`);
    if (!btn) return;

    btn.classList.remove("active", "answered");

    if (jawabanSiswa[idx] !== undefined) {
      btn.classList.add("answered");
    }
    if (idx === soalSaatIni) {
      btn.classList.add("active");
    }
  });
}

function mulaiTimer() {
  const elementTimer = document.getElementById("timer");

  timerInterval = setInterval(() => {
    sisaWaktuDetik--;
    localStorage.setItem("cbt_sisa_waktu", sisaWaktuDetik);

    let jam = Math.floor(sisaWaktuDetik / 3600);
    let menit = Math.floor((sisaWaktuDetik % 3600) / 60);
    let detik = sisaWaktuDetik % 60;

    elementTimer.textContent = `${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')}:${String(detik).padStart(2, '0')}`;

    if (sisaWaktuDetik <= 0) {
      clearInterval(timerInterval);
      alert("Waktu ujian telah habis!");
      hitungDanSelesaikanUjian();
    }
  }, 1000);
}

/* 3. HASIL DAN DETAIL PEMBAHASAN */
function hitungDanSelesaikanUjian() {
  if (sisaWaktuDetik > 0) {
    const konfirmasi = confirm("Apakah Anda yakin ingin menyelesaikan ujian?");
    if (!konfirmasi) return;
  }

  clearInterval(timerInterval);

  let benar = 0;
  let salah = 0;
  let tidakDijawab = 0;
  const abjad = ["A", "B", "C", "D"];

  // Rekapitulasi Rincian Per Soal
  let detailHtml = `<h3 style="margin-top: 25px; margin-bottom: 15px; border-top: 2px solid #eee; padding-top: 15px;">Evaluasi & Pembahasan Jawaban:</h3>`;

  bankSoal.forEach((soal, idx) => {
    const jawabanUser = jawabanSiswa[idx];
    let statusText = "";
    let statusColor = "";

    if (jawabanUser === undefined) {
      tidakDijawab++;
      statusText = "Kosong (Tidak Dijawab)";
      statusColor = "#6c757d";
    } else if (jawabanUser === soal.kunci) {
      benar++;
      statusText = `BENAR (Jawaban Anda: ${abjad[jawabanUser]})`;
      statusColor = "#28a745";
    } else {
      salah++;
      statusText = `SALAH (Jawaban Anda: ${abjad[jawabanUser]} | Kunci: ${abjad[soal.kunci]})`;
      statusColor = "#dc3545";
    }

    detailHtml += `
      <div style="text-align: left; background: #fff; border: 1px solid #e2e8f0; border-left: 5px solid ${statusColor}; padding: 12px; margin-bottom: 10px; border-radius: 4px;">
        <strong>No. ${idx + 1}: ${soal.pertanyaan}</strong><br>
        <span style="color: ${statusColor}; font-weight: bold; font-size: 14px;">Status: ${statusText}</span>
      </div>
    `;
  });

  const totalSoal = bankSoal.length;
  const nilaiAkhir = Math.round((benar / totalSoal) * 100);
  const nama = localStorage.getItem("cbt_nama");
  const email = localStorage.getItem("cbt_email");
  const kelas = localStorage.getItem("cbt_kelas");

  // Render Hasil ke Halaman Ujian
  const questionArea = document.querySelector(".question-area");
  questionArea.innerHTML = `
    <div style="text-align: center; padding: 10px;">
      <h2 style="color: #28a745; margin-bottom: 10px;">Ujian Selesai!</h2>
      
      <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; max-width: 500px; margin: 0 auto 15px auto; text-align: left;">
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Kelas:</strong> ${kelas}</p>
        <hr style="margin: 8px 0;">
        <p style="color: #28a745;"><strong>Jawaban Benar:</strong> ${benar}</p>
        <p style="color: #dc3545;"><strong>Jawaban Salah:</strong> ${salah}</p>
        <p style="color: #6c757d;"><strong>Tidak Dijawab:</strong> ${tidakDijawab}</p>
        <hr style="margin: 8px 0;">
        <h3 style="font-size: 22px; color: #007bff; text-align: center;">Nilai Akhir: ${nilaiAkhir} / 100</h3>
      </div>

      <button class="btn btn-primary" onclick="kembaliKeLogin()" style="margin-bottom: 15px;">Selesai & Keluar</button>

      ${detailHtml}
    </div>
  `;

  document.querySelector(".sidebar").style.display = "none";
  document.querySelector(".timer-box").style.display = "none";

  localStorage.removeItem("cbt_jawaban");
  localStorage.removeItem("cbt_sisa_waktu");
}

function kembaliKeLogin() {
  localStorage.clear();
  window.location.href = "index.html";
}