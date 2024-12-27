const fs = require('fs');
const path = require('path');

// 获取所有XML文件路径
function getAllXmlPaths() {
    const results = [];
    const dirs = fs.readdirSync(__dirname);
    
    dirs.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        // 检查是否是目录且不是node_modules
        if (fs.statSync(dirPath).isDirectory() && dir !== 'node_modules') {
            const files = fs.readdirSync(dirPath);
            files.forEach(file => {
                if (path.extname(file) === '.xml') {
                    results.push(`${dir}/${file}`);
                }
            });
        }
    });
    
    return results;
}

// 主函数
function writeXmlPathsToFile() {
    try {
        const xmlPaths = getAllXmlPaths();
        fs.appendFileSync('123.txt', xmlPaths.join('\n'), 'utf-8');
        console.log('文件路径已成功写入 123.txt');
        console.log(`共找到 ${xmlPaths.length} 个XML文件`);
    } catch (error) {
        console.error('写入文件时发生错误:', error.message);
    }
}

// 执行主函数
writeXmlPathsToFile(); 