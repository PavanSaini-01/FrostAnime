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
    const filePath = path.join(process.cwd(), 'public', 'data', 'echianime.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as EchiCategory[];
}
