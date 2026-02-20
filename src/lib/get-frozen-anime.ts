
import fs from 'fs';
import path from 'path';

export interface FrozenAnime {
    id: string;
    title: string;
    vibe: string;
    chill: string;
    imagePath: string;
    platform: string;
}

export interface FrozenCategory {
    category: string;
    description: string;
    items: FrozenAnime[];
}

export async function getFrozenAnime(): Promise<FrozenCategory[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'frozenInTime.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').map(line => line.trim());
    const categories: FrozenCategory[] = [];
    let currentCategory: FrozenCategory | null = null;
    let currentAnime: Partial<FrozenAnime> | null = null;

    // Manual image mapping
    const coverImageMap: Record<string, string> = {
        'Mushishi': 'placeHolder.png',
        'Kino’s Journey (2003 Adaptation)': 'placeHolder.png',
        'Haibane Renmei': 'placeHolder.png',
        'Natsume\'s Book of Friends (Natsume Yuujinchou)': 'placeHolder.png',
        'Mononoke': 'placeHolder.png',
        'Legend of the Galactic Heroes (OVA)': 'placeHolder.png',
        'Monster': 'placeHolder.png',
        'Gankutsuou: The Count of Monte Cristo': 'placeHolder.png',
        'Planetes': 'placeHolder.png',
        'Seirei no Moribito (Guardian of the Spirit)': 'placeHolder.png',
        'Wolf’s Rain': 'placeHolder.png',
        'Ergo Proxy': 'placeHolder.png',
        'Casshern Sins': 'placeHolder.png',
        'Serial Experiments Lain': 'placeHolder.png',
        'Texhnolyze': 'placeHolder.png',
        'Angel’s Egg (Tenshi no Tamago)': 'placeHolder.png',
        'Pale Cocoon': 'placeHolder.png',
        'Hellsing Ultimate': 'hellsingUltimate.jpg', // Checking against avail images
        'Dororo': 'dororo.jpg',
        'Vinland Saga': 'vinlandSaga.jpg',
        'Parasyte': 'parasyte.jpg',
        'Samurai Champloo': 'samuraiChamploo.jpg'
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // Detect Category
        if (line.startsWith('The "Quiet" Masterpieces') || line.startsWith('The "Elite" Narratives') || line.startsWith('The Atmospheric') || line.startsWith('Bonus:')) {
            if (currentAnime && currentCategory) {
                currentCategory.items.push(currentAnime as FrozenAnime);
                currentAnime = null;
            }

            const categoryName = line;
            let description = '';
            if (lines[i + 1] && !lines[i + 1].includes(':')) {
                description = lines[i + 1];
                i++;
            }

            currentCategory = {
                category: categoryName,
                description,
                items: []
            };
            categories.push(currentCategory);
            continue;
        }

        // Detect Title
        if (currentCategory && !line.startsWith('The Vibe:') && !line.startsWith('Why it fits:') && !line.startsWith('Why:') && !line.startsWith('Platform:')) {
            if (currentAnime && currentAnime.title) {
                currentCategory.items.push(currentAnime as FrozenAnime);
            }
            currentAnime = {
                id: line.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: line,
                imagePath: coverImageMap[line] ? `/animeCovers/${coverImageMap[line]}` : '/animeCovers/placeHolder.png',
                platform: ''
            };
        }

        if (currentAnime) {
            if (line.startsWith('The Vibe:')) {
                currentAnime.vibe = line.replace('The Vibe:', '').trim();
            } else if (line.startsWith('Why it fits:')) {
                currentAnime.chill = line.replace('Why it fits:', '').trim();
            } else if (line.startsWith('Why:')) {
                currentAnime.chill = line.replace('Why:', '').trim();
            } else if (line.startsWith('Platform:')) {
                currentAnime.platform = line.replace('Platform:', '').trim();
            }
        }
    }

    if (currentAnime && currentCategory && currentAnime.title) {
        currentCategory.items.push(currentAnime as FrozenAnime);
    }

    return categories;
}
