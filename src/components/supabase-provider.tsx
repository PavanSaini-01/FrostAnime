"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface SupabaseContext {
    user: User | null;
    isLoading: boolean;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

// Key used to track whether this browser has ever had a real (non-anonymous) account
const HAS_REAL_ACCOUNT_KEY = "frost-has-account";

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Active session found — use it directly (this covers returning users)
                setUser(session.user);
                // If this is a real (non-anonymous) user, mark this browser
                if (!session.user.is_anonymous && session.user.email) {
                    localStorage.setItem(HAS_REAL_ACCOUNT_KEY, "true");
                }
            } else {
                // No active session found.
                // Only sign in anonymously if this browser has never had a real account.
                // If it HAS had a real account, wait — the user intentionally signed out.
                const hasRealAccount = localStorage.getItem(HAS_REAL_ACCOUNT_KEY) === "true";

                if (!hasRealAccount) {
                    const { data, error } = await supabase.auth.signInAnonymously();
                    if (error) {
                        console.error("Error signing in anonymously:", error);
                    } else if (data?.user) {
                        setUser(data.user);
                    }
                }
                // else: user had an account and logged out — stay logged out
            }
            setIsLoading(false);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null);
                // Keep the flag updated when auth state changes
                if (session?.user && !session.user.is_anonymous && session.user.email) {
                    localStorage.setItem(HAS_REAL_ACCOUNT_KEY, "true");
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Context.Provider value={{ user, isLoading }}>
            {children}
        </Context.Provider>
    );
}

export const useUser = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useUser must be used inside SupabaseProvider");
    }
    return context;
};
