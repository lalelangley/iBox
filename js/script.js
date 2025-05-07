document.addEventListener('DOMContentLoaded', function () {
  // Scroll efek navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Inisialisasi carousel
  const carouselElement = document.getElementById('iphoneCarousel');
  const warnaList = ['Hitam', 'Hijau', 'Biru', 'Kuning', 'Pink'];
  let selectedColor = warnaList[0]; // Default warna

  if (carouselElement) {
    const bsCarousel = new bootstrap.Carousel(carouselElement, {
      interval: false,
      pause: true,
      ride: false,
      wrap: false
    });

    // Set data-warna dan event click pada indikator
    const dots = document.querySelectorAll('.carousel-indicators button');
    dots.forEach((dot, index) => {
      dot.setAttribute('data-warna', warnaList[index]);
      dot.addEventListener('click', () => {
        selectedColor = warnaList[index];
      });
    });

    // Update warna saat slide berubah
    carouselElement.addEventListener('slid.bs.carousel', function (e) {
      selectedColor = warnaList[e.to];
    });
  }

  // Validasi form
  const form = document.getElementById('preOrderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nama = document.getElementById('nama')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const hp = document.getElementById('hp')?.value.trim();

      let pesanError = '';

      if (!nama) pesanError += '• Nama belum diisi<br>';
      if (!email) pesanError += '• Email belum diisi<br>';
      if (!hp) pesanError += '• No HP belum diisi<br>';
      if (!selectedColor) pesanError += '• Warna belum dipilih<br>';

      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (email && !emailPattern.test(email)) {
        pesanError += '• Format email tidak valid<br>';
      }

      if (pesanError) {
        Swal.fire({
          title: 'Ada yang belum lengkap!',
          html: pesanError,
          icon: 'warning',
          confirmButtonText: 'Oke, isi dulu'
        });
        return;
      }

      Swal.fire({
        title: 'Pre-Order Berhasil!',
        html: `
          <strong>Nama:</strong> ${nama}<br>
          <strong>Email:</strong> ${email}<br>
          <strong>No HP:</strong> ${hp}<br>
          <strong>Warna:</strong> ${selectedColor}
        `,
        icon: 'success',
        confirmButtonText: 'Mantap!'
      });

      form.reset();
      selectedColor = warnaList[0];
      if (carouselElement) {
        bsCarousel.to(0); // Reset ke slide pertama
      }
    });
  }
});
