"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, Search, User, LogOut } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { usePathname } from "next/navigation"

import { useUser } from "@/components/supabase-provider"
import { createClient } from "@/lib/supabase/client"
import { AuthModal } from "@/components/auth-modal"



export function Navbar() {
    const { user, isLoading } = useUser()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [showProfileMenu, setShowProfileMenu] = React.useState(false)
    const [showAuthModal, setShowAuthModal] = React.useState(false)
    const profileMenuRef = React.useRef<HTMLDivElement>(null)
    const supabase = createClient()

    // Close profile dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
                setShowProfileMenu(false)
            }
        }
        if (showProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showProfileMenu])

    // Reset scroll state on every route change, then re-sync immediately
    React.useEffect(() => {
        setIsScrolled(window.scrollY > 20)
    }, [])

    React.useEffect(() => {
        let lastScrollTime = 0;
        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime < 100) return;
            lastScrollTime = now;
            setIsScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isAnonymous = !user || user.is_anonymous || !user.email;

    return (
        <motion.header
            style={{
                paddingTop: isScrolled ? '1rem' : '1.5rem',
                paddingBottom: isScrolled ? '1rem' : '1.5rem',
            }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                <div
                    className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${isScrolled ? "glass" : ""}`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '0.5rem',
                                background: 'linear-gradient(to top right, var(--primary), var(--secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            F
                        </motion.div>
                        <span className="text-xl font-bold text-gradient">
                            FrostAnime
                        </span>
                    </Link>



                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <SearchBar />
                        <ThemeToggle />

                        {/* Auth Section */}
                        {isLoading ? (
                            <div className="animate-pulse" style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: 'var(--border)' }} />
                        ) : !isAnonymous ? (
                            <div className="relative" ref={profileMenuRef}>
                                {/* Profile Dropdown Trigger */}
                                <button
                                    onClick={() => setShowProfileMenu(prev => !prev)}
                                    style={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        borderRadius: '9999px',
                                        border: '2px solid var(--border)',
                                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        transition: 'border-color 0.3s, transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <span style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
                                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            transition={{ duration: 0.15 }}
                                            className="glass"
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                marginTop: '0.5rem',
                                                width: '16rem',
                                                borderRadius: '0.75rem',
                                                overflow: 'hidden',
                                                border: '1px solid var(--border)',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                                            }}
                                        >
                                            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                                                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>My Account</p>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--foreground)', opacity: 0.6, margin: '0.25rem 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
                                            </div>
                                            <div style={{ padding: '0.5rem' }}>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            localStorage.removeItem('frost-watchlist');
                                                            await supabase.auth.signOut();
                                                            window.location.reload();
                                                        } catch (e) {
                                                            window.location.reload();
                                                        }
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        padding: '0.5rem 0.75rem',
                                                        fontSize: '0.875rem',
                                                        color: '#ef4444',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        borderRadius: '0.5rem',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    <LogOut size={16} />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    borderRadius: '9999px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
                                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                            >
                                Sign In
                            </button>
                        )}

                        <button className="md:hidden p-2 rounded-full" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </motion.header>
    )
}
