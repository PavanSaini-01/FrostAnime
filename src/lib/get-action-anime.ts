
import fs from 'fs';
import path from 'path';

export interface ActionAnime {
    id: number;
    title: string;
    description: string;
    blaze: string;
    imagePath: string;
    platform: string;
}

export async function getActionAnime(): Promise<ActionAnime[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'opMc.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').map(line => line.trim());
    const animeList: ActionAnime[] = [];
    let currentAnime: Partial<ActionAnime> | null = null;

    // Manual image mapping
    const coverImageMap: Record<string, string> = {
        'Solo Leveling': 'soloLeveling.jpg',
        'One Punch Man': 'onePunchMan.jpg',
        'The Misfit of Demon King Academy': 'placeHolder.png', // No image
        'Mob Psycho 100': 'mobPsycho100.jpg',
        'Jujutsu Kaisen (Focus on Gojo)': 'placeHolder.png', // No image, maybe add later
        'That Time I Got Reincarnated as a Slime': 'reincarnatedAsSlime.jpg',
        'Black Clover': 'placeHolder.png',
        'Hell’s Paradise': 'hellsParadise.jpg',
        'Overlord': 'overlord.jpg',
        'Bleach: Thousand-Year Blood War': 'placeHolder.png',
        'The Irregular at Magic High School': 'placeHolder.png'
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // Detect Title (Numbered list)
        const titleMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (titleMatch) {
            if (currentAnime && currentAnime.title) {
                animeList.push(currentAnime as ActionAnime);
            }
            const title = titleMatch[2];
            currentAnime = {
                id: parseInt(titleMatch[1]),
                title: title,
                imagePath: coverImageMap[title] ? `/animeCovers/${coverImageMap[title]}` : '/animeCovers/placeHolder.png',
                description: '',
                platform: ''
            };
            continue;
        }

        // Detect Bonus
        if (line.includes('❄️ The Bonus "Frost" Pick:')) {
            if (currentAnime && currentAnime.title) {
                animeList.push(currentAnime as ActionAnime);
            }
            const title = line.replace('❄️ The Bonus "Frost" Pick:', '').trim();
            currentAnime = {
                id: 99,
                title: title,
                imagePath: coverImageMap[title] ? `/animeCovers/${coverImageMap[title]}` : '/animeCovers/placeHolder.png',
                description: '',
                platform: ''
            };
            continue;
        }

        if (currentAnime) {
            if (line.startsWith('The "Blaze":')) {
                currentAnime.blaze = line.replace('The "Blaze":', '').trim();
            } else if (line.startsWith('Platform:')) {
                currentAnime.platform = line.replace('Platform:', '').trim();
            } else if (!line.startsWith('The "Blaze"') && !line.match(/^\d+\./) && !line.startsWith('Platform:')) {
                // Append to description if it's not a header
                currentAnime.description = (currentAnime.description || '') + line + ' ';
            }
        }
    }

    if (currentAnime && currentAnime.title) {
        animeList.push(currentAnime as ActionAnime);
    }

    return animeList;
}
