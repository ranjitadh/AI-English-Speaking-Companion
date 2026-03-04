'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, CheckCircle, Clock, Play, Flame, Sparkles, Star, Mic, Send, ArrowRight, Zap, Target } from 'lucide-react'
import { useState } from 'react'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
}

export default function TasksPage() {
    const [activeTab, setActiveTab] = useState('daily')

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 p-8 md:p-14 bg-[#FDFCFB] overflow-y-auto selection:bg-[#1E1B4B] selection:text-white"
        >
            <div className="max-w-5xl mx-auto space-y-24">
                {/* Editorial Header */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECE7E3] pb-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-[#1E1B4B]">Daily Lessons</h1>
                        <p className="text-sm font-medium text-[#8E867F] italic font-serif flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-[#1E1B4B]" />
                            "Your learning path is a ritual. We practice for clarity."
                        </p>
                    </div>
                    <div className="flex gap-4 mt-8 md:mt-0 p-1.5 bg-[#F6F2EE] rounded-2xl border border-[#ECE7E3] shadow-inner shadow-black/[0.01]">
                        {['Daily', 'Review', 'Special'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(t.toLowerCase())}
                                className={`px-8 py-3 rounded-[1.25rem] text-[10px] font-bold uppercase tracking-[0.25em] transition-all
                  ${activeTab === t.toLowerCase()
                                        ? 'bg-white text-[#1E1B4B] shadow-sm shadow-black/[0.02] border border-[#ECE7E3]'
                                        : 'text-[#D5CDC6] hover:text-[#8E867F]'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Ritual Lesson */}
                <motion.div variants={itemVariants} className="group cursor-default relative overflow-hidden bg-[#1E1B4B] rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-950/20 isolate">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="w-40 h-40 text-white" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-16 relative z-10">
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Flame className="w-3.5 h-3.5" />
                                    Active Ritual
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 italic">Lesson 04</span>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Mastering The <br /> <span className="italic font-serif underline underline-offset-8 decoration-white/10">Connected</span> Speech.</h2>
                                <p className="text-sm md:text-base font-medium text-white/60 italic font-serif max-w-lg leading-relaxed">
                                    "Focus on the transitions between words. Let them merge logically for natural fluency."
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-8 items-center pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">15 min duration</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 bg-[#D5CDC6] rounded-full opacity-30" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Intermediate core</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-24 h-24 bg-white text-[#1E1B4B] rounded-full flex items-center justify-center shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all border-4 border-white/50 ring-8 ring-white/5"
                            >
                                <Play className="w-8 h-8 fill-current ml-1.5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Grid List of Tasks */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { id: 1, title: 'Tone / Pitch', desc: 'Emotional clarity', icon: Zap, status: 'Active' },
                        { id: 2, title: 'Consonant Force', desc: 'Clarity practice', icon: Mic, status: 'Locked' },
                        { id: 3, title: 'Grammar Ritual', desc: 'Structural core', icon: BookOpen, status: 'Done' }
                    ].map((task, i) => (
                        <motion.div
                            key={task.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`p-10 rounded-[2.5rem] border transition-all cursor-default group space-y-10 relative overflow-hidden
                ${task.status === 'Locked'
                                    ? 'bg-[#F6F2EE]/40 border-transparent text-[#D5CDC6]'
                                    : 'bg-white border-[#ECE7E3] text-[#1E1B4B] hover:border-[#1E1B4B] shadow-sm shadow-black/[0.02]'}`}
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <div className={`p-4 rounded-2xl border transition-all
                   ${task.status === 'Locked' ? 'bg-[#F6F2EE]/50 border-transparent opacity-50' : 'bg-[#FCFAF8] border-[#ECE7E3] group-hover:bg-[#1E1B4B]'}`}>
                                    <task.icon className={`h-5 w-5 ${task.status === 'Locked' ? 'text-[#D5CDC6]' : 'text-[#D5CDC6] group-hover:text-white'}`} />
                                </div>
                                <div className={`text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full border
                    ${task.status === 'Locked' ? 'border-[#ECE7E3] text-[#D5CDC6]' : 'border-[#ECE7E3] text-[#1E1B4B]'}`}>
                                    {task.status}
                                </div>
                            </div>

                            <div className="space-y-3 relative z-10">
                                <h3 className="text-xl font-bold tracking-tight">{task.title}</h3>
                                <p className="text-[11px] font-medium text-[#8E867F] uppercase tracking-[0.2em] italic font-serif">"{task.desc}"</p>
                            </div>

                            <AnimatePresence>
                                {task.status === 'Active' && (
                                    <motion.div
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        className="h-1 bg-[#1E1B4B] rounded-full absolute bottom-0 left-0 right-10 origin-left shadow-lg shadow-indigo-900/10"
                                    />
                                )}
                            </AnimatePresence>

                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Sparkles className="w-16 h-16 text-[#1E1B4B]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Personalized Daily Ritual Quote */}
                <motion.div variants={itemVariants} className="p-12 border border-dotted border-[#ECE7E3] rounded-[3rem] text-center space-y-6 bg-[#F6F2EE]/10 flex flex-col items-center">
                    <Target className="w-8 h-8 text-[#D5CDC6]" />
                    <p className="text-lg md:text-xl font-medium text-[#8E867F] italic font-serif max-w-xl mx-auto leading-relaxed">
                        "Ritual is the bridge between ambition and reality. Start your connected speech practice today and notice the rhythm in your clarity."
                    </p>
                    <div className="pt-4 flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D5CDC6]">
                        <span className="flex items-center gap-3">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                            Highly Recommended
                        </span>
                        <span className="flex items-center gap-3 italic">
                            <Sparkles className="w-4 h-4" />
                            v1.2 Core Session
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
