
import fs from 'fs';
import path from 'path';

export interface EchiAnime {
    id: string;
    title: string;
    vibe: string;
    plot: string;
    imagePath: string;
    platform: string;
}

export interface EchiCategory {
    category: string;
    items: EchiAnime[];
}

export async function getEchiAnime(): Promise<EchiCategory[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'echianime.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').map(line => line.trim());
    const categories: EchiCategory[] = [];
    let currentCategory: EchiCategory | null = null;
    let currentAnime: Partial<EchiAnime> | null = null;

    // Manual image mapping
    const coverImageMap: Record<string, string> = {
        'High School DxD': 'placeHolder.png',
        'To Love-Ru (Series)': 'placeHolder.png',
        'Prison School': 'placeHolder.png',
        'How Not to Summon a Demon Lord': 'placeHolder.png',
        'Trinity Seven': 'placeHolder.png',
        'The Testament of Sister New Devil': 'placeHolder.png',
        'Chivalry of a Failed Knight': 'placeHolder.png',
        'Strike the Blood': 'placeHolder.png',
        'Mushoku Tensei: Jobless Reincarnation': 'placeHolder.png',
        'No Game No Life': 'placeHolder.png',
        'Food Wars! (Shokugeki no Soma)': 'placeHolder.png',
        'Shimoneta': 'placeHolder.png',
        'Monster Musume': 'placeHolder.png',
        'Interspecies Reviewers': 'placeHolder.png',
        'Rosario + Vampire': 'placeHolder.png'
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // Detect Category
        if (line.includes('The Gold Standard') || line.includes('The OP Main Characters') || line.includes('God-Tier Animation') || line.includes('The Wildcards')) {
            if (currentAnime && currentCategory) {
                currentCategory.items.push(currentAnime as EchiAnime);
                currentAnime = null;
            }
            currentCategory = {
                category: line,
                items: []
            };
            categories.push(currentCategory);
            continue;
        }

        // Detect Title (If we have a category and it's not a field)
        if (currentCategory && !line.startsWith('The Vibe:') && !line.startsWith('The Plot:') && !line.startsWith('Bonus Content') && !line.startsWith('Platform:')) {
            if (currentAnime && currentAnime.title) {
                currentCategory.items.push(currentAnime as EchiAnime);
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
            } else if (line.startsWith('The Plot:')) {
                currentAnime.plot = line.replace('The Plot:', '').trim();
            } else if (line.startsWith('Platform:')) {
                currentAnime.platform = line.replace('Platform:', '').trim();
            }
        }
    }

    if (currentAnime && currentCategory && currentAnime.title) {
        currentCategory.items.push(currentAnime as EchiAnime);
    }

    return categories;
}
