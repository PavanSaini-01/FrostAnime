import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, CalendarDays, TrendingUp, Compass, BrainCircuit, Calendar } from 'lucide-react';
import Image from 'next/image';
import { SEARCH_ANIME_QUERY, PageResponse } from '@/lib/anilist';

interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    searchQuery: string;
    category: string;
    image?: string;
}

// Example static blog data for SEO purposes
const articles: ArticleMeta[] = [
    {
        slug: 'top-10-hidden-gem-anime-decade',
        title: 'Top 10 Hidden Gem Anime of the Decade',
        description: 'Tired of the mainstream? Discover the most incredible anime from the last 10 years that flew completely under the radar but deserve a 10/10 rating.',
        date: 'February 21, 2026',
        readTime: '6 min read',
        searchQuery: 'Vinland Saga',
        category: 'Recommendations'
    },
    {
        slug: 'why-overpowered-mcs-are-taking-over',
        title: 'Why Overpowered Main Characters are Taking Over is Not a Bad Thing',
        description: 'An analytical look into the psychology of Isekai and fantasy anime where the main character starts at level 100, and why we secretly love it.',
        date: 'February 15, 2026',
        readTime: '8 min read',
        searchQuery: 'Mushoku Tensei',
        category: 'Analysis'
    },
    {
        slug: 'spring-2026-anime-tier-list',
        title: 'Spring 2026 Anime Tier List: What to Watch & Drop',
        description: 'The definitive guide to the massive upcoming Spring anime season. We ranked every major release so you don\'t waste your time.',
        date: 'February 10, 2026',
        readTime: '12 min read',
        searchQuery: 'Demon Slayer',
        category: 'Seasonal'
    },
    {
        slug: 'cyberpunk-edgerunners-perfect-tragedy',
        title: 'Cyberpunk: Edgerunners - Why 10 Episodes is All You Need',
        description: 'A deep dive into Trigger\'s neon-drenched masterpiece. Why Edgerunners succeeds where longer shows fail by embracing a tight, tragic narrative structure.',
        date: 'February 05, 2026',
        readTime: '7 min read',
        searchQuery: 'Cyberpunk Edgerunners',
        category: 'Analysis'
    }
];

export const metadata = {
    title: 'Frost Anime Blog | News, Reviews & Listicles',
    description: 'The best anime recommendations, seasonal guides, and analytical deep dives to fuel your weeb addiction.',
};

export default async function BlogIndex() {

    // Directly use the articles containing our local fallback generic images
    const enrichedArticles = articles.map(art => {
        let fallbackImage = '/blog/spring-tier-list.png';
        if (art.slug === 'top-10-hidden-gem-anime-decade') fallbackImage = '/blog/hidden-gems.png';
        if (art.slug === 'why-overpowered-mcs-are-taking-over') fallbackImage = '/blog/overpowered-mc.png';
        if (art.slug === 'cyberpunk-edgerunners-perfect-tragedy') fallbackImage = '/blog/hidden-gems.png'; // Reuses the cityscape generic art

        return {
            ...art,
            image: fallbackImage
        };
    });

    return (
        <div className="container" style={{ minHeight: '100vh', padding: '6rem 2rem 4rem', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link href="/" style={{ color: 'var(--foreground)', opacity: 0.7, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
            </div>

            <div className="glass" style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.03)'
            }}>
                <div style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>
                    <BookOpen size={48} />
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, var(--secondary), var(--accent))' }}>
                        Feature Articles
                    </span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Deep dives, tier lists, and recommendations from our resident otakus.
                </p>
            </div>

            <section
                className="glass rounded-3xl"
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '3rem',
                    height: 'auto',
                    overflow: 'visible',
                    marginTop: '1rem'
                }}
            >
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top right, rgba(14, 165, 233, 0.1), transparent, rgba(139, 92, 246, 0.1))',
                    zIndex: 0,
                    borderRadius: '1.5rem',
                }} />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '1rem'
                }}>
                    {enrichedArticles.map((article, idx) => {
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
                                <div className="glass hover-card group" style={{
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    background: 'var(--card)',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    position: 'relative',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer'
                                }}>
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
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', border: '1px dashed var(--border)', borderRadius: '1rem', opacity: 0.6 }}>
                <TrendingUp size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem' }}>More articles coming soon!</p>
                <p style={{ fontSize: '0.9rem' }}>We're busy binge-watching to bring you the best reviews.</p>
            </div>

        </div>
    );
}
