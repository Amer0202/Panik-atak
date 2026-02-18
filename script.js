// --- Mevcut DOM elementleri ---
const daire = document.getElementById("daire");
const yazi = document.getElementById("yazi");
const btnBaslat = document.getElementById("btnBaslat");
const btnBitir = document.getElementById("btnBitir");
const nefesModu = document.getElementById("nefesModu");
const tabloModu = document.getElementById("tabloModu");
const tbodyBelirtiler = document.getElementById("tbodyBelirtiler");
const toplamSatir = document.getElementById("toplamSatir");

// --- Nefes mesajları ---
const mesajlar = {
  al: [
    "Burnundan al… vücudun seni koruyor.",
    "Yavaşça nefes al… güvendesin.",
    "Hava içeri giriyor, bedenin rahatlıyor.",
    "Nefes al… enerji doluyor.",
    "Derin nefes… zihnin sakinleşiyor.",
    "İçeri çek, her şey yolunda.",
    "Dikkatini nefesine ver, güven içindesin.",
    "Bedenin uyarıyor, sen kontrolündesin.",
    "Nefes al… her şey geçici.",
    "İçeri çek, panik küçülüyor.",
    "Her nefes seni güçlendiriyor.",
    "Vücudun ritmini buluyor, sen de sakinleşiyorsun.",
    "Derin nefes… bedenin uyanıyor.",
    "Kontrol sende, panik dalgası geçiyor.",
    "Hava doluyor, stres azalıyor."
  ],
  tut: [
    "Her şey yolunda.",
    "Bu his geçici.",
    "Kontrol sende, beden dengede.",
    "Nefesini tut… sabırlı ol.",
    "Dur, hisset ve sakinleş.",
    "Bedenin rahat, zihin huzurlu.",
    "Bir an dur… hislerini izle.",
    "Panik geçiyor, sen güçlüsün.",
    "Sakin ol… nefesini hisset.",
    "Dikkatini topla, beden dengede.",
    "Zihnini gözlemle, her şey normal.",
    "Durakla… kontrol sende.",
    "Sabırlı ol… dalgalar geçici.",
    "Bedenin sana güven veriyor.",
    "Hisset ve kabul et, panik azalıyor."
  ],
  ver: [
    "Ağzından ver… yük azalıyor.",
    "Nefesi bırak… kalbin sakinleşiyor.",
    "Bırak gitsin… dalga sönüyor.",
    "Nefes ver… gevşe ve rahatla.",
    "Dışarı bırak, huzuru hisset.",
    "Bırak gitsin… tüm stres uzaklaşıyor.",
    "Panik dağılıyor, sen güçlüsün.",
    "Stres akıyor, beden hafifliyor.",
    "Rahatla… her nefesle sakinleş.",
    "Yavaşça ver… kontrol sende.",
    "Her nefesle huzur artıyor.",
    "Bırak, bırak… kaygı azalıyor.",
    "Stres uzaklaşıyor, sen güven içindesin.",
    "Nefesini bırak, panik küçülüyor.",
    "Huzur dol… her nefesle gevşe."
  ]
};

// --- Nefes döngüsü ---
let onceki = { al: "", tut: "", ver: "" };
let dongu, aktif = false;

function rastgeleUnique(tur) {
  let secim;
  do {
    secim = mesajlar[tur][Math.floor(Math.random() * mesajlar[tur].length)];
  } while(secim === onceki[tur] && mesajlar[tur].length > 1);
  onceki[tur] = secim;
  return secim;
}

function mesajDegistir(yeniMesaj) {
  yazi.style.opacity = 0;
  setTimeout(() => {
    yazi.innerText = yeniMesaj;
    yazi.style.opacity = 1;
  }, 1000);
}

function Baslat() {
  if(aktif) return;
  aktif = true;
  btnBaslat.classList.add("aktif");
  btnBitir.classList.remove("aktif");
  nefesDongusu();
  dongu = setInterval(nefesDongusu, 16000);
}

function nefesDongusu() {
  mesajDegistir(rastgeleUnique("al"));
  daire.classList.remove("kucul");
  daire.classList.add("buyu");
  daire.innerText = "Burnundan nefes al";
  setTimeout(() => {
    mesajDegistir(rastgeleUnique("tut"));
    daire.innerText = "Nefesini tut";
  }, 4000);
  setTimeout(() => {
    mesajDegistir(rastgeleUnique("ver"));
    daire.classList.remove("buyu");
    daire.classList.add("kucul");
    daire.innerText = "Ağzından yavaşça ver";
  }, 8000);
}

function Bitir() {
  clearInterval(dongu);
  aktif = false;
  daire.classList.remove("buyu", "kucul");
  mesajDegistir("Geçti. Bunu başardın.");
  const mesajlarDaire = [
    "Sakinledik…",
    "Her zamanki gibi geçti…",
    "Zararsız bir şekilde geçti…"
  ];
  const secim = mesajlarDaire[Math.floor(Math.random() * mesajlarDaire.length)];
  daire.innerText = secim;
  btnBaslat.classList.remove("aktif");
  btnBitir.classList.add("aktif");
}

// --- Kaygı Takibi Tablosu ---
const belirtiler = [
  "Kalbin teklemesi, hızlanması veya çarpıntı",
  "Terleme, ürperme veya kızarma",
  "Titreşim veya sarsılma",
  "Nefes daralması, nefes almakta zorlanma",
  "Boğulacakmış gibi hissetme",
  "Göğüste ağrı veya daralma",
  "Karnında kelebekler, mide bulantısı veya huzursuz mide",
  "Baş dönmesi, sersemlik hali, denge yitimi",
  "Kendini veya dünyayı gerçek değilmiş gibi hissetmek",
  "Uyuşma ve karıncalanma"
];

const gunler = ["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];
let puanlar = JSON.parse(localStorage.getItem("puanlar"));

if (!puanlar) {
  puanlar = Array(10).fill(null).map(() => Array(7).fill(0));
}

function tabloOlustur() {
  tbodyBelirtiler.innerHTML = "";
  belirtiler.forEach((belirti,row)=>{
    const tr = document.createElement("tr");
    const tdBelirti = document.createElement("td");
    tdBelirti.innerText = belirti;
    tr.appendChild(tdBelirti);
    gunler.forEach((gun,col)=>{
      const td = document.createElement("td");
      td.classList.add("puan");
      td.innerText = puanlar[row][col];
      td.addEventListener("click", puanTıkla);
      tr.appendChild(td);
    });
    tbodyBelirtiler.appendChild(tr);
  });

  toplamSatir.innerHTML = "<td>Toplam</td>";
  gunler.forEach((gun,col)=>{
    const td = document.createElement("td");
    td.innerText = puanlar.reduce((sum,row)=>sum+row[col],0);
     td.innerHTML += ' <span style="font-size:0.6em;">💡</span>';
    toplamSatir.appendChild(td);
  });
}

function puanTıkla(e) {
  const td = e.target;
  if(td.classList.contains("kilitli")) return;

  const row = td.parentElement.rowIndex - 1;
  const col = td.cellIndex - 1;

  let puan = parseInt(td.innerText);
  puan = (puan + 1) % 5;

  td.innerText = puan;
  puanlar[row][col] = puan;

  localStorage.setItem("puanlar", JSON.stringify(puanlar));

  toplamHesapla();
}
function toplamHesapla() {
  gunler.forEach((gun, i) => {
    let toplam = 0;
    tbodyBelirtiler.querySelectorAll("tr").forEach(tr => {
      toplam += parseInt(tr.children[i + 1].innerText);
    });

    const tdToplam = toplamSatir.children[i + 1];
    tdToplam.innerText = toplam;

    // Temel stil
    tdToplam.style.background = "";
    tdToplam.style.color = "#e5e7eb";

    // Renkli uyarılar
    if (toplam >= 0 && toplam <= 2) {
      tdToplam.style.background = "#22c55e";
      tdToplam.style.color = "#022c22";
    } else if (toplam >= 3 && toplam <= 6) {
      tdToplam.style.background = "#a3e635";
      tdToplam.style.color = "#022c22";
    } else if (toplam >= 7 && toplam <= 10) {
      tdToplam.style.background = "#facc15";
      tdToplam.style.color = "#022c22";
    } else if (toplam >= 11 && toplam <= 20) {
      tdToplam.style.background = "#f97316";
      tdToplam.style.color = "#fff";
    } else if (toplam >= 21 && toplam <= 30) {
      tdToplam.style.background = "#ef4444";
      tdToplam.style.color = "#fff";
    } else if (toplam >= 31) {
      tdToplam.style.background = "#b91c1c";
      tdToplam.style.color = "#fff";
    }
  });
}

// --- Modal aç ---
function acModal(mesaj) {
  const modal = document.getElementById("modal");
  const modalMesaj = document.getElementById("modalMesaj");
  modalMesaj.innerText = mesaj;
  modal.style.display = "flex";
}

// --- Modal kapatma ---
document.getElementById("modalClose").onclick = function() {
  document.getElementById("modal").style.display = "none";
}

// --- Global fonksiyonlar ---
// Ana sayfaya dön
window.geriAnaSayfa = function() {
  nefesModu.style.display = "block";
  tabloModu.style.display = "none";
};

// Tabloyu aç
window.acTablo = function() {
  nefesModu.style.display = "none";
  tabloModu.style.display = "block";
  tabloOlustur();

  // Toplam satır hücrelerine tıklama
  for (let i = 1; i < toplamSatir.children.length; i++) {
    toplamSatir.children[i].onclick = function() {
      const sutunIndex = i;
      let toplam = 0;
      tbodyBelirtiler.querySelectorAll("tr").forEach(tr => {
        toplam += parseInt(tr.children[sutunIndex].innerText);
      });
      let mesaj = "";
      if (toplam <= 2)
        mesaj = "Harika! Çok az kaygı belirtisi. Ev içinde kısa yürüyüş yapabilirsin, nefes egzersizine devam et.";
      else if (toplam <= 6)
        mesaj = "Birkaç kaygı belirtisi gözlemledin. Nefes egzersizine devam et ve sakin aktiviteler yap.";
      else if (toplam <= 10)
        mesaj = "Hafif düzeyde fiziksel kaygı var. Kısa indoor walking önerilir. Derin nefes ve farkındalık egzersizleri yap.";
      else if (toplam <= 20)
        mesaj = "Orta düzeyde kaygı. Bedenini dinle, nefes egzersizleri ve hafif ev içi egzersizler yap. Kaygı normal, panik geçici.";
      else if (toplam <= 30)
        mesaj = "Şiddetli fiziksel kaygı. Yavaşça otur, derin nefes al-ver yap. Ev içi hareketlerle rahatlamayı dene. Her şey geçici, kalbin sağlam çalışıyor.";
      else
        mesaj = "Aşırı kaygı! Hemen kendine zaman ayır, sakin bir ortamda dinlen. Nefes ve farkındalık egzersizleri yap. Tekrar güvenli olduğunu hatırla.";

      acModal(mesaj);
    };
  }
};