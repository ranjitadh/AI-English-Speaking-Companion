'use client'

import React, { useEffect, useState } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { MessageSquare, Mic, BookOpen, Clock, ArrowUpRight, TrendingUp, Zap, Sparkles } from 'lucide-react'
import { getSession } from 'next-auth/react'

async function getUserStats(userId: string) {
    return {
        streak: 5,
        minutesSpoken: 45,
        messagesSent: 128,
        level: 2,
        xp: 350
    }
}

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const session = await getSession()
            if (!session?.user) {
                window.location.href = '/login'
                return
            }
            setUser(session.user)
            const s = await getUserStats(session.user.id!)
            setStats(s)
            setLoading(false)
        }
        load()
    }, [])

    if (loading) return (
        <div className="flex-1 flex items-center justify-center bg-[#FDFCFB]">
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-10 h-10 bg-[#1E1B4B] rounded-2xl shadow-xl shadow-black/10 flex items-center justify-center"
            >
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            </motion.div>
        </div>
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 p-8 md:p-14 bg-[#FDFCFB] overflow-y-auto selection:bg-[#1E1B4B] selection:text-white"
        >
            <div className="max-w-5xl mx-auto space-y-20">
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECE7E3] pb-10">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-[#1E1B4B] mb-3">Daily Progress</h1>
                        <p className="text-sm font-medium text-[#8E867F] italic font-serif flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#D5CDC6]" />
                            "Morning, {user.name?.split(' ')[0] || 'Friend'}. Your fluency is growing."
                        </p>
                    </div>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-4">
                    {[
                        { label: 'Longest Streak', value: stats.streak, unit: 'days', icon: Zap },
                        { label: 'Time Spoken', value: stats.minutesSpoken, unit: 'mins', icon: Mic },
                        { label: 'Total Chat', value: stats.messagesSent, unit: 'msgs', icon: MessageSquare },
                        { label: 'Fluency Level', value: stats.level, unit: 'pro', icon: TrendingUp }
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="p-8 bg-white border border-[#ECE7E3] rounded-[2rem] flex flex-col gap-6 shadow-sm shadow-black/[0.03] hover:border-[#1E1B4B] transition-all group relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <span className="text-[10px] font-bold text-[#D5CDC6] uppercase tracking-[0.25em]">{s.label}</span>
                                <s.icon className="w-5 h-5 text-[#EBE6E1] group-hover:text-[#1E1B4B] transition-colors" />
                            </div>
                            <div className="text-4xl font-bold text-[#1E1B4B] group-hover:scale-105 transition-transform origin-left relative z-10">
                                {s.value} <span className="text-[10px] font-bold text-[#D5CDC6] uppercase tracking-widest pl-1">{s.unit}</span>
                            </div>
                            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Sparkles className="w-12 h-12 text-[#1E1B4B]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-5 items-start">
                    <motion.div variants={itemVariants} className="space-y-8 lg:col-span-3">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D5CDC6]">Activity Log</h3>
                        </div>
                        <div className="bg-white space-y-3 rounded-[2rem] border border-[#ECE7E3] p-6 shadow-sm shadow-black/[0.02]">
                            {[
                                { title: "Voice Call Session", time: "10m ago", desc: "Practiced 12 words", score: "+45 xp" },
                                { title: "Grammar Correction", time: "2h ago", desc: "Meso-scale patterns", score: "+22 xp" },
                                { title: "Vocabulary Drill", time: "Yesterday", desc: "Advanced lexicon", score: "+110 xp" }
                            ].map((activity, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between p-5 border border-transparent border-b-[#F6F2EE] hover:border-[#ECE7E3] hover:bg-[#FCFAF8] rounded-2xl transition-all cursor-default group last:border-0"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-[#1E1B4B]">{activity.title}</span>
                                        <span className="text-[10px] font-medium text-[#8E867F] italic">{activity.desc}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] text-[#D5CDC6] font-bold uppercase tracking-widest">{activity.time}</span>
                                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">{activity.score}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8 lg:col-span-2 pt-1">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D5CDC6]">Quick Access</h3>
                        <div className="space-y-5">
                            <Link href="/dashboard/call" className="group">
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-6 bg-[#1E1B4B] text-white hover:bg-[#161434] text-[11px] font-bold text-center rounded-[1.5rem] transition-all uppercase tracking-[0.25em] flex items-center justify-center gap-4 shadow-xl shadow-indigo-900/10"
                                >
                                    <Mic className="w-5 h-5" />
                                    Launch Call
                                </motion.div>
                            </Link>

                            <Link href="/dashboard/chat" className="group">
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-6 border border-[#ECE7E3] text-[#1E1B4B] hover:text-black hover:border-black text-[11px] font-bold text-center rounded-[1.5rem] transition-all uppercase tracking-[0.25em] flex items-center justify-center gap-4 bg-white shadow-sm shadow-black/[0.02]"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Text Session
                                </motion.div>
                            </Link>
                        </div>

                        <div className="p-8 border border-dotted border-[#ECE7E3] rounded-[2rem] bg-[#F6F2EE]/40 text-center space-y-4">
                            <Clock className="w-6 h-6 text-[#D5CDC6] mx-auto" />
                            <p className="text-[10px] font-bold text-[#8E867F] uppercase tracking-[0.25em] italic leading-relaxed">Next session recommended tomorrow morning.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
