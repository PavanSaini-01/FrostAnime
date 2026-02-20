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
    const filePath = path.join(process.cwd(), 'public', 'data', 'action.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as ActionAnime[];
}
