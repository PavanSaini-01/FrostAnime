
import fs from 'fs';
import path from 'path';

export interface RomanceAnime {
    id: string;
    title: string;
    vibe: string;
    highlight: {
        label: string;
        content: string;
    };
    imagePath: string;
    tags: string[];
    platform: string;
}

export interface RomanceCategory {
    category: string;
    description: string;
    items: RomanceAnime[];
}

export async function getRomanceAnime(): Promise<RomanceCategory[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'romance.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').map(line => line.trim());
    const categories: RomanceCategory[] = [];
    let currentCategory: RomanceCategory | null = null;
    let currentAnime: Partial<RomanceAnime> | null = null;

    // Manual image mapping
    const coverImageMap: Record<string, string> = {
        'Cyberpunk: Edgerunners': 'cyberpunk.jpg',
        // Add others if they become available
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!line) continue;

        // Detect Categories (lines starting with emojis usually, or just visually distinct headers)
        if (line.match(/^🎭|💋|😭|✨/)) {
            // Save previous anime if exists
            if (currentAnime && currentCategory) {
                // Push previous anime
                if (currentAnime.title) {
                    currentCategory.items.push(currentAnime as RomanceAnime);
                }
                currentAnime = null;
            }

            const categoryName = line;
            let description = '';

            // Peek next line for description
            if (lines[i + 1] && !lines[i + 1].includes(':')) {
                description = lines[i + 1];
                i++; // Skip description line
            }

            currentCategory = {
                category: categoryName,
                description,
                items: []
            };
            categories.push(currentCategory);
            continue;
        }

        // Capture Title (If it's not a field key and we are in a category)
        if (currentCategory && !line.includes('The Vibe:') && !line.includes('Melting Point:') && !line.includes('The Kiss:') && !line.includes('The Tear-jerker:') && !line.startsWith('Platform:')) {
            // If we are already building an anime, push it and start new
            if (currentAnime && currentAnime.title) {
                currentCategory.items.push(currentAnime as RomanceAnime);
                currentAnime = null;
            }

            // Special case for the "Bonus" section which is just a list
            if (currentCategory.category.includes('Bonus')) {
                // Logic for bonus items (Single line: "Title (Description)")
                const match = line.match(/^(.*?)\s*\((.*?)\)$/);
                if (match) {
                    const title = match[1];
                    const vibe = match[2];
                    currentCategory.items.push({
                        id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        title: title,
                        vibe: vibe,
                        highlight: { label: 'Bonus', content: 'Pure wholesome vibes' },
                        imagePath: '/animeCovers/placeHolder.png',
                        tags: ['Wholesome'],
                        platform: ''
                    });
                }
                continue;
            }

            currentAnime = {
                id: line.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: line,
                imagePath: coverImageMap[line] ? `/animeCovers/${coverImageMap[line]}` : '/animeCovers/placeHolder.png',
                tags: [],
                platform: ''
            };
        }

        // Capture Fields
        if (currentAnime) {
            if (line.startsWith('The Vibe:')) {
                currentAnime.vibe = line.replace('The Vibe:', '').trim();
            } else if (line.startsWith('Melting Point:')) {
                currentAnime.highlight = { label: 'Melting Point', content: line.replace('Melting Point:', '').trim() };
            } else if (line.startsWith('The Kiss:')) {
                currentAnime.highlight = { label: 'The Kiss', content: line.replace('The Kiss:', '').trim() };
            } else if (line.startsWith('The Tear-jerker:')) {
                currentAnime.highlight = { label: 'The Tear-jerker', content: line.replace('The Tear-jerker:', '').trim() };
            } else if (line.startsWith('Platform:')) {
                currentAnime.platform = line.replace('Platform:', '').trim();
            }
        }
    }

    // Push last anime
    if (currentAnime && currentCategory && currentAnime.title) {
        currentCategory.items.push(currentAnime as RomanceAnime);
    }

    return categories;
}
