"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface SupabaseContext {
    user: User | null;
    isLoading: boolean;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                setUser(session.user);
            } else {
                // No session found, sign in anonymously to allow watchlist usage
                const { data, error } = await supabase.auth.signInAnonymously();
                if (error) {
                    console.error("Error signing in anonymously:", error);
                } else if (data?.user) {
                    setUser(data.user);
                }
            }
            setIsLoading(false);
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null);
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
