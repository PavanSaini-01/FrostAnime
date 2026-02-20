import { fetchAniList, GET_ANIME_BY_ID_QUERY, SingleAnimeResponse } from '@/lib/anilist';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Play, Calendar, TrendingUp, MonitorPlay } from 'lucide-react';
import { notFound } from 'next/navigation';

interface AnimePageProps {
    params: Promise<{ id: string }>;
}

export default async function AnimePage(props: AnimePageProps) {
    const { id } = await props.params;

    let anime;
    try {
        const data = await fetchAniList<SingleAnimeResponse>(GET_ANIME_BY_ID_QUERY, { id: parseInt(id) });
        anime = data.Media;
        if (!anime) notFound();
    } catch (err) {
        console.error(err);
        notFound();
    }

    const title = anime.title.english || anime.title.romaji || "Unknown Title";

    // Clean description HTML tags
    const cleanDescription = anime.description ? anime.description.replace(/<[^>]*>?/gm, '') : 'No description available.';

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Banner Section */}
            <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: anime.coverImage.color || '#1e293b' }}>
                {anime.bannerImage ? (
                    <Image
                        src={anime.bannerImage}
                        alt={`${title} Banner`}
                        fill
                        style={{ objectFit: 'cover', opacity: 0.6 }}
                        unoptimized
                        priority
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(to bottom right, ${anime.coverImage.color || 'var(--primary)'}44, transparent)`
                    }} />
                )}

                {/* Gradient Overlay for seamless transition */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
                }} />
            </div>

            <div className="container" style={{ position: 'relative', marginTop: '-150px', zIndex: 10, maxWidth: '1200px', margin: '-150px auto 0', paddingLeft: '1rem', paddingRight: '1rem' }}>

                <Link href="/" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', width: 'fit-content' }}>
                    <ArrowLeft size={20} /> <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Back</span>
                </Link>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }} className="md:flex-row md:items-start md:gap-8">

                    {/* Cover Image Column */}
                    <div className="flex-shrink-0" style={{ width: '250px', margin: '0 auto' }}>
                        <div className="glass" style={{
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            aspectRatio: '2/3',
                            width: '100%'
                        }}>
                            {anime.coverImage.extraLarge && (
                                <Image
                                    src={anime.coverImage.extraLarge}
                                    alt={title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    unoptimized
                                    priority
                                />
                            )}
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="glass" style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Score</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: 600 }}>
                                    <Star size={16} fill="#fbbf24" /> {anime.averageScore || 'N/A'}%
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Format</span>
                                <span style={{ fontWeight: 500 }}>{anime.format}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Episodes</span>
                                <span style={{ fontWeight: 500 }}>{anime.episodes || 'Ongoing'}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Status</span>
                                <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{anime.status?.toLowerCase()}</span>
                            </div>

                            {anime.season && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Season</span>
                                    <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{anime.season.toLowerCase()} {anime.seasonYear}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Info Column */}
                    <div style={{ flex: 1, paddingTop: '1rem' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                            {title}
                        </h1>

                        {anime.title.romaji && anime.title.romaji !== title && (
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, opacity: 0.6, marginBottom: '1.5rem' }}>
                                {anime.title.romaji}
                            </h2>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                            {anime.genres.map((g, i) => (
                                <span key={i} className="glass" style={{
                                    fontSize: '0.875rem',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '2rem',
                                    color: 'var(--primary)',
                                    fontWeight: 500,
                                    border: '1px solid rgba(14, 165, 233, 0.2)'
                                }}>
                                    {g}
                                </span>
                            ))}
                        </div>

                        <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Synopsis
                            </h3>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.85, whiteSpace: 'pre-wrap' }}>
                                {cleanDescription}
                            </p>
                        </div>

                        {anime.streamingEpisodes && anime.streamingEpisodes.length > 0 && (
                            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MonitorPlay size={20} className="text-secondary" /> Streaming
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                    {anime.streamingEpisodes.slice(0, 4).map((stream, idx) => (
                                        <Link key={idx} href={stream.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            <div className="hover-card glass" style={{
                                                padding: '1rem',
                                                borderRadius: '1rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem',
                                                background: 'rgba(255,255,255,0.02)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--secondary)' }}>{stream.site}</span>
                                                <span style={{ fontSize: '0.8rem', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{stream.title}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
