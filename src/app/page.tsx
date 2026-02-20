
"use client"

import { motion } from "framer-motion"
import { Play, ArrowRight, Calendar, Heart, Flame, Sparkles, Snowflake } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
      {/* Hero Section */}
      <section
        className="glass rounded-3xl"
        style={{
          position: 'relative',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          padding: '3rem',
          height: 'auto',
          overflow: 'visible'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top right, rgba(14, 165, 233, 0.1), transparent, rgba(139, 92, 246, 0.1))', // Reduced opacity
          zIndex: 0,
          borderRadius: '1.5rem', // Match parent
        }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Card 1: Recommendations */}
          <Link href="/recommendations" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              className="glass hover-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <Play size={48} className="text-primary" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                <span className="text-gradient">No Cringe OP MC</span>
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Tired of wimpy protagonists? Discover 15 anime with overpowered main characters.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                <span>View Recommendations</span> <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Seasonal */}
          <Link href="/seasonal" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              className="glass hover-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <Calendar size={48} className="text-secondary" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, var(--secondary), var(--accent))' }}>Seasonal Guide</span>
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Winter 2026 airings, upcoming Spring hits, and industry rumors.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 600 }}>
                <span>View Seasonal Guide</span> <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>

          {/* Card 3: Romance */}
          <Link href="/romance" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              className="glass hover-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <Heart size={48} color="#ec4899" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #ec4899, #f43f5e)' }}>Melting Romance</span>
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Enemies to lovers, tear-jerker endings, and pure wholesome vibes.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899', fontWeight: 600 }}>
                <span>View Romance List</span> <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>

          {/* Card 4: Action */}
          <Link href="/action" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              className="glass hover-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <Flame size={48} color="#f97316" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #f97316, #ef4444)' }}>Blazing Action</span>
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Overpowered MCs, zero hesitation, pure domination.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f97316', fontWeight: 600 }}>
                <span>View Action List</span> <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>

          {/* Card 5: Echi */}
          <Link href="/echi" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              className="glass hover-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <Sparkles size={48} color="#db2777" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #db2777, #9333ea)' }}>Plot & Passion</span>
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Top tier fan service meets surprisingly good story.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#db2777', fontWeight: 600 }}>
                <span>View List</span> <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>

          {/* Card 6: Frozen */}
          <Link href="/frozen" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div
              className="glass hover-card"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <Snowflake size={48} color="#94a3b8" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #94a3b8, #cbd5e1)' }}>Frozen in Time</span>
              </h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                Atmospheric masterpieces for a quiet night.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontWeight: 600 }}>
                <span>View Classics</span> <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>


        </div>
      </section>


    </div>
  )
}
