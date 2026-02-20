
import { getActionAnime } from '@/lib/get-action-anime';
import Link from 'next/link';
import { ArrowLeft, Flame, ShieldAlert, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Client component for card to handle framer-motion
import { ActionCard } from '@/components/action-card';

export default async function ActionPage() {
    const animeList = await getActionAnime();

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
                    <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #f97316, #ef4444)' }}>Blazing Action</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Top 10 Overpowered MCs who destroy their enemies with style. Zero hesitation, pure power.
                </p>
            </div>

            <div style={{ columns: '320px', columnGap: '2rem' }}>
                {animeList.map((anime, index) => (
                    <ActionCard key={anime.id} anime={anime} index={index} />
                ))}
            </div>
        </div>
    );
}
