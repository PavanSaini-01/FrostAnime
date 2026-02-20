import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, CalendarDays, TrendingUp } from 'lucide-react';
import Image from 'next/image';

// Example static blog data for SEO purposes
const articles = [
    {
        slug: 'top-10-hidden-gem-anime-decade',
        title: 'Top 10 Hidden Gem Anime of the Decade',
        description: 'Tired of the mainstream? Discover the most incredible anime from the last 10 years that flew completely under the radar but deserve a 10/10 rating.',
        date: 'February 21, 2026',
        readTime: '6 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-sIpBopQhjcWo.png', // Example Hunter x Hunter cover style for visual
        category: 'Recommendations'
    },
    {
        slug: 'why-overpowered-mcs-are-taking-over',
        title: 'Why Overpowered Main Characters are Taking Over is Not a Bad Thing',
        description: 'An analytical look into the psychology of Isekai and fantasy anime where the main character starts at level 100, and why we secretly love it.',
        date: 'February 15, 2026',
        readTime: '8 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx108465-BssiE5GvH22C.jpg', // Mushoku Tensei style
        category: 'Analysis'
    },
    {
        slug: 'spring-2026-anime-tier-list',
        title: 'Spring 2026 Anime Tier List: What to Watch & Drop',
        description: 'The definitive guide to the massive upcoming Spring anime season. We ranked every major release so you don\'t waste your time.',
        date: 'February 10, 2026',
        readTime: '12 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21087-ezB0QvepeH0n.jpg', // One Punch Man style
        category: 'Seasonal'
    }
];

export const metadata = {
    title: 'Frost Anime Blog | News, Reviews & Listicles',
    description: 'The best anime recommendations, seasonal guides, and analytical deep dives to fuel your weeb addiction.',
};

export default function BlogPage() {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
                {articles.map((article, idx) => (
                    <Link key={idx} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                        <div className="glass hover-card md:flex-row md:h-[250px]" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            background: 'var(--card)',
                            border: '1px solid var(--border)',
                        }}>

                            <div style={{ position: 'relative', height: '250px', width: '100%', flexShrink: 0 }} className="md:w-[350px]">
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
                                    color: 'var(--secondary)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    {article.category}
                                </div>
                            </div>

                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--foreground)', lineHeight: 1.2 }} className="line-clamp-2">
                                    {article.title}
                                </h2>

                                <p style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.6 }} className="line-clamp-3">
                                    {article.description}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: 'auto', opacity: 0.6, fontSize: '0.875rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <CalendarDays size={16} /> {article.date}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={16} /> {article.readTime}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', border: '1px dashed var(--border)', borderRadius: '1rem', opacity: 0.6 }}>
                <TrendingUp size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem' }}>More articles coming soon!</p>
                <p style={{ fontSize: '0.9rem' }}>We're busy binge-watching to bring you the best reviews.</p>
            </div>

        </div>
    );
}
