document.addEventListener('DOMContentLoaded', function () {
  // Scroll efek navbar
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Inisialisasi carousel
  const carouselElement = document.getElementById('iphoneCarousel');
  const bsCarousel = new bootstrap.Carousel(carouselElement, {
    interval: false,
    pause: true,
    ride: false,
    wrap: false
  });

  // Warna default (slide pertama)
  let selectedColor = "Hitam";

  // Tangkap semua dots dan ambil warna dari atribut data-warna
  const dots = document.querySelectorAll('.carousel-indicators button');
  dots.forEach((dot, index) => {
    const warnaList = ['Hitam', 'Hijau', 'Biru', 'Kuning', 'Pink'];
    dot.setAttribute('data-warna', warnaList[index]);
    dot.addEventListener('click', () => {
      selectedColor = dot.getAttribute('data-warna');
    });
  });

  // Validasi form
  const form = document.getElementById('preOrderForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const hp = document.getElementById('hp').value.trim();

    if (!nama || !email || !hp || !selectedColor) {
      alert('Harap isi semua field yang wajib.');
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      alert('Format email tidak valid.');
      return;
    }

    // SweetAlert2 Pop-up
    Swal.fire({
      title: 'Pre-Order Berhasil!',
      html: `
        <strong>Nama:</strong> ${nama}<br>
        <strong>Warna:</strong> ${selectedColor}
      `,
      icon: 'success',
      confirmButtonText: 'OK'
    });

    form.reset();
  });
});
