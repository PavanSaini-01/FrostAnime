const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public', 'data');
const filesToUpdate = ['homepage.json', 'action.json', 'echi.json', 'frozen.json', 'romance.json'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) return;

    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    data = data.map(anime => {
        let trueId = anime.id;
        if (anime.imagePath) {
            const matchBX = anime.imagePath.match(/\/bx(\d+)-/);
            const matchB = anime.imagePath.match(/\/b(\d+)-/);

            if (matchBX) {
                trueId = parseInt(matchBX[1]);
            } else if (matchB) {
                trueId = parseInt(matchB[1]);
            }
        }

        return { ...anime, id: trueId };
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${fileName} with real AniList IDs.`);
});
