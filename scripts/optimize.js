const fs = require('fs-extra');
const path = require('path');

async function optimizeImages() {
  try {
    const distAssetsPath = 'dist/assets';
    
    if (await fs.pathExists(distAssetsPath)) {
      console.log('🖼️  Optimizing images...');
      
      // Пока пропускаем оптимизацию изображений из-за проблем с imagemin
      // В будущем можно добавить более простую оптимизацию
      console.log('✅ Images optimization skipped (will be added later)');
    }
  } catch (err) {
    console.error('❌ Error optimizing images:', err);
  }
}

async function optimizeHtml() {
  try {
    const indexPath = 'dist/index.html';
    
    if (await fs.pathExists(indexPath)) {
      let html = await fs.readFile(indexPath, 'utf8');
      
      // Удаляем комментарии и лишние пробелы
      html = html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
      
      await fs.writeFile(indexPath, html);
      console.log('✅ HTML optimized');
    }
  } catch (err) {
    console.error('❌ Error optimizing HTML:', err);
  }
}

async function optimize() {
  console.log('🚀 Starting optimization...');
  
  await optimizeImages();
  await optimizeHtml();
  
  console.log('✅ Optimization completed!');
}

optimize(); 