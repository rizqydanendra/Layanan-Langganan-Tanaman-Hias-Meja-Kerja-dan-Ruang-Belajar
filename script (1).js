function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function hitungHargaAwal(hargaPaket, jumlah) {
  return hargaPaket * jumlah;
}

function hitungTotal() {
  var elPaket = document.getElementById("paket");
  var elJumlah = document.getElementById("jumlah");
  var elPromo = document.getElementById("promo");
  var hasil = document.getElementById("hasil");

  if (!elPaket || !elJumlah || !elPromo || !hasil) {
    alert("Elemen kalkulator belum lengkap di index.html.");
    return;
  }

  var hargaPaket = Number(elPaket.value);
  var jumlah = parseInt(elJumlah.value, 10);
  var kodePromo = elPromo.value.trim().toUpperCase();

  if (isNaN(jumlah) || jumlah < 1) {
    hasil.innerHTML = '<span class="error">Masukkan jumlah pot minimal 1.</span>';
    return;
  }

  var hargaAwal = hitungHargaAwal(hargaPaket, jumlah);
  var persenDiskon = 0;
  var keterangan = "Tidak ada diskon.";

  if (kodePromo === "POTMEJA") {
    persenDiskon = 15;
    keterangan = "Diskon 15% dari kode promo POTMEJA.";
  } else if (jumlah >= 3) {
    persenDiskon = 15;
    keterangan = "Diskon 15% karena memesan minimal 3 pot.";
  } else if (kodePromo !== "") {
    keterangan = "Kode promo tidak dikenali, tidak ada diskon.";
  }

  var potongan = hargaAwal * persenDiskon / 100;
  var totalBayar = hargaAwal - potongan;

  hasil.innerHTML =
    "<p>Harga awal: " + formatRupiah(hargaAwal) + "</p>" +
    "<p>Potongan diskon: " + formatRupiah(potongan) + "</p>" +
    '<p class="total">Total bayar: ' + formatRupiah(totalBayar) + "</p>" +
    "<p><small>" + keterangan + "</small></p>";
}

document.addEventListener("click", function (e) {
  if (e.target.closest("#btn-hitung")) {
    hitungTotal();
  }
});
