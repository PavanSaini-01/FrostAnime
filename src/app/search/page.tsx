import { fetchAniList, PageResponse, SEARCH_ANIME_QUERY } from '@/lib/anilist';
import { AniListCard } from '@/components/anilist-card';
import { Search } from 'lucide-react';

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage(props: SearchPageProps) {
    // Await the params
    const { q } = await props.searchParams;
    const query = q || '';

    let results: PageResponse['Page']['media'] = [];
    let error = null;

    if (query) {
        try {
            const data = await fetchAniList<PageResponse>(SEARCH_ANIME_QUERY, {
                search: query,
                perPage: 30
            });
            results = data.Page.media;
        } catch (err: any) {
            error = err.message;
        }
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div className="glass" style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.03)'
            }}>
                <div style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
                    <Search size={48} />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    {query ? (
                        <>Search Results for <span className="text-gradient">"{query}"</span></>
                    ) : (
                        <span className="text-gradient">Search Anime</span>
                    )}
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    {query
                        ? `Found ${results.length} results for your search. Explore the best matches below.`
                        : `Type a title in the search bar to find your next favorite anime.`
                    }
                </p>
            </div>

            {error && (
                <div style={{ padding: '1.5rem', borderRadius: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    Error fetching results: {error}
                </div>
            )}

            {query && !error && results.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
                    <p style={{ fontSize: '1.2rem' }}>No results found for "{query}".</p>
                    <p>Try using different keywords.</p>
                </div>
            )}

            {results.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {results.map((anime, index) => (
                        <AniListCard key={anime.id} anime={anime} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
