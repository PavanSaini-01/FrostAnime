// scripts/sync-anilist.ts

import fs from 'fs';
import path from 'path';

// Define the GraphQL query we will use
const BROWSE_MEDIA_QUERY = `
query ($page: Int = 1, $perPage: Int = 20, $genre: String, $sort: [MediaSort] = [POPULARITY_DESC]) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, genre: $genre, sort: $sort) {
      id
      title { romaji english }
      description
      coverImage { extraLarge large }
      genres
      averageScore
      popularity
      episodes
      status
      format
      streamingEpisodes { site }
    }
  }
}
`;

// Helper to interact with the API
async function fetchAniList(variables: Record<string, any>, query: string = BROWSE_MEDIA_QUERY) {
    console.log(`Fetching AniList data with variables:`, variables);
    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const json = await response.json();
    if (json.errors || !response.ok) {
        throw new Error(json.errors?.[0]?.message || 'GraphQL Fetch Error');
    }
    return json.data;
}

// Helper to strip HTML tags from descriptions
function stripHtml(html: string | null, fallback: string): string {
    if (!html) return fallback;
    return html.replace(/<[^>]*>?/gm, '').split('. ').slice(0, 2).join('. ') + '.';
}

// ---------------------------------------------------------
// Sync Romance
// ---------------------------------------------------------
async function syncRomance() {
    const popularData = await fetchAniList({ page: 1, perPage: 12, genre: "Romance", sort: ["POPULARITY_DESC"] });
    const topRatedData = await fetchAniList({ page: 1, perPage: 12, genre: "Romance", sort: ["SCORE_DESC", "POPULARITY_DESC"] });

    const mapFn = (media: any) => ({
        id: String(media.id),
        title: media.title.english || media.title.romaji,
        vibe: stripHtml(media.description, "A beautiful romance story."),
        highlight: {
            label: media.averageScore >= 85 ? "Masterpiece" : "The Vibe",
            content: media.averageScore >= 85 ? `Highly Rated: ${media.averageScore}%` : "A must-watch romance classic."
        },
        imagePath: media.coverImage.extraLarge || media.coverImage.large,
        tags: media.genres.slice(0, 3),
        platform: media.streamingEpisodes?.[0]?.site || "Various Platforms"
    });

    const categories = [
        {
            category: "🏆 Most Popular Romance",
            description: "The biggest, most beloved romantic hits in anime history.",
            items: popularData.Page.media.map(mapFn)
        },
        {
            category: "⭐ Top Rated Masterpieces",
            description: "Critically acclaimed stories that will melt your heart.",
            items: topRatedData.Page.media.map(mapFn)
        }
    ];

    fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'romance.json'), JSON.stringify(categories, null, 2));
    console.log("✅ Synced Romance anime");
}

// ---------------------------------------------------------
// Sync Action
// ---------------------------------------------------------
async function syncAction() {
    const actionData = await fetchAniList({ page: 1, perPage: 15, genre: "Action", sort: ["POPULARITY_DESC"] });

    const animeList = actionData.Page.media.map((media: any) => ({
        id: media.id,
        title: media.title.english || media.title.romaji,
        description: stripHtml(media.description, "Epic action awaits."),
        blaze: media.averageScore > 80 ? `Critically Acclaimed: ${media.averageScore}%` : "Incredible fight scenes and animation.",
        imagePath: media.coverImage.extraLarge || media.coverImage.large,
        platform: media.streamingEpisodes?.[0]?.site || "Various Platforms"
    }));

    fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'action.json'), JSON.stringify(animeList, null, 2));
    console.log("✅ Synced Action anime");
}

// ---------------------------------------------------------
// Sync Ecchi
// ---------------------------------------------------------
async function syncEcchi() {
    const goldStandard = await fetchAniList({ page: 1, perPage: 6, genre: "Ecchi", sort: ["POPULARITY_DESC"] });
    const wildcards = await fetchAniList({ page: 1, perPage: 6, genre: "Ecchi", sort: ["TRENDING_DESC", "SCORE_DESC"] });

    const mapFn = (media: any) => ({
        id: String(media.id),
        title: media.title.english || media.title.romaji,
        vibe: media.averageScore > 75 ? "Actually has a really good story." : "High tension and fan service.",
        plot: stripHtml(media.description, "A surprising plot."),
        imagePath: media.coverImage.extraLarge || media.coverImage.large,
        platform: media.streamingEpisodes?.[0]?.site || "Various Platforms"
    });

    const categories = [
        { category: "🏆 The Gold Standard", items: goldStandard.Page.media.map(mapFn) },
        { category: "🃏 The Trending Wildcards", items: wildcards.Page.media.map(mapFn) }
    ];

    fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'echianime.json'), JSON.stringify(categories, null, 2));
    console.log("✅ Synced Ecchi anime");
}

// ---------------------------------------------------------
// Sync Frozen (Slice of Life / Psychological)
// ---------------------------------------------------------
async function syncFrozen() {
    const quietMasters = await fetchAniList({ page: 1, perPage: 6, genre: "Slice of Life", sort: ["SCORE_DESC", "POPULARITY_DESC"] });
    const eliteNarratives = await fetchAniList({ page: 1, perPage: 6, genre: "Psychological", sort: ["SCORE_DESC", "POPULARITY_DESC"] });

    const mapFn = (media: any) => ({
        id: String(media.id),
        title: media.title.english || media.title.romaji,
        vibe: "A profound experience.",
        chill: stripHtml(media.description, "Perfect for unwinding."),
        imagePath: media.coverImage.extraLarge || media.coverImage.large,
        platform: media.streamingEpisodes?.[0]?.site || "Various Platforms"
    });

    const categories = [
        {
            category: "🍵 The Quiet Masterpieces",
            description: "Slow-paced narratives that heal the soul and make you think.",
            items: quietMasters.Page.media.map(mapFn)
        },
        {
            category: "🧠 The Elite Narratives",
            description: "Complex, atmospheric shows that challenge your perception.",
            items: eliteNarratives.Page.media.map(mapFn)
        }
    ];

    fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'frozenInTime.json'), JSON.stringify(categories, null, 2));
    console.log("✅ Synced Frozen anime");
}

// ---------------------------------------------------------
// Sync Homepage (No Cringe OP MC)
// ---------------------------------------------------------
import { getAnimeData } from '../src/lib/get-anime-data';

const SEARCH_IMAGE_QUERY = `
query ($search: String) {
  Media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
    coverImage { extraLarge large }
  }
}
`;

async function syncHomepage() {
    const localData = await getAnimeData();
    for (const anime of localData) {
        try {
            const cleanTitle = anime.title.replace(/\(.*?\)/g, '')
                .replace(': The Maxim', '')
                .replace(' (Kiseijuu)', '')
                .replace(': Season 1', '')
                .trim();
            const result = await fetchAniList({ search: cleanTitle }, SEARCH_IMAGE_QUERY);
            if (result && result.Media && result.Media.coverImage) {
                anime.imagePath = result.Media.coverImage.extraLarge || result.Media.coverImage.large;
            }
        } catch (e) {
            console.log(`Could not fetch image for ${anime.title}`);
        }
    }
    fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'homepage.json'), JSON.stringify(localData, null, 2));
    console.log("✅ Synced Homepage anime");
}

// ---------------------------------------------------------
// Sync Seasonal
// ---------------------------------------------------------
import { getSeasonalAnime } from '../src/lib/get-seasonal-anime';

async function syncSeasonal() {
    const localGroups = await getSeasonalAnime();
    for (const group of localGroups) {
        for (const anime of group.items) {
            try {
                const cleanTitle = anime.title.replace(/\(.*?\)/g, '')
                    .replace(': Elbaph Arc', '')
                    .trim();
                const result = await fetchAniList({ search: cleanTitle }, SEARCH_IMAGE_QUERY);
                if (result && result.Media && result.Media.coverImage) {
                    anime.imagePath = result.Media.coverImage.extraLarge || result.Media.coverImage.large;
                }
            } catch (e) {
                console.log(`Could not fetch image for ${anime.title}`);
            }
        }
    }
    fs.writeFileSync(path.join(process.cwd(), 'public', 'data', 'seasonal.json'), JSON.stringify(localGroups, null, 2));
    console.log("✅ Synced Seasonal anime");
}

// ---------------------------------------------------------
// Run all syncs
// ---------------------------------------------------------
async function runAll() {
    console.log("🚀 Starting AniList data sync...");
    try {
        await syncRomance();
        await syncAction();
        await syncEcchi();
        await syncFrozen();
        await syncHomepage();
        await syncSeasonal();
        console.log("🎉 All data synced successfully!");
    } catch (error) {
        console.error("❌ Sync failed:", error);
    }
}

runAll();
