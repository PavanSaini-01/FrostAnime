import { Calendar as CalendarIcon } from 'lucide-react';

export default function Loading() {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
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
                    Fetching this week&apos;s airing schedule...
                </p>
                <div className="w-10 h-10 rounded-full border-4 border-transparent border-t-sky-500 animate-spin" style={{ marginTop: '1.5rem' }} />
            </div>
        </div>
    );
}
