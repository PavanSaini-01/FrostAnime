"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AniListMedia } from "@/lib/anilist"
import { Star, Bookmark } from "lucide-react"
import { useWatchlist } from '@/lib/watchlist-context';

interface AniListCardProps {
    anime: AniListMedia
    index: number
}

export function AniListCard({ anime, index }: AniListCardProps) {
    const title = anime.title.english || anime.title.romaji;
    const accentColor = anime.coverImage.color || 'var(--secondary)';

    const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
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
        <Link href={`/anime/${anime.id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    delay: (index % 10) * 0.05,
                    type: "spring",
                    stiffness: 100
                }}
                whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                }}
                className="glass hover-card"
                style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    position: 'relative'
                }}
            >
                {/* Image Container */}
                <div style={{ position: 'relative', height: '300px', width: '100%', overflow: 'hidden' }} className="flex-shrink-0">
                    <motion.div
                        style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: anime.coverImage.color || '#1e293b' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    >
                        {anime.coverImage.large ? (
                            <Image
                                src={anime.coverImage.large}
                                alt={title}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                unoptimized
                            />
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>No Image</span>
                            </div>
                        )}



                        {/* Overlay gradient */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                            zIndex: 1
                        }} />
                    </motion.div>

                    {/* Bookmark Ribbon */}
                    <button
                        onClick={handleBookmark}
                        style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '16px',
                            zIndex: 20,
                            background: isSaved ? accentColor : 'rgba(0,0,0,0.6)',
                            border: 'none',
                            padding: '12px 8px 16px',
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 8px), 0 100%)',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transformOrigin: 'top center',
                            opacity: isSaved ? 1 : 0.7,
                            backdropFilter: isSaved ? 'none' : 'blur(4px)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = isSaved ? '1' : '0.7';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <Bookmark
                            size={18}
                            fill={isSaved ? "currentColor" : "none"}
                            strokeWidth={isSaved ? 2 : 2.5}
                        />
                    </button>

                    {/* Score badge directly on image */}
                    {anime.averageScore && (
                        <div style={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            zIndex: 10,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Star size={12} fill="#fbbf24" color="#fbbf24" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white' }}>{anime.averageScore}%</span>
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h2
                        className="line-clamp-2"
                        style={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            lineHeight: 1.3,
                            color: 'var(--foreground)',
                            margin: 0
                        }}
                    >
                        {title}
                    </h2>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                        {anime.genres.slice(0, 2).map((g, i) => (
                            <span key={i} style={{
                                fontSize: '0.65rem',
                                opacity: 0.8,
                                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                                color: 'var(--primary)',
                                padding: '0.15rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontWeight: 500
                            }}>
                                {g}
                            </span>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>
                            {anime.format} • {anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}
                        </span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'capitalize' }}>
                            {anime.status?.toLowerCase() || ''}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
