"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnimeRecommendations } from '@/app/actions/recommendations';
import { AniListMedia } from '@/lib/anilist';
import { AniListCard } from '@/components/anilist-card';
import { Dices, Sparkles, Filter, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function RoulettePage() {
    const [result, setResult] = useState<AniListMedia | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [genre, setGenre] = useState<string>("ANY");

    const genres = ["ANY", "Action", "Romance", "Comedy", "Fantasy", "Sci-Fi", "Drama", "Slice of Life", "Thriller"];

    const handleRoll = async () => {
        setIsRolling(true);
        setResult(null);

        try {
            const filterGenre = genre === "ANY" ? undefined : genre;

            // Specific genres have a smaller pool of top-rated shows than "ANY".
            // Restrict random pagination to page 1-2 for specific genres, and 1-5 for ANY.
            const maxPages = filterGenre ? 2 : 5;
            const page = Math.floor(Math.random() * maxPages) + 1;

            let data = await getAnimeRecommendations(page, filterGenre);

            // Fallback: If we somehow hit an empty page due to strict filters, force try page 1.
            if (!data || data.length === 0) {
                data = await getAnimeRecommendations(1, filterGenre);
            }

            // Artificial delay for tension + random selection from the page
            setTimeout(() => {
                if (data && data.length > 0) {
                    const randomChoice = data[Math.floor(Math.random() * data.length)];
                    setResult(randomChoice);
                } else {
                    alert("No animes found for this combination! Please try another genre.");
                }
                setIsRolling(false);
            }, 1500); // 1.5 second "spin"

        } catch (e) {
            console.error("Roulette failed", e);
            setIsRolling(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>

            <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '600px' }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '50%',
                        background: 'rgba(14, 165, 233, 0.1)',
                        color: 'var(--primary)',
                        marginBottom: '1.5rem',
                        boxShadow: '0 0 40px rgba(14, 165, 233, 0.2)'
                    }}
                >
                    <Dices size={48} />
                </motion.div>

                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient">Frost Roulette</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
                    Can't decide what to watch? Let the frost guide your fate.
                </p>
            </div>

            <div className="glass" style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '400px',
                marginBottom: '4rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={16} /> Preferred Genre
                    </label>
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        disabled={isRolling}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)',
                            outline: 'none',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        {genres.map(g => (
                            <option key={g} value={g} style={{ background: '#0f172a' }}>{g}</option>
                        ))}
                    </select>
                </div>

                <motion.button
                    whileHover={{ scale: isRolling ? 1 : 1.05 }}
                    whileTap={{ scale: isRolling ? 1 : 0.95 }}
                    onClick={handleRoll}
                    disabled={isRolling}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '1rem',
                        background: isRolling ? 'var(--card)' : 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white',
                        border: isRolling ? '1px solid var(--border)' : 'none',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        cursor: isRolling ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        boxShadow: isRolling ? 'none' : '0 10px 25px -5px rgba(14, 165, 233, 0.5)',
                        transition: 'all 0.3s'
                    }}
                >
                    {isRolling ? (
                        <>
                            <RefreshCw size={24} className="animate-spin" /> Rolling...
                        </>
                    ) : (
                        <>
                            <Sparkles size={24} /> Roll the Dice
                        </>
                    )}
                </motion.button>
            </div>

            <AnimatePresence mode="wait">
                {result && (
                    <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                        style={{ width: '100%', maxWidth: '300px' }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Your Destiny Awaits
                        </div>
                        <AniListCard anime={result} index={0} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
