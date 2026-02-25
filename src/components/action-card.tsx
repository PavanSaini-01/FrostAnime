
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Flame, Sword } from 'lucide-react';
import type { ActionAnime } from '@/lib/get-action-anime';
import { BookmarkButton } from '@/components/bookmark-button';
import { AniListMedia } from '@/lib/anilist';

interface ActionCardProps {
    anime: ActionAnime;
    index: number;
}

export function ActionCard({ anime, index }: ActionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
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
                border: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            {/* Image Section */}
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
                            description: anime.description,
                        } as unknown as AniListMedia}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    />
                </div>

                {/* Title Overlay - Bottom Left */}
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
                            <span style={{ opacity: 0.7, fontSize: '0.85rem', marginRight: '0.5rem' }}>#{anime.id}</span>
                            {anime.title}
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {anime.description}
                </p>

                {/* The Blaze */}
                <div style={{
                    marginTop: 'auto',
                    padding: '1rem',
                    backgroundColor: 'rgba(249, 115, 22, 0.05)',
                    borderRadius: '1rem',
                    borderLeft: '3px solid #f97316'
                }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Flame size={14} fill="currentColor" /> THE BLAZE:
                    </h3>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8, fontStyle: 'italic' }}>"{anime.blaze}"</p>
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
