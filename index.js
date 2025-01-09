const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 生成随机字符串的函数
function generateRandomString(length = 8) {
    return crypto.randomBytes(length).toString('hex');
}

// 读取种子XML文件
function getSeedXmlContent() {
    try {
        return fs.readFileSync(path.join(__dirname, 'aaa.xml'), 'utf-8');
    } catch (error) {
        console.error('无法读取种子文件 aaa.xml:', error.message);
        return `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <timestamp>${new Date().toISOString()}</timestamp>
    <randomId>${generateRandomString()}</randomId>
</root>`;
    }
}

// 创建目录和文件
async function createDirectoriesAndFiles() {
    // 获取种子XML内容
    const seedXmlContent = getSeedXmlContent();
    
    // 创建9个目录
    for (let i = 0; i < 3; i++) {
        // 生成随机目录名
        const dirName = generateRandomString(9);
        const dirPath = path.join(__dirname, dirName);

        // 创建目录
        fs.mkdirSync(dirPath);
        console.log(`创建目录: ${dirName}`);

        // 生成随机XML文
        const xmlFileName = `${generateRandomString()}.xml`;
        const xmlFilePath = path.join(dirPath, xmlFileName);

        // 创建XML文件，使用种子文件内容
        fs.writeFileSync(xmlFilePath, seedXmlContent);
        console.log(`在 ${dirName} 中创建文件: ${xmlFileName}`);
    }
}

// 执行主函数
createDirectoriesAndFiles().catch(console.error);
