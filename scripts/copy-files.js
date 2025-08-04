const fs = require('fs-extra');
const path = require('path');

async function copyFiles() {
  try {
    // Создаем папку dist если её нет
    await fs.ensureDir('dist');
    
    // Копируем все файлы из src в dist
    await fs.copy('src', 'dist');
    
    // Копируем дополнительные файлы
    const filesToCopy = [
      'README.md',
      'sitemap.xml'
    ];
    
    for (const file of filesToCopy) {
      if (await fs.pathExists(file)) {
        await fs.copy(file, `dist/${file}`);
      }
    }
    
    console.log('✅ Files copied successfully to dist/');
  } catch (err) {
    console.error('❌ Error copying files:', err);
    process.exit(1);
  }
}

copyFiles(); 