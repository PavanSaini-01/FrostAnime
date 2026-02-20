
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

const coverImageMap: Record<number, string> = {
    1: 'onePunchMan.jpg',
    2: 'mobPsycho100.jpg',
    3: 'frieren.jpg',
    4: 'hellsingUltimate.jpg',
    5: 'disastrousLifeOfsaikiK.jpg',
    6: 'overlord.jpg',
    7: 'soloLeveling.jpg',
    8: 'parasyte.jpg',
    9: 'mashleMagicAmdMuscles.jpeg',
    10: 'cyberpunk.jpg',
    11: 'vinlandSaga.jpg',
    12: 'hellsParadise.jpg',
    13: 'dororo.jpg',
    14: 'samuraiChamploo.jpg',
    15: 'classroomOfElite.jpg',
};

export async function getAnimeData(): Promise<AnimeRecommendation[]> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'noCringeOpMc.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split by number followed by dot (e.g., "1. ", "2. ")
    // We align with the specific format provided by the user
    const sections = fileContent.split(/\n(?=\d+\.\s)/).slice(1); // skip the intro text

    const recommendations: AnimeRecommendation[] = sections.map((section) => {
        const lines = section.trim().split(/\r?\n/);

        // Extract ID and Title from the first line
        const titleLine = lines[0].trim();
        const idMatch = titleLine.match(/^(\d+)\.\s+(.*)$/);
        const id = idMatch ? parseInt(idMatch[1]) : 0;
        const title = idMatch ? idMatch[2].trim() : titleLine;

        // Helper to extract content based on key
        const extract = (key: string) => {
            const found = lines.find(line => line.startsWith(key));
            return found ? found.replace(key, '').trim() : '';
        };

        // For multi-line description or other fields, this simple extraction might need robustness
        // But looking at the file format, it seems fields are on single lines or paragraphs starting with the key.
        // Let's assume standard format for now.

        // We can also join lines and use regex for more robustness across multi-lines
        const fullText = section.replace(lines[0], ''); // remove title line

        const descriptionMatch = fullText.match(/Description:\s*([\s\S]*?)(?=\n\n|\nWhy it's not cringe:|$)/);
        const whyNotCringeMatch = fullText.match(/Why it's not cringe:\s*([\s\S]*?)(?=\n\n|\nGenre:|$)/);
        const genreMatch = fullText.match(/Genre:\s*([\s\S]*?)(?=\n\n|\nDubbed:|$)/);
        const dubbedMatch = fullText.match(/Dubbed:\s*([\s\S]*?)(?=\n\n|\nPlatform \(India\):|$)/);
        const platformMatch = fullText.match(/Platform \(India\):\s*([\s\S]*?)$/);

        // Default placeholder if mapping missing
        const fileName = coverImageMap[id] || 'placeHolder.png';

        return {
            id,
            title,
            description: descriptionMatch ? descriptionMatch[1].trim() : '',
            whyNotCringe: whyNotCringeMatch ? whyNotCringeMatch[1].trim() : '',
            genre: genreMatch ? genreMatch[1].trim() : '',
            dubbed: dubbedMatch ? dubbedMatch[1].trim() : '',
            platform: platformMatch ? platformMatch[1].trim() : '',
            imagePath: `/animeCovers/${fileName}`,
        };
    });

    return recommendations;
}
