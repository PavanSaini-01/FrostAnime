
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Eye, ScrollText } from 'lucide-react';
import { EchiAnime } from '@/lib/get-echi-anime';
import { BookmarkButton } from '@/components/bookmark-button';
import { AniListMedia } from '@/lib/anilist';

interface EchiCardProps {
    anime: EchiAnime;
    index: number;
}

export function EchiCard({ anime, index }: EchiCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % 10) * 0.1, duration: 0.4 }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="glass"
            style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                breakInside: 'avoid',
                marginBottom: '2rem',
                transformStyle: 'preserve-3d',
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '400px' }} className="flex-shrink-0">
                <motion.div
                    style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    {anime.imagePath ? (
                        <Image
                            src={anime.imagePath}
                            alt={anime.title}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                            unoptimized
                        />
                    ) : (
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>No Image</span>
                    )}
                </motion.div>

                {/* Bookmark Button */}
                <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    zIndex: 20
                }}>
                    <BookmarkButton
                        anime={{
                            id: anime.id,
                            title: { english: anime.title },
                            coverImage: { large: anime.imagePath, extraLarge: anime.imagePath },
                            genres: [],
                            description: anime.plot,
                        } as unknown as AniListMedia}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    maxWidth: '85%',
                    zIndex: 10
                }}>
                    <motion.div
                        className="glass"
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.75rem',
                            backdropFilter: 'blur(12px)',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        whileHover={{
                            background: 'rgba(255, 255, 255, 0.25)',
                            scale: 1.05
                        }}
                    >
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            <span style={{ opacity: 0.7, fontSize: '0.85rem', marginRight: '0.5rem' }}>#{index + 1}</span>
                            {anime.title}
                        </h2>
                    </motion.div>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#db2777', fontWeight: 600, fontSize: '0.85rem' }}>
                        {/* Vibe as a tag */}
                        <span style={{ fontSize: '0.75rem', opacity: 0.7, fontStyle: 'italic', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem' }}>
                            <Sparkles size={12} className="inline mr-1" /> {anime.vibe}
                        </span>
                    </div>
                    {/* Plot as description */}
                    <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>{anime.plot}</p>
                </div>

                <div style={{
                    marginTop: '0.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Available on</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        {anime.platform || 'Not available'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
