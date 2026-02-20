import { getAnimeData } from '@/lib/get-anime-data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AnimeCard } from '@/components/anime-card';

export default async function RecommendationsPage() {
    const recommendations = await getAnimeData();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/" style={{ color: 'var(--foreground)', opacity: 0.7, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
            </div>

            <div>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
                    <span className="text-gradient">No Cringe OP MC</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px' }}>
                    A curated list of 15 anime featuring Overpowered Main Characters that avoid "cringe" tropes, tailored for availability in India.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2.5rem' }}>
                {recommendations.map((anime, index) => (
                    <AnimeCard key={anime.id} anime={anime} index={index} />
                ))}
            </div>
        </div>
    );
}
