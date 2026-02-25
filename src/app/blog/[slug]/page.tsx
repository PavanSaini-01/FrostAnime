import Link from 'next/link';
import { ArrowLeft, Clock, CalendarDays, Star, Tv, Hash, Calendar } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchAniList, SEARCH_ANIME_QUERY, PageResponse, AniListMedia } from '@/lib/anilist';
import { BookmarkButton } from '@/components/bookmark-button';

// All blog post data - in a real app this could come from a CMS or markdown files
type ContentParagraph = { type: 'paragraph'; text: string; };
type ContentAnime = {
    type: 'anime';
    rank?: number;
    title: string;
    description: string;
    image: string;
    genre: string;
    info: string;
    anilistId?: number;
};
type ContentBlock = ContentParagraph | ContentAnime | string;

const POSTS: Record<string, {
    title: string;
    description: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
    content: ContentBlock[];
}> = {
    'top-10-hidden-gem-anime-decade': {
        title: 'Top 10 Hidden Gem Anime of the Decade',
        description: 'Tired of the mainstream? Discover the most incredible anime from the last 10 years that flew completely under the radar but deserve a 10/10 rating.',
        date: 'February 21, 2026',
        readTime: '6 min read',
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101348-1kH5HhI2jJ4K.jpg', // Vinland Saga
        category: 'Recommendations',
        content: [
            { type: 'paragraph', text: 'Every season, hundreds of anime release and only a handful ever make it into the mainstream conversation. Demon Slayer, Attack on Titan, My Hero Academia — these are the giants. But for every giant, there are ten incredible shows that slipped through the cracks.' },
            { type: 'paragraph', text: 'Whether it was bad marketing, an unfortunate timeslot, or simply being buried by the sheer volume of releases, these ten anime deserve your full, undivided attention. We have scoured the archives of the past ten years to bring you the definitive list of masterpieces you need to watch next.' },
            { type: 'paragraph', text: 'Let\'s kick things off with our number 10 spot, a thriller that completely redefines its own genre...' },
            { type: 'paragraph', text: 'Whether it was bad marketing, an unfortunate timeslot, or simply being buried by the sheer volume of releases, these ten anime deserve your full, undivided attention.' },
            {
                type: 'anime',
                rank: 10,
                title: 'Talentless Nana',
                image: '/blog/hidden-gems.png',
                genre: 'Psychological, Thriller, Supernatural',
                info: 'Episodes: 13 | Studio: Bridge',
                anilistId: 117343,
                description: 'Starting with what appears to be a generic school battle anime, this show pulls a twist within the first two episodes that completely redefines everything. If you go in blind, prepare to have your jaw dropped.'
            },
            {
                type: 'anime',
                rank: 9,
                title: 'The Promised Neverland',
                image: '/blog/spring-tier-list.png',
                genre: 'Sci-Fi, Mystery, Psychological Thriller',
                info: 'Episodes: 12 | Studio: CloverWorks',
                anilistId: 101759,
                description: 'Yes, everyone knows about it now, but when it aired, it was criminally underseen. The psychological cat-and-mouse tension between Emma and their caretaker is some of the best thriller writing in anime history.'
            },
            { type: 'paragraph', text: 'Moving on to number 8, we have an epic that shifts gears dramatically, asking profound questions about peace.' },
            {
                type: 'anime',
                rank: 8,
                title: 'Vinland Saga',
                image: '/blog/overpowered-mc.png',
                genre: 'Action, Adventure, Drama',
                info: 'Episodes: 24 | Studio: WIT Studio',
                anilistId: 101348,
                description: 'A historical epic with genuine emotional weight. This is Game of Thrones done right — a brutal story about war, revenge, and the slow, painful discovery of what life is actually worth.'
            },
            {
                type: 'anime',
                rank: 7,
                title: 'Sonny Boy',
                image: '/blog/hidden-gems.png',
                genre: 'Mystery, Sci-Fi, Supernatural',
                info: 'Episodes: 12 | Studio: Madhouse',
                anilistId: 132126,
                description: 'Bizarre, philosophical, and unlike anything else ever made. A group of high school students are teleported to a void between dimensions. What follows is an existential meditation on purpose, identity, and freedom.'
            },
            {
                type: 'anime',
                rank: 6,
                title: 'Odd Taxi',
                image: '/blog/spring-tier-list.png',
                genre: 'Mystery, Drama',
                info: 'Episodes: 13 | Studio: OLM / P.I.C.S.',
                anilistId: 128981,
                description: 'A mystery thriller where a middle-aged walrus taxi driver gets tangled in a kidnapping case. Sounds absurd, but it is easily one of the tightest, best-plotted mystery anime ever written.'
            },
            {
                type: 'anime',
                rank: 5,
                title: 'Dorohedoro',
                image: '/blog/overpowered-mc.png',
                genre: 'Action, Comedy, Fantasy',
                info: 'Episodes: 12 | Studio: MAPPA',
                anilistId: 105228,
                description: 'Grimy, chaotic, and relentlessly fun. Set in a world where sorcerers use humans as target practice, this blend of dark comedy and ultra-violence is carried by one of the most lovable casts in anime.'
            },
            {
                type: 'anime',
                rank: 4,
                title: 'Golden Kamuy',
                image: '/blog/hidden-gems.png',
                genre: 'Action, Adventure, Historical',
                info: 'Episodes: 49 | Studio: Geno Studio',
                anilistId: 99699,
                description: 'A wild treasure hunt across Hokkaido that seamlessly blends intense survival action, indigenous Ainu culture, cooking segments, and completely unhinged comedy. There is nothing else like it.'
            },
            {
                type: 'anime',
                rank: 3,
                title: 'Mononoke',
                image: '/blog/spring-tier-list.png',
                genre: 'Avant Garde, Fantasy, Horror',
                info: 'Episodes: 12 | Studio: Toei Animation',
                anilistId: 2246,
                description: 'Not the Ghibli movie, but a stunning, avant-garde horror series about a strange medicine seller exorcising spirits. Its art style is designed to look like classical ukiyo-e paintings come to life.'
            },
            {
                type: 'anime',
                rank: 2,
                title: 'Land of the Lustrous (Houseki no Kuni)',
                image: '/blog/overpowered-mc.png',
                genre: 'Action, Drama, Fantasy',
                info: 'Episodes: 12 | Studio: Orange',
                anilistId: 98921,
                description: 'The show that proved 3D CGI in anime could be breathtaking. It is a slow-burn tragedy about immortal gemstone-people fighting moon-dwellers, and it will break your heart.'
            },
            {
                type: 'anime',
                rank: 1,
                title: 'Baccano!',
                image: '/blog/hidden-gems.png',
                genre: 'Action, Mystery, Supernatural',
                info: 'Episodes: 16 | Studio: Brain\'s Base',
                anilistId: 2251,
                description: 'A frantic, non-linear masterpiece about mobsters, immortals, and alchemists on a cross-country train ride in 1930s America. The puzzle pieces snap together in the most satisfying way possible.'
            },
            { type: 'paragraph', text: 'These shows prove that the anime industry consistently produces masterclass storytelling — you just have to know where to look. Check each one out and let us know which one surprised you the most!' }
        ]
    },
    'why-overpowered-mcs-are-taking-over': {
        title: 'Why Overpowered Main Characters are Taking Over',
        description: 'An analytical look into the psychology of Isekai and fantasy anime where the main character starts at level 100, and why we secretly love it.',
        date: 'February 15, 2026',
        readTime: '8 min read',
        image: '/blog/overpowered-mc.png',
        category: 'Analysis',
        content: [
            { type: 'paragraph', text: 'Critics call it lazy writing. Fans call it peak fiction. The debate around overpowered main characters — from [Saitama](/search?q=One%20Punch%20Man) in *One Punch Man* to [Rimuru](/search?q=That%20Time%20I%20Got%20Reincarnated%20as%20a%20Slime) in *That Time I Got Reincarnated as a Slime* — has never been more relevant.' },
            { type: 'paragraph', text: 'The "OP MC" trope is not new. But it has exploded in popularity over the last decade, particularly in the Isekai genre. And the reason why is more psychologically interesting than most people think.' },
            { type: 'paragraph', text: '**The Power Fantasy Is Real — And It Works** — After a long, exhausting day of navigating the complexities of modern life, sometimes people just want to watch someone be completely, unstoppably excellent at something. There is a genuine cathartic release in watching [Kazuma](/search?q=KonoSuba) outwit gods, or watching [Ainz Ooal Gown](/search?q=Overlord) command an army with a flick of his wrist.' },
            {
                type: 'anime',
                title: 'Solo Leveling',
                image: '/blog/overpowered-mc.png',
                genre: 'Action, Adventure, Fantasy',
                info: 'Studio: A-1 Pictures',
                anilistId: 151807,
                description: 'The ultimate modern power fantasy. We watch Sung Jin-woo go from the weakest hunter alive to a literal god of death. It works so perfectly because the progression feels earned; the system forces him to constantly break his limits before he achieves absolute supremacy.'
            },
            { type: 'paragraph', text: '**When OP MCs Are Done Right** — The best examples of this trope subvert your expectations. One Punch Man uses the joke as a vehicle to deconstruct heroism itself. Overlord uses its character\'s overwhelming power to explore themes of isolation, morality, and what it means to maintain your humanity when you are effectively a god.' },
            {
                type: 'anime',
                title: 'Mashle: Magic and Muscles',
                image: '/blog/overpowered-mc.png',
                genre: 'Comedy, Fantasy, Action',
                info: 'Studio: A-1 Pictures',
                anilistId: 155087,
                description: 'A hilarious take on the trope. Mash Burnedead explicitly has no magic in a Harry Potter-esque world where magic is everything. Instead, he just punches his way through complex magical spells by being physically overpowered, purely for the sake of his cream puffs.'
            },
            { type: 'paragraph', text: '**The Risk of Wish Fulfillment Without Substance** — Not all OP MC anime are created equal. When the character has no flaws, no genuine obstacles, and the narrative asks nothing of them emotionally, the fantasy becomes hollow. The best OP MC shows balance the power fantasy with real character depth and meaningful stakes.' },
            { type: 'paragraph', text: 'The OP MC trend is here to stay. But as with any genre trope, the difference between a masterpiece and a forgettable cash-grab comes down to execution. Pick the right show and you get an addictive, deeply satisfying story. Pick the wrong one and you get 12 episodes of a guy staring at a stat screen.' },
        ]
    },
    'spring-2026-anime-tier-list': {
        title: 'Spring 2026 Anime Tier List: What to Watch & Drop',
        description: 'The definitive guide to the massive upcoming Spring anime season. We ranked every major release so you don\'t waste your time.',
        date: 'February 10, 2026',
        readTime: '12 min read',
        image: '/blog/spring-tier-list.png',
        category: 'Seasonal',
        content: [
            { type: 'paragraph', text: 'Spring is shaping up to be one of the most stacked seasons in recent memory. With major continuations and a handful of promising originals, here is our definitive watch guide so you can plan your queue strategically.' },
            { type: 'paragraph', text: '**S-Tier: Watch Immediately** — These are the non-negotiables. If you only have time for a few shows this season, make it these. Expect exceptional animation, strong writing, and genuine emotional investment.' },
            {
                type: 'anime',
                title: 'Demon Slayer',
                image: '/blog/spring-tier-list.png',
                genre: 'Action, Supernatural, Historical',
                info: 'Studio: ufotable',
                anilistId: 101922,
                description: 'The highly anticipated culmination of the series. Expect ufotable to push the boundaries of animation even further as the final battles commence.'
            },
            { type: 'paragraph', text: '**A-Tier: Highly Recommended** — These shows will not set the world on fire, but they will consistently satisfy. Great for the two-episode test — if the pacing hooks you by then, stick with it.' },
            {
                type: 'anime',
                title: 'KonoSuba Season 4',
                image: '/blog/hidden-gems.png',
                genre: 'Comedy, Fantasy, Isekai',
                info: 'Studio: Drive',
                anilistId: 162923,
                description: 'Kazuma and the gang return for more completely unhinged shenanigans. The comedic timing remains unmatched in the genre.'
            },
            { type: 'paragraph', text: '**B-Tier: Genre Fans Only** — Solid shows that primarily appeal to fans of their specific genre. If the premise interests you, dive in. If not, skip without guilt.' },
            {
                type: 'anime',
                title: 'That Time I Got Reincarnated as a Slime Season 4',
                image: '/blog/overpowered-mc.png',
                genre: 'Action, Adventure, Fantasy',
                info: 'Studio: 8bit',
                anilistId: 156322,
                description: 'More nation-building, more meetings, and eventually huge magical battles. If you love the pacing of Slime, this is more of the good stuff.'
            },
            { type: 'paragraph', text: '**C-Tier: Approach with Caution** — These have promise but are showing early warning signs — pacing issues, weak source material adaptation, or overambitious production schedules that might cause quality drops.' },
            { type: 'paragraph', text: '**Drop Tier: Life Is Too Short** — No explanation needed. Move on.' },
            { type: 'paragraph', text: 'Remember: every tier list is subjective. The best anime you ever watch might be someone else\'s drop tier. Our recommendation? Try the first episode of anything that sounds interesting. The two-episode rule exists for a reason — sometimes shows need time to find their footing.' }
        ]
    },
    'cyberpunk-edgerunners-perfect-tragedy': {
        title: 'Cyberpunk: Edgerunners - Why 10 Episodes is All You Need',
        description: 'A deep dive into Trigger\'s neon-drenched masterpiece. Why Edgerunners succeeds where longer shows fail by embracing a tight, tragic narrative structure.',
        date: 'February 05, 2026',
        readTime: '7 min read',
        image: '/blog/hidden-gems.png',
        category: 'Analysis',
        content: [
            { type: 'paragraph', text: 'In an era where anime adaptations often stretch across dozens of episodes, padding runtime with filler arcs and extended exposition, Cyberpunk: Edgerunners drops a masterclass in narrative efficiency.' },
            { type: 'paragraph', text: 'Studio Trigger managed to compress an entire dystopian epic—complete with character arcs, world-building, and an emotionally devastating conclusion—into just 10 episodes. And it’s exactly this constraint that makes it a modern masterpiece.' },
            {
                type: 'anime',
                title: 'Cyberpunk: Edgerunners',
                image: '/blog/hidden-gems.png',
                genre: 'Action, Sci-Fi',
                info: 'Studio: Trigger',
                anilistId: 120377,
                description: 'A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner—a mercenary outlaw also known as a cyberpunk.'
            },
            { type: 'paragraph', text: '**The Velocity of Tragedy** — The brilliance of Edgerunners lies in its momentum. From the moment David Martinez installs the Sandevistan, his trajectory is locked. The pacing mirrors his descent into cyberpsychosis: it starts incredibly fast and only accelerates. There is no time to breathe, reflecting the brutal reality of Night City.' },
            { type: 'paragraph', text: 'In a 24-episode season, we might have seen David and the crew go on multiple episodic heists. While fun, it would dilute the central theme: rising fast and burning out faster. A long run implies stability, and Night City offers none.' },
            {
                type: 'anime',
                title: 'Akame ga Kill!',
                image: '/blog/spring-tier-list.png',
                genre: 'Action, Dark Fantasy',
                info: 'Studio: White Fox',
                anilistId: 20613,
                description: 'Another series famous for its "no plot armor" approach, where character deaths push the remaining cast forward in a high-stakes rebellion.'
            },
            { type: 'paragraph', text: '**Leaving You Wanting More** — The mark of a truly great story is that you mourn its end. By wrapping up decisively in 10 episodes, Edgerunners guarantees that every single frame matters. It doesn\'t overstay its welcome. It gets in, rips your heart out, and rolls the credits before you can process the neon-soaked trauma.' },
            { type: 'paragraph', text: 'It proves that sometimes, the most profound stories aren\'t the ones that span years, but the ones that flash brightly and fade out, leaving a burned-in afterimage that’s impossible to forget.' }
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

    // Fetch dynamic real data for anime blocks
    const enrichedContent = await Promise.all(post.content.map(async (block) => {
        if (typeof block === 'object' && block.type === 'anime') {
            try {
                const response = await fetchAniList<PageResponse>(SEARCH_ANIME_QUERY, { search: block.title, perPage: 1 });
                const media = response.Page.media[0];
                if (media) {
                    return {
                        ...block,
                        image: media.coverImage.extraLarge || media.coverImage.large || block.image,
                        bannerImage: media.bannerImage || null,
                        genre: media.genres?.length > 0 ? media.genres.slice(0, 3).join(', ') : block.genre,
                        info: media.episodes ? `${media.episodes} Episodes` : 'Unknown Episodes',
                        score: media.averageScore || null,
                        format: media.format || 'TV',
                        season: media.season && media.seasonYear ? `${media.season} ${media.seasonYear}` : null,
                        color: media.coverImage.color || 'var(--secondary)'
                    };
                }
            } catch (e) {
                console.error("Error fetching anime:", block.title, e);
            }
        }
        return block;
    }));

    const dynamicBanner = enrichedContent.find((b) => typeof b === 'object' && b.type === 'anime' && (b as any).bannerImage);
    const pageBannerImage = dynamicBanner ? (dynamicBanner as any).bannerImage : post.image;

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Banner */}
            <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
                <Image
                    src={pageBannerImage}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover', opacity: 0.45, filter: 'blur(2px)' }}
                    priority
                    unoptimized
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

                <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {enrichedContent.map((block, i) => {
                        if (typeof block === 'string' || block.type === 'paragraph') {
                            const text = typeof block === 'string' ? block : block.text;

                            // Simple inline markdown to HTML converter for bold and links
                            const formattedText = text
                                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--secondary); font-weight: 700;">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: var(--primary); text-decoration: underline; text-underline-offset: 4px; font-weight: 600;">$1</a>');

                            return (
                                <p
                                    key={i}
                                    style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--foreground)', opacity: 0.9 }}
                                    dangerouslySetInnerHTML={{ __html: formattedText }}
                                />
                            );
                        } else if (block.type === 'anime') {
                            const enrichedBlock = block as ContentAnime & { score?: number, format?: string, season?: string, color?: string };
                            const accentColor = enrichedBlock.color || 'var(--secondary)';
                            return (
                                <div key={i} className="glass" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    background: 'var(--card)',
                                    border: `1px solid ${accentColor}40`,
                                    boxShadow: `0 4px 20px -10px ${accentColor}30`,
                                    margin: '1rem 0'
                                }}>
                                    <div style={{ position: 'relative', height: '450px', width: '100%', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                                        <Image
                                            src={enrichedBlock.image}
                                            alt={enrichedBlock.title}
                                            fill
                                            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                                            unoptimized
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '60%',
                                            background: `linear-gradient(to top, var(--card) 0%, transparent 100%)`,
                                            zIndex: 5
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                            zIndex: 10
                                        }}>
                                            {enrichedBlock.rank !== undefined && (
                                                <div className="glass" style={{
                                                    background: 'rgba(0,0,0,0.6)',
                                                    backdropFilter: 'blur(12px)',
                                                    padding: '0.4rem 1.25rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '9999px',
                                                    color: accentColor,
                                                    fontSize: '1.5rem',
                                                    fontWeight: 900,
                                                    border: `1px solid ${accentColor}60`,
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                                }}>
                                                    #{enrichedBlock.rank}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10, marginTop: '-3rem' }}>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                                            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.2, textShadow: '0 2px 10px rgba(0,0,0,0.5)', margin: 0 }}>
                                                {enrichedBlock.title}
                                            </h3>

                                            {enrichedBlock.anilistId && (
                                                <BookmarkButton
                                                    anime={{
                                                        id: enrichedBlock.anilistId,
                                                        title: { english: enrichedBlock.title },
                                                        coverImage: { large: enrichedBlock.image, color: accentColor },
                                                        genres: enrichedBlock.genre.split(',').map(g => g.trim()),
                                                        description: enrichedBlock.description,
                                                        format: enrichedBlock.format,
                                                        averageScore: enrichedBlock.score,
                                                        season: enrichedBlock.season,
                                                    } as AniListMedia}
                                                    showText={true}
                                                    style={{
                                                        padding: '0.6rem 1.25rem',
                                                        borderRadius: '2rem',
                                                        fontSize: '0.9rem'
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                {enrichedBlock.genre.split(',').map((g, gi) => (
                                                    <span key={gi} style={{ fontSize: '0.8rem', opacity: 0.9, background: `rgba(255,255,255,0.08)`, border: `1px solid ${accentColor}30`, padding: '0.3rem 0.8rem', borderRadius: '0.5rem', color: accentColor }}>
                                                        {g.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            {enrichedBlock.score && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--foreground)' }}>
                                                    <Star size={18} color="#fbbf24" fill="#fbbf24" /> {enrichedBlock.score}%
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', opacity: 0.8, color: 'var(--foreground)' }}>
                                                <Tv size={18} /> {enrichedBlock.format}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', opacity: 0.8, color: 'var(--foreground)' }}>
                                                <Hash size={18} /> {enrichedBlock.info}
                                            </div>
                                            {enrichedBlock.season && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', opacity: 0.8, color: 'var(--foreground)' }}>
                                                    <Calendar size={18} /> <span style={{ textTransform: 'capitalize' }}>{enrichedBlock.season.toLowerCase()}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p style={{ fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.7 }}>
                                            {enrichedBlock.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                    })}
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
