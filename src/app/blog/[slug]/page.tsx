import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// All blog post data - in a real app this could come from a CMS or markdown files
const POSTS: Record<string, {
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
    content: string[];
}> = {
    'top-10-hidden-gem-anime-decade': {
        title: 'Top 10 Hidden Gem Anime of the Decade',
        description: 'Tired of the mainstream? Discover the most incredible anime from the last 10 years that flew completely under the radar but deserve a 10/10 rating.',
        date: 'February 21, 2026',
        readTime: '6 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-sIpBopQhjcWo.png',
        category: 'Recommendations',
        content: [
            'Every season, hundreds of anime release and only a handful ever make it into the mainstream conversation. Demon Slayer, Attack on Titan, My Hero Academia — these are the giants. But for every giant, there are ten incredible shows that slipped through the cracks.',
            'Whether it was bad marketing, an unfortunate timeslot, or simply being buried by the sheer volume of releases, these ten anime deserve your full, undivided attention.',
            '**10. Talentless Nana** — Starting with what appears to be a generic school battle anime, this show pulls a twist within the first two episodes that completely redefines everything. If you go in blind, prepare to have your jaw dropped.',
            '**9. The Promised Neverland (Season 1)** — Yes, everyone knows about it now, but when it aired, it was criminally underseen. The psychological cat-and-mouse tension between Emma and their caretaker is some of the best thriller writing in anime history.',
            '**8. Vinland Saga** — A historical epic with genuine emotional weight. This is Game of Thrones done right — a brutal story about war, revenge, and the slow, painful discovery of what life is actually worth.',
            '**7. Sonny Boy** — Bizarre, philosophical, and unlike anything else ever made. A group of high school students are teleported to a void between dimensions. What follows is an existential meditation on purpose, identity, and freedom.',
            '**6. Odd Taxi** — A mystery thriller where a middle-aged walrus taxi driver gets tangled in a kidnapping case. Sounds absurd, but it is easily one of the tightest, best-plotted mystery anime ever written.',
            'These shows prove that the anime industry consistently produces masterclass storytelling — you just have to know where to look. Check each one out and let us know which one surprised you the most!',
        ]
    },
    'why-overpowered-mcs-are-taking-over': {
        title: 'Why Overpowered Main Characters are Taking Over',
        description: 'An analytical look into the psychology of Isekai and fantasy anime where the main character starts at level 100, and why we secretly love it.',
        date: 'February 15, 2026',
        readTime: '8 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx108465-BssiE5GvH22C.jpg',
        category: 'Analysis',
        content: [
            'Critics call it lazy writing. Fans call it peak fiction. The debate around overpowered main characters — from Saitama in One Punch Man to Rimuru in That Time I Got Reincarnated as a Slime — has never been more relevant.',
            'The "OP MC" trope is not new. But it has exploded in popularity over the last decade, particularly in the Isekai genre. And the reason why is more psychologically interesting than most people think.',
            '**The Power Fantasy Is Real — And It Works** — After a long, exhausting day of navigating the complexities of modern life, sometimes people just want to watch someone be completely, unstoppably excellent at something. There is a genuine cathartic release in watching Kazuma outwit gods, or watching Ainz Ooal Gown command an army with a flick of his wrist.',
            '**When OP MCs Are Done Right** — The best examples of this trope subvert your expectations. One Punch Man uses the joke as a vehicle to deconstruct heroism itself. Overlord uses its character\'s overwhelming power to explore themes of isolation, morality, and what it means to maintain your humanity when you are effectively a god.',
            '**The Risk of Wish Fulfillment Without Substance** — Not all OP MC anime are created equal. When the character has no flaws, no genuine obstacles, and the narrative asks nothing of them emotionally, the fantasy becomes hollow. The best OP MC shows balance the power fantasy with real character depth and meaningful stakes.',
            'The OP MC trend is here to stay. But as with any genre trope, the difference between a masterpiece and a forgettable cash-grab comes down to execution. Pick the right show and you get an addictive, deeply satisfying story. Pick the wrong one and you get 12 episodes of a guy staring at a stat screen.',
        ]
    },
    'spring-2026-anime-tier-list': {
        title: 'Spring 2026 Anime Tier List: What to Watch & Drop',
        description: 'The definitive guide to the massive upcoming Spring anime season. We ranked every major release so you don\'t waste your time.',
        date: 'February 10, 2026',
        readTime: '12 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21087-ezB0QvepeH0n.jpg',
        category: 'Seasonal',
        content: [
            'Spring is shaping up to be one of the most stacked seasons in recent memory. With major continuations and a handful of promising originals, here is our definitive watch guide so you can plan your queue strategically.',
            '**S-Tier: Watch Immediately** — These are the non-negotiables. If you only have time for a few shows this season, make it these. Expect exceptional animation, strong writing, and genuine emotional investment.',
            '**A-Tier: Highly Recommended** — These shows will not set the world on fire, but they will consistently satisfy. Great for the two-episode test — if the pacing hooks you by then, stick with it.',
            '**B-Tier: Genre Fans Only** — Solid shows that primarily appeal to fans of their specific genre. If the premise interests you, dive in. If not, skip without guilt.',
            '**C-Tier: Approach with Caution** — These have promise but are showing early warning signs — pacing issues, weak source material adaptation, or overambitious production schedules that might cause quality drops.',
            '**Drop Tier: Life Is Too Short** — No explanation needed. Move on.',
            'Remember: every tier list is subjective. The best anime you ever watch might be someone else\'s drop tier. Our recommendation? Try the first episode of anything that sounds interesting. The two-episode rule exists for a reason — sometimes shows need time to find their footing.',
        ]
    }
};

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: BlogPostPageProps) {
    const { slug } = await props.params;
    const post = POSTS[slug];

    if (!post) notFound();

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Banner */}
            <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.45, filter: 'blur(2px)' }}
                    unoptimized
                    priority
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--background) 0%, transparent 60%)',
                }} />
                {/* Category badge */}
                <div style={{
                    position: 'absolute',
                    top: '5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.3rem 1rem',
                    borderRadius: '9999px',
                    color: 'var(--secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {post.category}
                </div>
            </div>

            {/* Content */}
            <div style={{ position: 'relative', marginTop: '-100px', zIndex: 10, maxWidth: '760px', margin: '-100px auto 0', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

                <Link href="/blog" style={{ color: 'white', opacity: 0.75, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', fontSize: '0.9rem', width: 'fit-content' }}>
                    <ArrowLeft size={18} /> Back to Blog
                </Link>

                {/* Article header */}
                <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--foreground)' }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.6, fontSize: '0.875rem', marginBottom: '2.5rem', color: 'var(--foreground)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CalendarDays size={15} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={15} /> {post.readTime}
                    </span>
                </div>

                {/* Article body */}
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {post.content.map((paragraph, i) => (
                        <p key={i} style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--foreground)', opacity: 0.9 }}>
                            {paragraph.startsWith('**') ? (
                                <>
                                    <strong style={{ color: 'var(--secondary)', fontWeight: 700 }}>
                                        {paragraph.split('**')[1]}
                                    </strong>
                                    {paragraph.split('**')[2]}
                                </>
                            ) : paragraph}
                        </p>
                    ))}
                </div>

                {/* Back link */}
                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link href="/blog" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 2rem',
                        background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                        borderRadius: '9999px',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                    }}>
                        <ArrowLeft size={16} /> Back to all articles
                    </Link>
                </div>

            </div>
        </div>
    );
}
