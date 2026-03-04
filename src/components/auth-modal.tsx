"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const supabase = createClient();

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setError("");
        setSuccess("");
        setLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (isLogin) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                setSuccess("Signed in successfully!");
                setTimeout(() => { handleClose(); window.location.reload(); }, 800);
            } else {
                const { data: { user } } = await supabase.auth.getUser();

                if (user?.is_anonymous) {
                    const { error: upgradeError } = await supabase.auth.updateUser({
                        email,
                        password,
                    });
                    if (upgradeError) throw upgradeError;
                    await supabase.auth.refreshSession();
                    setSuccess("Account created! Your watchlist has been saved.");
                    setTimeout(() => { handleClose(); window.location.reload(); }, 1200);
                } else {
                    const { error: signUpError } = await supabase.auth.signUp({
                        email,
                        password,
                    });
                    if (signUpError) throw signUpError;
                    setSuccess("Account created! Check your email to confirm.");
                    setTimeout(() => { handleClose(); window.location.reload(); }, 1500);
                }
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                        }}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "420px",
                            padding: "2.5rem 2rem 2rem",
                            borderRadius: "1.5rem",
                            background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            boxShadow: "0 0 60px rgba(0, 0, 0, 0.5), 0 0 120px rgba(59, 130, 246, 0.1)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            overflow: "hidden",
                        }}
                    >
                        {/* Top glow line */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "1px",
                                background: "linear-gradient(to right, transparent, var(--primary), var(--secondary), transparent)",
                            }}
                        />

                        {/* Background glow */}
                        <div
                            style={{
                                position: "absolute",
                                top: "-120px",
                                left: "-80px",
                                width: "300px",
                                height: "300px",
                                background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
                                borderRadius: "50%",
                                pointerEvents: "none",
                            }}
                        />

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            style={{
                                position: "absolute",
                                top: "1.25rem",
                                right: "1.25rem",
                                padding: "0.5rem",
                                borderRadius: "9999px",
                                border: "none",
                                background: "rgba(255, 255, 255, 0.05)",
                                color: "rgba(255, 255, 255, 0.5)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                                zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative", zIndex: 1 }}>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    width: "3rem",
                                    height: "3rem",
                                    margin: "0 auto 1rem",
                                    borderRadius: "0.75rem",
                                    background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "1.25rem",
                                    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
                                }}
                            >
                                F
                            </motion.div>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
                                {isLogin ? "Welcome Back" : "Claim Your Watchlist"}
                            </h2>
                            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "rgba(148, 163, 184, 1)", margin: "0.5rem 0 0" }}>
                                {isLogin
                                    ? "Sign in to access your saved anime."
                                    : "Create a permanent account to save your watchlist across devices."}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
                            {/* Error message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: "0.75rem 1rem",
                                        fontSize: "0.875rem",
                                        color: "#fca5a5",
                                        background: "rgba(239, 68, 68, 0.15)",
                                        border: "1px solid rgba(239, 68, 68, 0.25)",
                                        borderRadius: "0.75rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Success message */}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: "0.75rem 1rem",
                                        fontSize: "0.875rem",
                                        color: "#6ee7b7",
                                        background: "rgba(16, 185, 129, 0.15)",
                                        border: "1px solid rgba(16, 185, 129, 0.25)",
                                        borderRadius: "0.75rem",
                                        marginBottom: "1rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <CheckCircle size={16} />
                                    {success}
                                </motion.div>
                            )}

                            {/* Email field */}
                            <div style={{ marginBottom: "1rem" }}>
                                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "rgba(203, 213, 225, 1)", marginBottom: "0.375rem", marginLeft: "0.25rem" }}>
                                    Email
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Mail
                                        size={18}
                                        style={{
                                            position: "absolute",
                                            left: "1rem",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "rgba(100, 116, 139, 1)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        style={{
                                            width: "100%",
                                            paddingLeft: "2.75rem",
                                            paddingRight: "1rem",
                                            paddingTop: "0.875rem",
                                            paddingBottom: "0.875rem",
                                            background: "rgba(15, 23, 42, 0.6)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: "0.75rem",
                                            outline: "none",
                                            color: "white",
                                            fontSize: "0.9375rem",
                                            transition: "border-color 0.2s, box-shadow 0.2s",
                                            boxSizing: "border-box",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "var(--primary)";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.15)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "rgba(203, 213, 225, 1)", marginBottom: "0.375rem", marginLeft: "0.25rem" }}>
                                    Password
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Lock
                                        size={18}
                                        style={{
                                            position: "absolute",
                                            left: "1rem",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            color: "rgba(100, 116, 139, 1)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        minLength={6}
                                        style={{
                                            width: "100%",
                                            paddingLeft: "2.75rem",
                                            paddingRight: "3rem",
                                            paddingTop: "0.875rem",
                                            paddingBottom: "0.875rem",
                                            background: "rgba(15, 23, 42, 0.6)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: "0.75rem",
                                            outline: "none",
                                            color: "white",
                                            fontSize: "0.9375rem",
                                            transition: "border-color 0.2s, box-shadow 0.2s",
                                            boxSizing: "border-box",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "var(--primary)";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.15)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        style={{
                                            position: "absolute",
                                            right: "1rem",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "rgba(100, 116, 139, 1)",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: 0,
                                            transition: "color 0.2s",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(203, 213, 225, 1)"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(100, 116, 139, 1)"; }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={loading || !!success}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                    padding: "0.875rem 1rem",
                                    borderRadius: "0.75rem",
                                    border: "none",
                                    background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                    color: "white",
                                    fontSize: "0.9375rem",
                                    fontWeight: 600,
                                    cursor: loading || success ? "not-allowed" : "pointer",
                                    opacity: loading || success ? 0.7 : 1,
                                    transition: "all 0.2s",
                                    boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading && !success) {
                                        e.currentTarget.style.transform = "scale(1.02)";
                                        e.currentTarget.style.boxShadow = "0 6px 24px rgba(59, 130, 246, 0.4)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(59, 130, 246, 0.3)";
                                }}
                                onMouseDown={(e) => {
                                    if (!loading && !success) {
                                        e.currentTarget.style.transform = "scale(0.98)";
                                    }
                                }}
                                onMouseUp={(e) => {
                                    if (!loading && !success) {
                                        e.currentTarget.style.transform = "scale(1.02)";
                                    }
                                }}
                            >
                                {loading ? (
                                    <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                                ) : success ? (
                                    <CheckCircle size={20} />
                                ) : isLogin ? (
                                    "Sign In"
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>

                        {/* Toggle login/signup */}
                        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "rgba(148, 163, 184, 1)", position: "relative", zIndex: 1 }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                    setSuccess("");
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                    padding: 0,
                                    fontSize: "0.875rem",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--primary)";
                                    e.currentTarget.style.textDecoration = "underline";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "white";
                                    e.currentTarget.style.textDecoration = "none";
                                }}
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
