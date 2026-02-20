
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative p-2 rounded-full transition-all"
            style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                overflow: 'hidden',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--foreground)'
            }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "light" ? 0 : 180, scale: theme === "light" ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Sun size={20} color="#eab308" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ rotate: theme === "light" ? -180 : 0, scale: theme === "light" ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
            >
                <Moon size={20} color="#60a5fa" />
            </motion.div>
        </button>
    )
}
