
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, Search, User, LogOut } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { useSession, signIn, signOut } from "next-auth/react"

import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)
    const [showProfileMenu, setShowProfileMenu] = React.useState(false)

    // Reset scroll state on every route change, then re-sync immediately
    React.useEffect(() => {
        setIsScrolled(window.scrollY > 20)
    }, [pathname])

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

                    {/* Desktop Nav */}
                    <nav
                        className="hidden md:flex items-center gap-2 px-2 py-1.5 rounded-full border backdrop-blur-md"
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: 'var(--border)',
                        }}
                    >
                        {[
                            { name: "Home", href: "/" },
                            { name: "Calendar", href: "/calendar" },
                            { name: "Roulette", href: "/roulette" },
                            { name: "Watchlist", href: "/watchlist" },
                            { name: "Seasonal", href: "/seasonal" },
                            { name: "Blog", href: "/blog" }
                        ].map((item) => {
                            const isActive = pathname === item.href;
                            const isHovered = hoveredPath === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                                    onMouseEnter={() => setHoveredPath(item.href)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    style={{
                                        color: isActive ? 'white' : 'var(--foreground)',
                                        opacity: isActive ? 1 : (isHovered ? 0.9 : 0.7),
                                        textDecoration: 'none',
                                    }}
                                >
                                    {isHovered && !isActive && (
                                        <motion.div
                                            layoutId="navbar-hover"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                backgroundColor: 'var(--border)',
                                                opacity: 0.5,
                                                zIndex: -1
                                            }}
                                            transition={{ type: "tween", duration: 0.2 }}
                                        />
                                    )}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                backgroundColor: 'var(--secondary)',
                                                zIndex: -1
                                            }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span style={{ position: 'relative', zIndex: 10 }}>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <SearchBar />
                        <ThemeToggle />

                        {/* Auth Section */}
                        {status === "loading" ? (
                            <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
                        ) : session ? (
                            <div className="relative">
                                {/* Profile Dropdown Trigger */}
                                <button
                                    onClick={() => setShowProfileMenu(prev => !prev)}
                                    className="p-1 rounded-full border border-border bg-card/50 hover:bg-card transition-colors flex items-center justify-center overflow-hidden"
                                    style={{ width: '2.5rem', height: '2.5rem' }}
                                >
                                    {session.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="Profile"
                                            width={32} height={32}
                                            className="rounded-full w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={20} className="text-muted-foreground" />
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 glass border border-border rounded-xl shadow-2xl overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-border">
                                                <p className="font-semibold text-sm truncate">{session.user?.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <button
                                                    onClick={() => signOut()}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
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
                                onClick={() => signIn("google")}
                                className="px-5 py-2 text-sm font-semibold rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform"
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
        </motion.header>
    )
}
