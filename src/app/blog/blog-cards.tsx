'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarDays, TrendingUp, Compass, BrainCircuit, Calendar } from 'lucide-react';

interface EnrichedArticle {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
}

export function BlogCards({ articles }: { articles: EnrichedArticle[] }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '1rem'
        }}>
            {articles.map((article, idx) => {
                let icon = <Compass size={40} color="var(--primary)" />;
                let gradient = 'linear-gradient(to right, var(--primary), var(--secondary))';
                let textColor = 'var(--primary)';

                if (article.category === 'Analysis') {
                    icon = <BrainCircuit size={40} color="#ec4899" />;
                    gradient = 'linear-gradient(to right, #ec4899, #f43f5e)';
                    textColor = '#ec4899';
                } else if (article.category === 'Seasonal') {
                    icon = <Calendar size={40} color="#f97316" />;
                    gradient = 'linear-gradient(to right, #f97316, #ef4444)';
                    textColor = '#f97316';
                }

                return (
                    <Link key={idx} href={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <motion.div
                            className="glass hover-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                            whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                            style={{
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ position: 'relative', height: '200px', width: '100%', flexShrink: 0, backgroundColor: '#0f172a' }}>
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    unoptimized
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    background: 'rgba(0,0,0,0.7)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    color: textColor,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    {article.category}
                                </div>
                            </div>
                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    {icon}
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
                                    <span className="text-gradient" style={{ backgroundImage: gradient }}>
                                        {article.title}
                                    </span>
                                </h2>
                                <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.6 }} className="line-clamp-3">
                                    {article.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', opacity: 0.6, fontSize: '0.875rem', color: 'var(--foreground)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <CalendarDays size={16} /> {article.date}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: textColor, fontWeight: 600, fontSize: '0.9rem' }}>
                                        Read Article <TrendingUp size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}
