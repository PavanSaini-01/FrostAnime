"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { SeasonalAnimeItem } from "@/lib/get-seasonal-anime"
import { Calendar, Building2, Flame, BookOpen } from "lucide-react"

// import { useRef } from "react"

interface SeasonalCardProps {
    anime: SeasonalAnimeItem
    index: number
}

export function SeasonalCard({ anime, index }: SeasonalCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                breakInside: 'avoid',
                marginBottom: '2rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}
            className="glass"
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

                {/* Badge for Status/Date - Kept from original but styled better */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 10
                }}>
                    <span className="glass" style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: anime.details?.includes('AIRING') ? 'rgba(34, 197, 94, 0.8)' : 'rgba(59, 130, 246, 0.8)',
                        color: 'white',
                        backdropFilter: 'blur(4px)',
                        border: 'none'
                    }}>
                        {anime.details?.includes('AIRING') ? 'AIRING NOW' : 'UPCOMING'}
                    </span>
                </div>

                {/* Title Overlay */}
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
                            {anime.title}
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Meta Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {anime.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} style={{ fontSize: '0.75rem', opacity: 0.7, fontStyle: 'italic', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', opacity: 0.8, alignItems: 'center' }}>
                    {anime.studio && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Building2 size={12} /> {anime.studio}</span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {anime.details?.replace(/\[.*?\]\s*/, '')}</span>
                </div>

                <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {anime.hype}
                </p>

                <div style={{
                    marginTop: 'auto',
                    padding: '1rem',
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    borderRadius: '1rem',
                    borderLeft: '3px solid #8b5cf6'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: '#8b5cf6', fontWeight: 600, fontSize: '0.85rem' }}>
                        <BookOpen size={14} /> CONTENT ANGLE:
                    </div>
                    <p style={{ fontSize: '0.875rem', opacity: 0.8, fontStyle: 'italic' }}>"{anime.contentAngle}"</p>
                </div>
            </div>
        </motion.div>
    )
}
