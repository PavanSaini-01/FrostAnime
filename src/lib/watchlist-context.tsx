"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AniListMedia } from '@/lib/anilist';

interface WatchlistContextType {
    watchlist: AniListMedia[];
    addToWatchlist: (anime: AniListMedia) => void;
    removeFromWatchlist: (animeId: number) => void;
    isInWatchlist: (animeId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
    const [watchlist, setWatchlist] = useState<AniListMedia[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('frost-watchlist');
        if (saved) {
            try {
                setWatchlist(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse watchlist', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever watchlist changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('frost-watchlist', JSON.stringify(watchlist));
        }
    }, [watchlist, isLoaded]);

    const addToWatchlist = (anime: AniListMedia) => {
        setWatchlist(prev => {
            if (prev.find(a => a.id === anime.id)) return prev;
            return [...prev, anime];
        });
    };

    const removeFromWatchlist = (animeId: number) => {
        setWatchlist(prev => prev.filter(a => a.id !== animeId));
    };

    const isInWatchlist = (animeId: number) => {
        return watchlist.some(a => a.id === animeId);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
}
