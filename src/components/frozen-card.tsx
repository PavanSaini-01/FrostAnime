
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Snowflake, Quote } from 'lucide-react';
import { FrozenAnime } from '@/lib/get-frozen-anime';

interface FrozenCardProps {
    anime: FrozenAnime;
    index: number;
}

export function FrozenCard({ anime, index }: FrozenCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (index % 10) * 0.1, duration: 0.6, ease: "easeOut" }}
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
                height: '100%',
                border: '1px solid rgba(255,255,255,0.05)'
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '260px' }} className="flex-shrink-0">
                <motion.div
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Image
                        src={anime.imagePath}
                        alt={anime.title}
                        fill
                        style={{ objectFit: 'cover', filter: 'grayscale(30%)' }}
                    />
                </motion.div>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }} />

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
                <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {anime.vibe}
                </p>

                <div style={{
                    marginTop: 'auto',
                    padding: '1rem',
                    backgroundColor: 'rgba(148, 163, 184, 0.05)',
                    borderRadius: '1rem',
                    borderLeft: '3px solid #94a3b8'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        <Snowflake size={14} /> WHY IT FITS:
                    </div>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8, fontStyle: 'italic' }}>"{anime.chill}"</p>
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
