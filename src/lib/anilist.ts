// src/lib/anilist.ts

/**
 * Shared Types for AniList Responses
 */

export interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  description: string | null;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string | null;
  };
  bannerImage: string | null;
  genres: string[];
  averageScore: number | null;
  popularity: number;
  trending: number;
  episodes: number | null;
  status: string;
  season: string | null;
  seasonYear: number | null;
  format: string;
  streamingEpisodes?: {
    site: string;
    title: string;
    url: string;
  }[];
}

export interface AniListResponse<T> {
  data: T;
  errors?: Array<{ message: string; status: number }>;
}

export interface PageResponse {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
    media: AniListMedia[];
  };
}

export interface SingleAnimeResponse {
  Media: AniListMedia;
}

/**
 * Core GraphQL Fetcher
 */
export async function fetchAniList<T = PageResponse>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    }),
    // Revalidate every 24 hours to keep data fresh but avoid hitting rate limits
    next: { revalidate: 86400 }
  });

  const json = await response.json() as AniListResponse<T>;

  if (json.errors || !response.ok) {
    console.error("AniList API Error:", json.errors);
    throw new Error(json.errors?.[0]?.message || `GraphQL Fetch Error: ${response.statusText}`);
  }

  return json.data;
}

/**
 * Common Queries
 */
export const BROWSE_MEDIA_QUERY = `
query ($page: Int = 1, $perPage: Int = 20, $genre: String, $sort: [MediaSort] = [POPULARITY_DESC]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(type: ANIME, genre: $genre, sort: $sort) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      genres
      averageScore
      popularity
      trending
      episodes
      status
      season
      seasonYear
      format
      streamingEpisodes {
        site
        title
        url
      }
    }
  }
}
`;

export const SEARCH_ANIME_QUERY = `
query ($page: Int = 1, $perPage: Int = 20, $search: String, $sort: [MediaSort] = [POPULARITY_DESC]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(type: ANIME, search: $search, sort: $sort) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      genres
      averageScore
      popularity
      trending
      episodes
      status
      season
      seasonYear
      format
      streamingEpisodes {
        site
        title
        url
      }
    }
  }
}
`;

export const GET_ANIME_BY_ID_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      genres
      averageScore
      popularity
      trending
      episodes
      status
      season
      seasonYear
      format
      streamingEpisodes {
        site
        title
        url
      }
  }
}
`;
