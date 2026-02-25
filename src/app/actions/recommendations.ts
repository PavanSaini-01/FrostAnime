"use server";

import { fetchAniList, PageResponse, AniListMedia } from "@/lib/anilist";

const ROULETTE_QUERY = `
query ($page: Int, $genre: String) {
  Page(page: $page, perPage: 50) {
    media(
      type: ANIME, 
      genre: $genre, 
      sort: [SCORE_DESC, POPULARITY_DESC], 
      isAdult: false,
      averageScore_greater: 75
    ) {
      id
      title {
        english
        romaji
      }
      coverImage {
        extraLarge
        large
        color
      }
      bannerImage
      averageScore
      format
      episodes
      seasonYear
      genres
      description
    }
  }
}
`;

export async function getAnimeRecommendations(page: number, genre?: string): Promise<AniListMedia[]> {
    try {
        const data = await fetchAniList<PageResponse>(ROULETTE_QUERY, {
            page,
            genre
        });
        return data.Page.media;
    } catch (error) {
        console.error("Failed to fetch roulette recommendations:", error);
        return [];
    }
}
