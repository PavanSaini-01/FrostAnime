"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AniListMedia } from '@/lib/anilist';
import { useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';

// Initialize a helper to create an authenticated Supabase client
const getSupabaseClient = (accessToken?: string) => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: accessToken ? {
                    Authorization: `Bearer ${accessToken}`
                } : {}
            }
        }
    );
};

interface WatchlistContextType {
    watchlist: AniListMedia[];
    addToWatchlist: (anime: AniListMedia) => void;
    removeFromWatchlist: (animeId: number) => void;
    isInWatchlist: (animeId: number) => boolean;
    isSyncing: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [watchlist, setWatchlist] = useState<AniListMedia[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // 1. Initial Load (Local Storage)
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

    // 2. Sync to Cloud when Session Loads
    useEffect(() => {
        async function syncWithCloud() {
            if (status !== "authenticated" || !session?.user || !isLoaded) return;
            setIsSyncing(true);

            const userId = (session.user as any).id;
            const accessToken = (session as any).supabaseAccessToken;
            const supabase = getSupabaseClient(accessToken);

            try {
                // Fetch cloud data
                const { data, error } = await supabase
                    .from('watchlists')
                    .select('saved_anime')
                    .eq('user_id', userId)
                    .single();

                let cloudList: AniListMedia[] = data?.saved_anime || [];

                // Merge Local Data with Cloud Data (Deduplicate by ID)
                const localList = watchlist; // Currently holds local storage data
                const map = new Map<number, AniListMedia>();

                cloudList.forEach(anime => map.set(anime.id, anime));
                localList.forEach(anime => map.set(anime.id, anime));

                const mergedList = Array.from(map.values());

                // If local had items not in cloud, or cloud was empty but local had items, update the cloud table
                if (mergedList.length > cloudList.length || (!data && mergedList.length > 0)) {
                    await supabase
                        .from('watchlists')
                        .upsert({ user_id: userId, saved_anime: mergedList }, { onConflict: 'user_id' });
                }

                // Update state and clear local storage since cloud is true source now
                setWatchlist(mergedList);

            } catch (error) {
                console.error("Error syncing watchlist: ", error);
            } finally {
                setIsSyncing(false);
            }
        }

        syncWithCloud();
    }, [status, isLoaded]); // Run once when auth status resolves and local load is done

    // 3. Keep Local Storage & Cloud updated on changes
    useEffect(() => {
        if (!isLoaded || isSyncing) return; // Don't wipe local storage during initial load or cloud merge

        // Only save to local storage if NOT logged in (Cloud users don't need local storage)
        if (status === "unauthenticated") {
            localStorage.setItem('frost-watchlist', JSON.stringify(watchlist));
        }

        // Save to cloud if logged in
        if (status === "authenticated" && session?.user) {
            const userId = (session.user as any).id;
            const accessToken = (session as any).supabaseAccessToken;
            const supabase = getSupabaseClient(accessToken);

            // Debounce or fire and forget
            supabase
                .from('watchlists')
                .upsert({ user_id: userId, saved_anime: watchlist }, { onConflict: 'user_id' })
                .then(({ error }: { error: any }) => {
                    if (error) console.error("Cloud update failed:", error);
                });
        }
    }, [watchlist.length, isLoaded, status, isSyncing]);

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
