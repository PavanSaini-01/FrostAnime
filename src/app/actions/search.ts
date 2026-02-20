"use server"

import { fetchAniList, PageResponse, SEARCH_ANIME_QUERY, AniListMedia } from '@/lib/anilist';

export async function liveSearchAction(query: string): Promise<AniListMedia[]> {
    if (!query || query.length < 2) return [];

    try {
        const data = await fetchAniList<PageResponse>(SEARCH_ANIME_QUERY, {
            search: query,
            perPage: 5 // Only fetch top 5 for the dropdown
        });
        return data.Page.media || [];
    } catch (error) {
        console.error("Live search error:", error);
        return [];
    }
}
