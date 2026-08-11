const fs = require('fs');
const path = require('path');

const files = [
    'works/icfgl/icfgl-2026/icfgl-2026.html',
    'vi/works/icfgl/icfgl-2026/icfgl-2026.html'
];

const replacements = [
    { search: /â€œ/g, replace: '“' },
    { search: /â€\x9D/g, replace: '”' }, // charCode 157 or 0x9D
    { search: /â€¢/g, replace: '•' },
    { search: /â€™/g, replace: '’' },
    { search: /â€“/g, replace: '–' },
    { search: /â€”/g, replace: '—' },
    { search: /â€˜/g, replace: '‘' }
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialLength = content.length;
        
        replacements.forEach(r => {
            content = content.replace(r.search, r.replace);
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
