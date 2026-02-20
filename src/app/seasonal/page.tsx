
import { getSeasonalAnime } from '@/lib/get-seasonal-anime';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SeasonalCard } from '@/components/seasonal-card';

export default async function SeasonalPage() {
    const seasonalGroups = await getSeasonalAnime();

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
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
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, var(--secondary), var(--accent))' }}>Seasonal Anime Guide</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Stay up to date with the latest airing anime, upcoming hits, and industry rumors.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                {seasonalGroups.map((group, groupIndex) => (
                    <section key={groupIndex}>
                        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--primary)' }}>
                                {group.season}
                            </h2>
                            {group.description && (
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '9999px',
                                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                                    border: '1px solid rgba(14, 165, 233, 0.2)'
                                }}>
                                    <p style={{ fontSize: '1.1rem', opacity: 0.9, fontStyle: 'italic', margin: 0 }}>
                                        {group.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '2rem' }}>
                            {group.items.map((anime, index) => (
                                <SeasonalCard key={anime.id} anime={anime} index={index + (groupIndex * 2)} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
