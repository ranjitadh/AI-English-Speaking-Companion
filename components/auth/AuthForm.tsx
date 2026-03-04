'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { login, signup, loginWithGoogle } from '@/app/actions/auth'
import { toast } from 'sonner'
import { LucideShieldCheck, LucideSparkles } from 'lucide-react'

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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xs mx-auto pt-32 px-4"
        >
            <div className="mb-14 text-center">
                <Link href="/" className="inline-block mb-10 group relative">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        src="/SpeakMate.png"
                        alt="SpeakMate"
                        className="h-16 w-auto mx-auto"
                    />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                    {isLogin ? 'Sign in' : 'Create account'}
                </h1>
                <p className="text-xs font-medium text-gray-400 italic">
                    {isLogin ? 'Start your daily session.' : 'Join the community of speakers.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                    {!isLogin && (
                        <motion.div
                            key="name-field"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1 overflow-hidden"
                        >
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-300 ml-1">Name</label>
                            <input
                                name="fullName"
                                placeholder="Full name"
                                required
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition-all font-medium"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-300 ml-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        required
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition-all font-medium"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-300 ml-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition-all font-medium"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all mt-8 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                        />
                    ) : (isLogin ? 'Continue' : 'Create account')}
                </motion.button>
            </form>

            <motion.div
                layout
                className="mt-10 text-center pb-12"
            >
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-8 decoration-gray-100"
                >
                    {isLogin ? "No account? Register" : "Have account? Login"}
                </button>

                <div className="my-10 h-px bg-gray-50 flex items-center justify-center relative">
                    <span className="bg-white px-4 text-[9px] text-gray-300 font-bold uppercase tracking-widest italic relative z-10">Social access</span>
                </div>

                <form action={loginWithGoogle}>
                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-xl text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black hover:border-black transition-all"
                    >
                        Continue with Google
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    )
}
