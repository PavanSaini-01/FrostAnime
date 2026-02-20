
import fs from 'fs';
import path from 'path';

export interface SeasonalAnimeItem {
    id: number;
    title: string;
    details: string; // Status or Release Date
    studio: string;
    hype: string;
    contentAngle: string;
    tags: string[];
    imagePath: string;
}

export interface SeasonalGroup {
    season: string;
    description: string;
    items: SeasonalAnimeItem[];
}

const coverImageMap: Record<string, string> = {
    'Frieren: Beyond Journey’s End (Season 2)': 'frieren.jpg',
    'Dorohedoro (Season 2)': 'dororo.jpg',
};

export async function getSeasonalAnime(): Promise<SeasonalGroup[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'seasonalAnime.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split by major sections (seasons)
    // Looking for lines like "Winter 2026...", "Spring 2026...", "Summer 2026...", "Rumored..."
    // We can split by double newlines and look for the season headers

    // Better approach: Split by the known season headers or regex for "Season (Date)" pattern
    // The content has distinct blocks. Let's iterate through lines to be robust.

    const lines = fileContent.split(/\r?\n/);
    const groups: SeasonalGroup[] = [];
    let currentGroup: SeasonalGroup | null = null;
    let currentItem: Partial<SeasonalAnimeItem> | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Check for Season Header (e.g., "Winter 2026", "Spring 2026", "Rumored")
        if (line.includes('2026') && (line.includes('Winter') || line.includes('Spring') || line.includes('Summer') || line.includes('Rumored'))) {
            // Push previous item if exists
            if (currentItem && currentGroup) {
                currentGroup.items.push(currentItem as SeasonalAnimeItem);
                currentItem = null;
            }
            // Push previous group if exists
            if (currentGroup) {
                groups.push(currentGroup);
            }

            // Start new group
            currentGroup = {
                season: line,
                description: '',
                items: []
            };

            // Check if next line is a description/focus
            if (i + 1 < lines.length && lines[i + 1].startsWith('Focus:')) {
                currentGroup.description = lines[i + 1].replace('Focus:', '').trim();
                i++; // skip next line
            }
            continue;
        }

        // Check for Anime Item (e.g., "1. Jujutsu Kaisen...")
        const itemMatch = line.match(/^(\d+)\.\s+(.*)$/);
        // Special case for Rumored section which might not have numbers or different format
        // The rumored section has "JoJo's..." without number.
        // Let's rely on the structure: Title line usually followed by Status/Release Date or just start of a block

        // If we hit a numbered line, it's definitely a new item
        if (itemMatch) {
            if (currentItem && currentGroup) {
                currentGroup.items.push(currentItem as SeasonalAnimeItem);
            }
            currentItem = {
                id: parseInt(itemMatch[1]),
                title: itemMatch[2].trim(),
                imagePath: '/animeCovers/placeHolder.png' // Default
            };

            // Map image if available
            if (currentItem.title && coverImageMap[currentItem.title]) {
                currentItem.imagePath = `/animeCovers/${coverImageMap[currentItem.title]}`;
            }

            continue;
        }

        // Handle unnumbered items in "Rumored" or if format varies
        // In "Rumored", lines look like "JoJo’s Bizarre Adventure: Steel Ball Run:"
        if (currentGroup?.season.includes('Rumored') && line.endsWith(':') && !line.startsWith('Status') && !line.startsWith('Angle')) {
            if (currentItem && currentGroup) {
                currentGroup.items.push(currentItem as SeasonalAnimeItem);
            }
            const title = line.replace(':', '').trim();
            currentItem = {
                id: currentGroup.items.length + 1,
                title: title,
                imagePath: '/animeCovers/placeHolder.png'
            };
            continue;
        }

        // Parse fields for current item
        if (currentItem) {
            if (line.startsWith('Status:')) {
                currentItem.details = line.replace('Status:', '').trim();
            } else if (line.startsWith('Release Date:')) {
                currentItem.details = line.replace('Release Date:', '').trim();
            } else if (line.startsWith('Studio:')) {
                currentItem.studio = line.replace('Studio:', '').trim();
            } else if (line.startsWith('The Hype:')) {
                currentItem.hype = line.replace('The Hype:', '').trim();
            } else if (line.startsWith('Content Angle:') || line.startsWith('Angle:')) {
                currentItem.contentAngle = line.replace(/^(Content Angle:|Angle:)/, '').trim();
            } else if (line.startsWith('Tags:')) {
                const tagsStr = line.replace('Tags:', '').trim();
                currentItem.tags = tagsStr.split(' ').filter(t => t.startsWith('#'));
            }
        }
    }

    // Push final item and group
    if (currentItem && currentGroup) {
        currentGroup.items.push(currentItem as SeasonalAnimeItem);
    }
    if (currentGroup) {
        groups.push(currentGroup);
    }

    return groups;
}
