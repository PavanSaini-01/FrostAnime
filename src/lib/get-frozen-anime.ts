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
    const filePath = path.join(process.cwd(), 'public', 'data', 'frozenInTime.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as FrozenCategory[];
}
