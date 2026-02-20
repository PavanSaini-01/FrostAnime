
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimeRecommendation } from "@/lib/get-anime-data"

interface AnimeCardProps {
    anime: AnimeRecommendation
    index: number
}

export function AnimeCard({ anime, index }: AnimeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1, // Stagger effect
                type: "spring",
                stiffness: 50
            }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="glass"
            style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transformStyle: 'preserve-3d', // For potential 3D effects
            }}
        >
            <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden' }}>
                <motion.div
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Image
                        src={anime.imagePath}
                        alt={anime.title}
                        fill
                        style={{ objectFit: 'cover' }}
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
                            <span style={{ opacity: 0.7, fontSize: '0.85rem', marginRight: '0.5rem' }}>#{anime.id}</span>
                            {anime.title}
                        </h2>
                    </motion.div>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {anime.genre.split(',').slice(0, 3).map((g, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', opacity: 0.7, fontStyle: 'italic', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem' }}>{g.trim()}</span>
                        ))}
                    </div>
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                    }}>
                        {anime.dubbed === 'Yes' ? 'Dubbed' : 'Sub'}
                    </span>
                </div>

                <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>{anime.description}</p>

                <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '1rem', borderLeft: '3px solid var(--secondary)' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--secondary)' }}>Why it's not cringe:</h3>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8, fontStyle: 'italic' }}>"{anime.whyNotCringe}"</p>
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
                        {anime.platform.replace(/,?\s*Muse Asia\s*\(YouTube\s*-\s*periodically available\)/i, '').replace(/,?\s*Muse Asia\s*\(YouTube\)/i, '').replace(/,?\s*YouTube/i, '')}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
