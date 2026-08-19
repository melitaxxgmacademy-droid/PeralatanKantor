const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Peralatan Kantor/iLanding-pro');
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace links
    content = content.replace(/href="tentang-kami\/index\.html"/g, 'href="tentang-kami.html"');
    content = content.replace(/href="paket\/index\.html"/g, 'href="paket.html"');
    content = content.replace(/href="blog\/index\.html"/g, 'href="blog.html"');
    content = content.replace(/href="kontak\/index\.html"/g, 'href="kontak.html"');
    
    // Sub-items of produk
    content = content.replace(/href="produk\/alat-tulis-kantor\/index\.html"/g, 'href="produk-alat-tulis-kantor.html"');
    content = content.replace(/href="produk\/kursi-kantor\/index\.html"/g, 'href="produk-kursi-kantor.html"');
    content = content.replace(/href="produk\/meja-kantor\/index\.html"/g, 'href="produk-meja-kantor.html"');
    content = content.replace(/href="produk\/lemari-arsip\/index\.html"/g, 'href="produk-lemari-arsip.html"');
    content = content.replace(/href="produk\/videotron\/index\.html"/g, 'href="produk-videotron.html"');
    content = content.replace(/href="produk\/perlengkapan-kantor\/index\.html"/g, 'href="produk-perlengkapan-kantor.html"');

    // Also replace links that have ../
    content = content.replace(/href="\.\.\/tentang-kami\/index\.html"/g, 'href="tentang-kami.html"');
    content = content.replace(/href="\.\.\/paket\/index\.html"/g, 'href="paket.html"');
    content = content.replace(/href="\.\.\/blog\/index\.html"/g, 'href="blog.html"');
    content = content.replace(/href="\.\.\/kontak\/index\.html"/g, 'href="kontak.html"');

    // And Blog post links
    // "blog/panduan-memilih-vendor-atk/index.html" -> "blog/panduan-memilih-vendor-atk.html"
    content = content.replace(/href="blog\/panduan-memilih-vendor-atk\/index\.html"/g, 'href="blog/panduan-memilih-vendor-atk.html"');
    content = content.replace(/href="blog\/videotron-indoor-vs-outdoor\/index\.html"/g, 'href="blog/videotron-indoor-vs-outdoor.html"');
    
    // Also "blog-panduan-memilih-vendor-atk.html" in root is a duplicate, we should link to blog/panduan...
    
    fs.writeFileSync(f, content, 'utf8');
});
console.log('Links updated');
