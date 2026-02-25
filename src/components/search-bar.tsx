"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveSearchAction } from '@/app/actions/search';
import { AniListMedia } from '@/lib/anilist';
import Image from 'next/image';
import { BookmarkButton } from '@/components/bookmark-button';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState<AniListMedia[]>([]);
    const [loading, setLoading] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0, width: 0 });

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Compute fixed position of the dropdown based on the wrapper element
    const updateDropdownPos = () => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        setDropdownPos({
            top: rect.bottom + 12, // 12px gap below the bar
            right: window.innerWidth - rect.right,
            width: Math.max(rect.width, 580), // at least 580px wide
        });
    };

    // Handle clicking outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update position on focus and window resize
    useEffect(() => {
        if (isFocused) updateDropdownPos();
        window.addEventListener('resize', updateDropdownPos);
        return () => window.removeEventListener('resize', updateDropdownPos);
    }, [isFocused]);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setLoading(true);
                const data = await liveSearchAction(query);
                setResults(data);
                setLoading(false);
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsFocused(false);
        }
    };

    const handleResultClick = (id: number) => {
        router.push(`/anime/${id}`);
        setIsFocused(false);
        setQuery('');
    };

    const showDropdown = isFocused && query.trim().length >= 2;

    return (
        <>
            <div ref={wrapperRef} className="relative hidden md:flex items-center" style={{ zIndex: 100 }}>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={false}
                    animate={{
                        width: isFocused ? '280px' : '190px',
                    }}
                    className="relative flex items-center rounded-full overflow-hidden"
                    style={{
                        background: isFocused
                            ? 'rgba(14, 165, 233, 0.08)'
                            : 'rgba(255, 255, 255, 0.04)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: isFocused ? 'var(--secondary)' : 'rgba(255,255,255,0.12)',
                        boxShadow: isFocused ? '0 0 0 3px rgba(14,165,233,0.12)' : 'none',
                        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                    }}
                >
                    {/* Search Icon */}
                    <div style={{
                        paddingLeft: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        color: isFocused ? 'var(--secondary)' : 'var(--foreground)',
                        opacity: isFocused ? 1 : 0.5,
                        transition: 'all 0.3s',
                        flexShrink: 0,
                    }}>
                        <Search size={16} />
                    </div>

                    {/* Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => { setIsFocused(true); updateDropdownPos(); }}
                        placeholder="Discover anime..."
                        autoComplete="off"
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            padding: '0.5rem 0.625rem',
                            fontSize: '0.875rem',
                            color: 'var(--foreground)',
                            minWidth: 0,
                        }}
                    />

                    {/* Clear + Submit buttons */}
                    <div style={{ paddingRight: '0.375rem', display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                        <AnimatePresence>
                            {query && (
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.7 }}
                                    onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus(); }}
                                    style={{
                                        border: 'none',
                                        background: 'rgba(255,255,255,0.08)',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: 'var(--foreground)',
                                        opacity: 0.7,
                                    }}
                                >
                                    <X size={12} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                        {query && (
                            <button
                                type="submit"
                                style={{
                                    border: 'none',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    borderRadius: '50%',
                                    width: '28px',
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'white',
                                    flexShrink: 0,
                                }}
                            >
                                <ArrowRight size={14} />
                            </button>
                        )}
                    </div>
                </motion.form>
            </div>

            {/* Fixed-position dropdown — renders outside the navbar so it never clips */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            top: dropdownPos.top,
                            right: dropdownPos.right,
                            width: dropdownPos.width,
                            zIndex: 9999,
                            borderRadius: '1.25rem',
                            overflow: 'hidden',
                            background: 'var(--card)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(24px)',
                        }}
                    >
                        {loading && results.length === 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem', gap: '0.75rem', opacity: 0.7 }}>
                                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
                                <span style={{ fontSize: '0.9rem' }}>Searching the frost...</span>
                            </div>
                        ) : results.length > 0 ? (
                            <div>
                                {/* Header */}
                                <div style={{
                                    padding: '0.875rem 1.25rem 0.625rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    opacity: 0.45,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    color: 'var(--foreground)'
                                }}>
                                    Top Matches
                                </div>

                                {/* Results list */}
                                {results.map((anime) => {
                                    const title = anime.title.english || anime.title.romaji;
                                    return (
                                        <button
                                            key={anime.id}
                                            onClick={() => handleResultClick(anime.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                width: '100%',
                                                padding: '0.875rem 1.25rem',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                                                transition: 'background 0.15s',
                                            }}
                                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                        >
                                            {/* Cover Image — taller & wider */}
                                            <div style={{
                                                position: 'relative',
                                                width: '52px',
                                                height: '72px',
                                                borderRadius: '0.5rem',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                backgroundColor: anime.coverImage.color || '#1e293b',
                                            }}>
                                                {anime.coverImage?.large && (
                                                    <Image
                                                        src={anime.coverImage.large}
                                                        alt={title}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        unoptimized
                                                    />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontWeight: 600,
                                                    fontSize: '0.95rem',
                                                    color: 'var(--foreground)',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    marginBottom: '0.2rem',
                                                }}>
                                                    {title}
                                                </div>
                                                {anime.title.english && anime.title.romaji && (
                                                    <div style={{ fontSize: '0.75rem', opacity: 0.55, marginBottom: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--foreground)' }}>
                                                        {anime.title.romaji}
                                                    </div>
                                                )}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                    <span style={{
                                                        fontSize: '0.65rem',
                                                        fontWeight: 600,
                                                        padding: '0.15rem 0.5rem',
                                                        borderRadius: '0.3rem',
                                                        background: 'rgba(14,165,233,0.15)',
                                                        color: 'var(--primary)',
                                                    }}>
                                                        {anime.format}
                                                    </span>
                                                    {anime.averageScore && (
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600 }}>
                                                            <Star size={11} fill="#fbbf24" /> {anime.averageScore}%
                                                        </span>
                                                    )}
                                                    <span style={{ fontSize: '0.7rem', opacity: 0.5, color: 'var(--foreground)' }}>
                                                        {anime.seasonYear || ''}
                                                    </span>
                                                    {anime.genres.length > 0 && (
                                                        <span style={{ fontSize: '0.65rem', opacity: 0.55, color: 'var(--foreground)' }}>
                                                            {anime.genres.slice(0, 2).join(' · ')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Bookmark Action */}
                                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                                <BookmarkButton
                                                    anime={anime}
                                                    style={{
                                                        padding: '0.4rem',
                                                        borderRadius: '0.5rem',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        boxShadow: 'none'
                                                    }}
                                                />
                                            </div>
                                        </button>
                                    );
                                })}

                                {/* Footer */}
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        width: '100%',
                                        padding: '0.875rem',
                                        border: 'none',
                                        background: 'rgba(14,165,233,0.05)',
                                        cursor: 'pointer',
                                        color: 'var(--secondary)',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        borderTop: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'background 0.15s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.1)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(14,165,233,0.05)')}
                                >
                                    View all results for "{query}" <ArrowRight size={15} />
                                </button>
                            </div>
                        ) : (
                            !loading && (
                                <div style={{ textAlign: 'center', padding: '2.5rem', opacity: 0.55, fontSize: '0.9rem', color: 'var(--foreground)' }}>
                                    No anime found for "{query}"
                                </div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
