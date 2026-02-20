
import { getFrozenAnime } from '@/lib/get-frozen-anime';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FrozenCard } from '@/components/frozen-card';

export default async function FrozenPage() {
    const categories = await getFrozenAnime();
    let globalIndex = 0;

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
                background: 'rgba(255, 255, 255, 0.02)'
            }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #94a3b8, #cbd5e1)' }}>Frozen in Time</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Timeless masterpieces. Atmospheric, deep, and perfect for a quiet night.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                {categories.map((group, groupIndex) => (
                    <section key={groupIndex}>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#94a3b8' }}>
                                {group.category}
                            </h2>
                            {group.description && (
                                <p style={{ fontSize: '1.1rem', opacity: 0.6, fontStyle: 'italic' }}>
                                    {group.description}
                                </p>
                            )}
                        </div>

                        <div style={{ columns: '320px', columnGap: '2rem' }}>
                            {group.items.map((anime) => {
                                globalIndex++;
                                return (
                                    <FrozenCard key={anime.id} anime={anime} index={globalIndex} />
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );

}
