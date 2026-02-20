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

export async function getSeasonalAnime(): Promise<SeasonalGroup[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'seasonal.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as SeasonalGroup[];
}
