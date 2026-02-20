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
    const filePath = path.join(process.cwd(), 'public', 'data', 'romance.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as RomanceCategory[];
}
