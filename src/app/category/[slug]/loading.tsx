export default function Loading() {
    return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-sky-500 animate-spin" />
            <p style={{ fontSize: '1.1rem', opacity: 0.7, fontWeight: 600 }}>Loading category...</p>
        </div>
    );
}
