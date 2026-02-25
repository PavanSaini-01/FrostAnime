import { fetchAniList, AIRING_SCHEDULE_QUERY, AiringScheduleResponse, AiringScheduleNode, AniListMedia } from '@/lib/anilist';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';

// Helper to get 3 days before today and 4 days after
function getRelativeWeekWindow() {
    const now = new Date();

    // Start: 3 days ago at 00:00:00
    const start = new Date(now);
    start.setDate(now.getDate() - 3);
    start.setHours(0, 0, 0, 0);

    // End: 4 days from now at 23:59:59
    const end = new Date(now);
    end.setDate(now.getDate() + 4);
    end.setHours(23, 59, 59, 999);

    return {
        start: Math.floor(start.getTime() / 1000),
        end: Math.floor(end.getTime() / 1000)
    };
}

export default async function CalendarPage() {
    const { start, end } = getRelativeWeekWindow();
    let schedules: AiringScheduleNode[] = [];

    try {
        let hasNextPage = true;
        let currentPage = 1;

        while (hasNextPage) {
            const data = await fetchAniList<AiringScheduleResponse>(AIRING_SCHEDULE_QUERY, {
                airingAt_greater: start,
                airingAt_lesser: end,
                page: currentPage,
                perPage: 50
            });

            schedules.push(...data.Page.airingSchedules.filter(s => !s.media.genres?.includes('Hentai')));

            hasNextPage = data.Page.pageInfo.hasNextPage;
            currentPage++;
        }
    } catch (e) {
        console.error("Failed to fetch schedule", e);
    }

    // Generate the sliding window of day names
    const generatedDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = -3; i <= 4; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dayNum = String(d.getDate()).padStart(2, '0');

        generatedDays.push({
            dateObj: d,
            id: `${y}-${m}-${dayNum}`,
            name: d.toLocaleDateString('en-US', { weekday: 'long' }),
            isToday: i === 0,
            dateString: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
    }

    // Group by exact date string to avoid weekday overlaps (e.g., two Sundays in an 8-day window)
    const groupedSchedules: Record<string, AiringScheduleNode[]> = {};

    generatedDays.forEach(day => {
        groupedSchedules[day.id] = [];
    });

    schedules.forEach(schedule => {
        const date = new Date(schedule.airingAt * 1000);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        const dateId = `${y}-${m}-${d}`;

        // Only push if the day exists in our current relative window tracking
        if (groupedSchedules[dateId]) {
            groupedSchedules[dateId].push(schedule);
        }
    });

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

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
                <div style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
                    <CalendarIcon size={48} />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient">Frost Calendar</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Track exactly when your favorite seasonal anime episodes drop this week.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {generatedDays.map(dayInfo => {
                    const daySchedules = groupedSchedules[dayInfo.id];
                    if (!daySchedules || daySchedules.length === 0) return null;

                    const isToday = dayInfo.isToday;

                    return (
                        <div key={dayInfo.name} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: `2px solid ${isToday ? 'var(--primary)' : 'var(--border)'}`, paddingBottom: '0.75rem' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: isToday ? 'var(--primary)' : 'var(--foreground)', lineHeight: 1 }}>
                                    {dayInfo.name}
                                </h2>
                                <span style={{ fontSize: '1.1rem', opacity: 0.6, fontWeight: 600, display: 'flex', alignItems: 'center', paddingTop: '0.2rem' }}>
                                    {dayInfo.dateString}
                                </span>
                                {isToday && (
                                    <span style={{ marginLeft: 'auto', background: 'var(--primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                        Today
                                    </span>
                                )}
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {daySchedules.map(schedule => {
                                    const time = new Date(schedule.airingAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    const title = schedule.media.title.english || schedule.media.title.romaji;

                                    return (
                                        <Link href={`/anime/${schedule.media.id}`} key={schedule.id} style={{ textDecoration: 'none' }}>
                                            <div className="glass hover-card" style={{
                                                display: 'flex',
                                                gap: '1rem',
                                                padding: '1rem',
                                                borderRadius: '1rem',
                                                background: 'var(--card)',
                                                border: '1px solid var(--border)',
                                                alignItems: 'center',
                                                height: '100%'
                                            }}>
                                                <div style={{ position: 'relative', width: '70px', height: '100px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, backgroundColor: schedule.media.coverImage.color || '#1e293b' }}>
                                                    {schedule.media.coverImage.large && (
                                                        <Image
                                                            src={schedule.media.coverImage.large}
                                                            alt={title}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                            unoptimized
                                                        />
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700 }}>
                                                        <Clock size={14} /> {time}
                                                    </div>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                        {title}
                                                    </h3>
                                                    <div style={{ fontSize: '0.85rem', opacity: 0.7, color: 'var(--foreground)' }}>
                                                        Episode {schedule.episode}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
