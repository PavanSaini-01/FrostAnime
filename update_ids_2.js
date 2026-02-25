const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public', 'data');
const filesToUpdate = ['echianime.json', 'frozenInTime.json'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${fileName}, file not found.`);
        return;
    }

    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Handle nested arrays for echi and frozen based on their TS structure
    // They are returned as categories! [{ category: "...", items: [...] }]
    data = data.map(categoryObject => {
        const updatedItems = categoryObject.items.map(anime => {
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
        return { ...categoryObject, items: updatedItems };
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${fileName} with real AniList IDs.`);
});
