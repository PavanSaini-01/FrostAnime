"use client";

import React from 'react';
import { useWatchlist } from '@/lib/watchlist-context';
import { AniListCard } from '@/components/anilist-card';
import { Bookmark, Library } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
    const { watchlist } = useWatchlist();

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

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
                    <Library size={48} />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient">Your Watchlist</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    {watchlist.length === 0
                        ? "Your frost library is currently empty."
                        : `You have saved ${watchlist.length} anime for later.`}
                </p>
            </div>

            {watchlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Bookmark size={48} style={{ opacity: 0.5 }} />
                    <p style={{ fontSize: '1.2rem' }}>No anime saved yet.</p>
                    <p>Click the bookmark icon on any anime card to add it to your list.</p>
                    <Link href="/" style={{
                        marginTop: '1rem',
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        borderRadius: '9999px',
                        background: 'rgba(14, 165, 233, 0.1)',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        border: '1px solid rgba(14, 165, 233, 0.2)'
                    }}>
                        Discover Anime
                    </Link>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {watchlist.map((anime, index) => (
                        <AniListCard key={anime.id} anime={anime} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
