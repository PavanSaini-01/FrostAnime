"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AniListMedia } from '@/lib/anilist';
import { useUser } from '@/components/supabase-provider';
import { createClient } from '@/lib/supabase/client';

interface WatchlistContextType {
    watchlist: AniListMedia[];
    addToWatchlist: (anime: AniListMedia) => void;
    removeFromWatchlist: (animeId: number) => void;
    isInWatchlist: (animeId: number) => boolean;
    isSyncing: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
    const { user, isLoading: isUserLoading } = useUser();
    const supabase = createClient();

    const [watchlist, setWatchlist] = useState<AniListMedia[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // 1. Initial Load (Local Storage fallback)
    useEffect(() => {
        const saved = localStorage.getItem('frost-watchlist');
        if (saved) {
            try {
                setWatchlist(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse local watchlist', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // 2. Sync to Cloud when User Loads (Both Real and Anonymous users)
    useEffect(() => {
        let isMounted = true;

        async function syncWithCloud() {
            if (isUserLoading || !user || !isLoaded) return;

            try {
                setIsSyncing(true);

                // Fetch cloud data using our native configured client
                const { data, error } = await supabase
                    .from('watchlists')
                    .select('saved_anime')
                    .eq('user_id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    console.error("Error fetching cloud watchlist:", error);
                }

                let cloudList: AniListMedia[] = data?.saved_anime || [];

                // Merge Local Data with Cloud Data (Deduplicate by ID)
                const localList = watchlist;
                const map = new Map<number, AniListMedia>();

                cloudList.forEach(anime => map.set(anime.id, anime));
                localList.forEach(anime => map.set(anime.id, anime));

                const mergedList = Array.from(map.values());

                // Auto-upsert if we have mixed local data
                if (mergedList.length > cloudList.length || (!data && mergedList.length > 0)) {
                    await supabase
                        .from('watchlists')
                        .upsert({ user_id: user.id, saved_anime: mergedList }, { onConflict: 'user_id' });
                }

                if (isMounted) {
                    setWatchlist(mergedList);
                    // Standardize local storage just in case they go offline later
                    localStorage.setItem('frost-watchlist', JSON.stringify(mergedList));
                }

            } catch (error) {
                console.error("Error syncing watchlist: ", error);
            } finally {
                if (isMounted) setIsSyncing(false);
            }
        }

        syncWithCloud();

        return () => { isMounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserLoading, user?.id, isLoaded]);

    // 3. Keep Local Storage & Cloud updated on changes
    useEffect(() => {
        // Skip updating backends on the initial cloud merge
        if (!isLoaded || isSyncing) return;

        // Always save to local storage as fallback
        localStorage.setItem('frost-watchlist', JSON.stringify(watchlist));

        // Save to cloud if user exists (anonymous or permanent)
        if (user) {
            supabase
                .from('watchlists')
                .upsert({ user_id: user.id, saved_anime: watchlist }, { onConflict: 'user_id' })
                .then(({ error }: { error: any }) => {
                    if (error) console.error("Cloud update failed:", error);
                });
        }
    }, [watchlist, isLoaded, isSyncing, user, supabase]);

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
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, isSyncing }}>
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
