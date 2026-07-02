import fs from 'fs';
import path from 'path';

const searchDir = process.cwd();
const query = 'ยังไม่มีข้อมูลการเชื่อมต่อโรงเรียน';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    // ข้ามโฟลเดอร์ที่ไม่เกี่ยวข้อง
    if (file === 'node_modules' || file === '.git' || file === 'dist-installer' || file === 'dist' || file === 'build') {
      return;
    }
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.md') || file.endsWith('.json'))) {
      results.push(fullPath);
    }
  });
  return results;
}

try {
  const files = walk(searchDir);
  console.log(`🔍 กำลังค้นหาคำว่า "${query}" ในไฟล์ทั้งหมด ${files.length} ไฟล์...`);
  
  let foundCount = 0;
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes(query)) {
      console.log(`✅ พบในไฟล์: ${path.relative(process.cwd(), file)}`);
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes(query)) {
          console.log(`   [บรรทัด ${idx + 1}]: ${line.trim()}`);
        }
      });
      foundCount++;
    }
  });
  
  if (foundCount === 0) {
    console.log('❌ ไม่พบคำดังกล่าวในโปรเจกต์นี้');
  }
} catch (err) {
  console.error('เกิดข้อผิดพลาด:', err);
}
