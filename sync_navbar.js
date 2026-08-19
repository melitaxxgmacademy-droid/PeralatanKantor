const fs = require('fs');
const path = require('path');

// The standard navbar from index.html (base template, active class will be adjusted per page)
const standardNavLinks = `
        <ul>
          <li><a href="index.html">Beranda</a></li>
          <li><a href="tentang-kami.html">Tentang Kami</a></li>
          <li class="dropdown">
            <a href="#"><span>Produk</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
              <li><a href="produk-alat-tulis-kantor.html">Alat Tulis Kantor</a></li>
              <li><a href="produk-kursi-kantor.html">Kursi Kantor</a></li>
              <li><a href="produk-meja-kantor.html">Meja Kantor</a></li>
              <li><a href="produk-lemari-arsip.html">Lemari Arsip</a></li>
              <li><a href="produk-videotron.html">Videotron</a></li>
              <li><a href="produk-perlengkapan-kantor.html">Perlengkapan Kantor Lainnya</a></li>
            </ul>
          </li>
          <li><a href="paket.html">Paket</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="kontak.html">Kontak</a></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>`;

const standardHeader = `<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center me-auto me-xl-0">
        <img src="assets/img/logo-peralatan-kantor.webp?v=3" alt="Logo Parenza" class="logo-img"><span class="sitename">Parenza</span>
      </a>

      <nav id="navmenu" class="navmenu">
        ${standardNavLinks.trim()}
      </nav>

    </div>
  </header>`;

// Active page mapping: filename -> which link gets "active"
const activeMap = {
  'index.html': 'index.html',
  'tentang-kami.html': 'tentang-kami.html',
  'produk-alat-tulis-kantor.html': 'produk-alat-tulis-kantor.html',
  'produk-kursi-kantor.html': 'produk-kursi-kantor.html',
  'produk-meja-kantor.html': 'produk-meja-kantor.html',
  'produk-lemari-arsip.html': 'produk-lemari-arsip.html',
  'produk-videotron.html': 'produk-videotron.html',
  'produk-perlengkapan-kantor.html': 'produk-perlengkapan-kantor.html',
  'paket.html': 'paket.html',
  'paket-detail.html': 'paket.html',
  'blog.html': 'blog.html',
  'blog-panduan-memilih-vendor-atk.html': 'blog.html',
  'blog-videotron-indoor-vs-outdoor.html': 'blog.html',
  'kontak.html': 'kontak.html',
  'produk-detail.html': null,
};

const baseDir = 'c:/Peralatan Kantor/iLanding-pro';

// Get all HTML files in root
const rootFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));

rootFiles.forEach(filename => {
  const filepath = path.join(baseDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');

  // Find and replace the header block
  // headerRegex not needed, using replace directly
  
  // Build the header with active class for this page
  let activeHref = activeMap[filename] || null;
  
  let header = standardHeader;
  if (activeHref) {
    header = header.replace(`href="${activeHref}"`, `href="${activeHref}" class="active"`);
  }

  const newContent = content.replace(/<header[\s\S]*?<\/header>/, header);
  
  if (newContent !== content) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log(`Updated: ${filename}`);
  } else {
    console.log(`Skipped (no header found or no change): ${filename}`);
  }
});

console.log('Done!');
