'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { login, signup, loginWithGoogle } from '@/app/actions/auth'
import { toast } from 'sonner'
import { LucideShieldCheck, LucideSparkles, Sparkles, Zap, Lock, Mail, User } from 'lucide-react'

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            if (isLogin) {
                const result = await login(formData)
                if (result?.error) {
                    toast.error(result.error)
                }
            } else {
                const result = await signup(formData)
                if (result?.error) {
                    toast.error(result.error)
                } else if (result?.success) {
                    toast.success("Account created!")
                    await login(formData)
                }
            }
        } catch (err) {
            if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
                return
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] selection:bg-[#1E1B4B] selection:text-white flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="w-full max-w-sm"
            >
                <div className="mb-14 text-center">
                    <Link href="/" className="inline-block mb-12 group relative">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            src="/SpeakMate.png"
                            alt="SpeakMate"
                            className="h-24 w-auto mx-auto mb-4"
                        />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-[#1E1B4B] mb-3">
                        {isLogin ? 'Sign in' : 'Personal Account'}
                    </h1>
                    <p className="text-sm font-medium text-[#8E867F] italic font-serif">
                        {isLogin ? 'Continuing your journey to fluency.' : 'Join the ritual of daily practice.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                key="name-field"
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                className="space-y-2 overflow-hidden"
                            >
                                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D5CDC6] ml-2">Display Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D5CDC6] group-focus-within:text-[#1E1B4B] transition-colors" />
                                    <input
                                        name="fullName"
                                        placeholder="Full name"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-[#ECE7E3] rounded-2xl text-sm focus:outline-none focus:border-[#1E1B4B] focus:bg-white transition-all font-medium text-[#1E1B4B] shadow-sm shadow-black/[0.01]"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D5CDC6] ml-2">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D5CDC6] group-focus-within:text-[#1E1B4B] transition-colors" />
                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white border border-[#ECE7E3] rounded-2xl text-sm focus:outline-none focus:border-[#1E1B4B] focus:bg-white transition-all font-medium text-[#1E1B4B] shadow-sm shadow-black/[0.01]"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D5CDC6] ml-2">Credential</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D5CDC6] group-focus-within:text-[#1E1B4B] transition-colors" />
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white border border-[#ECE7E3] rounded-2xl text-sm focus:outline-none focus:border-[#1E1B4B] focus:bg-white transition-all font-medium text-[#1E1B4B] shadow-sm shadow-black/[0.01]"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 bg-[#1E1B4B] text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-2xl hover:bg-[#161434] disabled:bg-[#F1EDE9] disabled:text-[#D5CDC6] transition-all mt-10 flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/10"
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                            />
                        ) : (isLogin ? 'Continue' : 'Create Access')}
                    </motion.button>
                </form>

                <motion.div
                    layout
                    className="mt-12 text-center pb-20"
                >
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8E867F] hover:text-[#1E1B4B] transition-colors underline underline-offset-[12px] decoration-[#ECE7E3] hover:decoration-[#1E1B4B]"
                    >
                        {isLogin ? "No account? Start here" : "Have account? Sign in"}
                    </button>

                    <div className="my-14 h-px bg-[#ECE7E3] flex items-center justify-center relative">
                        <span className="bg-[#FDFCFB] px-5 text-[9px] text-[#D5CDC6] font-bold uppercase tracking-[0.25em] italic relative z-10">Social Gateway</span>
                    </div>

                    <form action={loginWithGoogle}>
                        <motion.button
                            whileHover={{ y: -2, backgroundColor: "#FFF" }}
                            whileTap={{ y: 0 }}
                            type="submit"
                            className="w-full flex items-center justify-center gap-4 py-5 border border-[#ECE7E3] rounded-2xl text-[11px] font-bold uppercase tracking-[0.25em] text-[#8E867F] hover:text-[#1E1B4B] hover:border-[#1E1B4B] transition-all bg-white/50 shadow-sm shadow-black/[0.01]"
                        >
                            Access via Google
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}
