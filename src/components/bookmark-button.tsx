"use client";

import React from 'react';
import { Bookmark } from 'lucide-react';
import { useWatchlist } from '@/lib/watchlist-context';
import { AniListMedia } from '@/lib/anilist';

interface BookmarkButtonProps {
    anime: AniListMedia;
    accentColor?: string;
    style?: React.CSSProperties;
    showText?: boolean;
}

export function BookmarkButton({ anime, accentColor = 'var(--secondary)', style, showText = false }: BookmarkButtonProps) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const isSaved = isInWatchlist(anime.id);

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            removeFromWatchlist(anime.id);
        } else {
            addToWatchlist(anime);
        }
    };

    return (
        <button
            onClick={handleBookmark}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                zIndex: 20,
                background: isSaved ? accentColor : 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                opacity: isSaved ? 1 : 0.8,
                backdropFilter: isSaved ? 'none' : 'blur(4px)',
                ...style
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.opacity = isSaved ? '1' : '0.8';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <Bookmark
                size={showText ? 20 : 18}
                fill={isSaved ? "currentColor" : "none"}
                strokeWidth={isSaved ? 2 : 2.5}
            />
            {showText && (
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    {isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                </span>
            )}
        </button>
    );
}
