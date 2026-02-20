
"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu } from "lucide-react"

import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)

    React.useEffect(() => {
        let lastScrollTime = 0;
        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime < 100) return; // Throttle to 100ms

            lastScrollTime = now;
            const scrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setIsScrolled(scrolled)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isScrolled])

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
                            { name: "Seasonal", href: "/seasonal" },
                            { name: "Romance", href: "/romance" },
                            { name: "Action", href: "/action" },
                            { name: "Echi", href: "/echi" },
                            { name: "Frozen", href: "/frozen" }
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
                        <ThemeToggle />
                        <button className="md:hidden p-2 rounded-full" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    )
}
