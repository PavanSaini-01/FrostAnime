import fs from 'fs';
import path from 'path';

export interface AnimeRecommendation {
    id: number;
    title: string;
    description: string;
    whyNotCringe: string;
    genre: string;
    dubbed: string;
    platform: string;
    imagePath: string;
}

export async function getAnimeData(): Promise<AnimeRecommendation[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'homepage.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as AnimeRecommendation[];
}
