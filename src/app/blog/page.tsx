import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp } from 'lucide-react';
import { BlogCards } from './blog-cards';

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
        description: "The definitive guide to the massive upcoming Spring anime season. We ranked every major release so you don't waste your time.",
        date: 'February 10, 2026',
        readTime: '12 min read',
        searchQuery: 'Demon Slayer',
        category: 'Seasonal'
    },
    {
        slug: 'cyberpunk-edgerunners-perfect-tragedy',
        title: 'Cyberpunk: Edgerunners - Why 10 Episodes is All You Need',
        description: "A deep dive into Trigger's neon-drenched masterpiece. Why Edgerunners succeeds where longer shows fail by embracing a tight, tragic narrative structure.",
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

export default function BlogIndex() {
    const enrichedArticles = articles.map(art => {
        let fallbackImage = '/blog/spring-tier-list.png';
        if (art.slug === 'top-10-hidden-gem-anime-decade') fallbackImage = '/blog/hidden-gems.png';
        if (art.slug === 'why-overpowered-mcs-are-taking-over') fallbackImage = '/blog/overpowered-mc.png';
        if (art.slug === 'cyberpunk-edgerunners-perfect-tragedy') fallbackImage = '/blog/cyberpunk-edgerunners.png';

        return { ...art, image: fallbackImage };
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

                <BlogCards articles={enrichedArticles as any} />
            </section>

            <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', border: '1px dashed var(--border)', borderRadius: '1rem', opacity: 0.6 }}>
                <TrendingUp size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem' }}>More articles coming soon!</p>
                <p style={{ fontSize: '0.9rem' }}>We're busy binge-watching to bring you the best reviews.</p>
            </div>

        </div>
    );
}
