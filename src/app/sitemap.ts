import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.frostanime.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/recommendations`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/seasonal`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/calendar`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/action`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/romance`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/frozen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/echi`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/search`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/roulette`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/watchlist`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Dynamic routes from Jikan API (top anime)
    let dynamicRoutes: MetadataRoute.Sitemap = [];

    try {
        const res = await fetch('https://api.jikan.moe/v4/top/anime', {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });

        if (!res.ok) {
            throw new Error(`Jikan API returned ${res.status}`);
        }

        const json = await res.json();

        dynamicRoutes = (json.data ?? []).map((anime: { mal_id: number }) => ({
            url: `${BASE_URL}/anime/${anime.mal_id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));
    } catch (err) {
        // Gracefully return empty array if the API fails or rate-limits
        console.warn('Sitemap: Jikan API fetch failed, skipping dynamic anime routes.', err);
        dynamicRoutes = [];
    }

    return [...staticRoutes, ...dynamicRoutes];
}
