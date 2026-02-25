export default function Loading() {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                    <div className="relative inline-flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-sky-500 animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-sky-500/20" />
                    </div>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
                    <span className="text-gradient">Searching the frost...</span>
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px' }}>
                    Fetching the best anime matches from the AniList database.
                </p>
            </div>
        </div>
    );
}
