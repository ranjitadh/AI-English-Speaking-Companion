'use client'

import React, { useEffect, useState } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
        <div className="flex-1 flex items-center justify-center bg-white">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-8 h-8 bg-black rounded-lg"
            />
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

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 p-8 md:p-12 bg-white overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto space-y-16">
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">My Progress</h1>
                        <p className="text-sm font-medium text-gray-400 italic font-serif flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Good day, {user.name?.split(' ')[0] || 'Explorer'}. Ready to practice?
                        </p>
                    </div>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-4">
                    {[
                        { label: 'Streak', value: stats.streak, unit: 'days', icon: Zap },
                        { label: 'Spoken', value: stats.minutesSpoken, unit: 'mins', icon: Mic },
                        { label: 'Chat', value: stats.messagesSent, unit: 'msgs', icon: MessageSquare },
                        { label: 'Level', value: stats.level, unit: 'PRO', icon: TrendingUp }
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="p-6 bg-white border border-gray-100 rounded-2xl flex flex-col gap-4 shadow-sm shadow-black/5 hover:border-black transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{s.label}</span>
                                <s.icon className="w-4 h-4 text-gray-200 group-hover:text-black transition-colors" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900">
                                {s.value} <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{s.unit}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Activity Log</h3>
                        </div>
                        <div className="bg-white space-y-2">
                            {[
                                { title: "Voice Call Session", time: "10m ago", desc: "Fluent, 12 new words" },
                                { title: "Grammar Correction", time: "2h ago", desc: "Advanced usage improved" }
                            ].map((activity, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:border-black/10 hover:bg-gray-50/30 transition-all cursor-default"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800">{activity.title}</span>
                                        <span className="text-[10px] font-medium text-gray-400 italic">{activity.desc}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{activity.time}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-6 pt-1">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Jump In</h3>
                        <div className="space-y-4">
                            <Link href="/dashboard/call" className="group">
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="p-5 border border-black bg-black text-white hover:bg-gray-800 text-[11px] font-bold text-center rounded-2xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                                >
                                    <Mic className="w-4 h-4" />
                                    Start Practice Call
                                </motion.div>
                            </Link>

                            <Link href="/dashboard/chat" className="group">
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="p-5 border border-gray-100 text-gray-500 hover:text-black hover:border-black text-[11px] font-bold text-center rounded-2xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 bg-white"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Open AI Chat
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
