import { fetchAniList, PageResponse, BROWSE_MEDIA_QUERY } from '@/lib/anilist';
import { AniListCard } from '@/components/anilist-card';
import { ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
    const { slug } = await props.params;

    // Simple slug mapping logic for common categories
    // In a full app, this would be a more robust slug-to-genre/tag mapper.
    const slugToGenreMap: Record<string, string> = {
        'action-fantasy': 'Action',
        'overpowered-mc': 'Action', // Best approximation via genre without complex tag queries
        'hidden-gems': 'Drama',
        'romance-comedy': 'Romance'
    };

    const genre = slugToGenreMap[slug] || slug.replace('-', ' ');

    let results: PageResponse['Page']['media'] = [];
    let error = null;

    try {
        const data = await fetchAniList<PageResponse>(BROWSE_MEDIA_QUERY, {
            genre: genre.charAt(0).toUpperCase() + genre.slice(1), // capitalize
            perPage: 30
        });
        results = data.Page.media;
    } catch (err: any) {
        error = err.message;
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/" style={{ color: 'var(--foreground)', opacity: 0.7, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
            </div>

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
                    <Tag size={48} />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1, textTransform: 'capitalize' }}>
                    <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, var(--primary), var(--accent))' }}>
                        {slug.replace('-', ' ')}
                    </span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Discover top-rated anime curated just for the <span style={{ fontWeight: 600, color: 'var(--primary)', textTransform: 'capitalize' }}>{genre}</span> category.
                </p>
            </div>

            {error && (
                <div style={{ padding: '1.5rem', borderRadius: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    Error fetching category results: {error}
                </div>
            )}

            {!error && results.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
                    <p style={{ fontSize: '1.2rem' }}>No anime found for category "{slug}".</p>
                    <p>This category might not exist or we couldn't fetch the data.</p>
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
