
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'data', 'noCringeOpMc.md');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const sections = fileContent.split(/\n(?=\d+\.\s)/).slice(1);

console.log('Sections count:', sections.length);

if (sections.length > 0) {
    const section = sections[0];
    const lines = section.trim().split('\n');
    const titleLine = lines[0];
    console.log('Title Line (JSON):', JSON.stringify(titleLine));

    const regex = /^(\d+)\.\s+(.*)$/;
    const match = titleLine.match(regex);
    console.log('Regex Match:', match);
}
