
import { getRomanceAnime } from '@/lib/get-romance-anime';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RomanceCard } from '@/components/romance-card';

export default async function RomancePage() {
    const romanceCategories = await getRomanceAnime();

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
                    <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)' }}>Melting Romance</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Curated collection of anime that will melt your heart—enemies to lovers, first kisses, and tear-jerkers.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                {romanceCategories.map((group, groupIndex) => (
                    <section key={groupIndex}>
                        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ec4899' }}>
                                {group.category}
                            </h2>
                            {group.description && (
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '9999px',
                                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                                    border: '1px solid rgba(236, 72, 153, 0.2)'
                                }}>
                                    <p style={{ fontSize: '1.1rem', opacity: 0.9, fontStyle: 'italic', margin: 0 }}>
                                        {group.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                            {group.items.map((anime, index) => (
                                <RomanceCard key={anime.id} anime={anime} index={index + (groupIndex * 2)} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
