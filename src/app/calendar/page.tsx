import { fetchAniList, AIRING_SCHEDULE_QUERY, AiringScheduleResponse, AiringScheduleNode } from '@/lib/anilist';
import { CalendarView } from './calendar-view';

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

    return <CalendarView schedules={schedules} />;
}
