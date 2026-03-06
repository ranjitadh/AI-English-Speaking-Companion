'use client'

import { motion, Variants } from 'framer-motion'
import { BarChart, TrendingUp, Calendar, Zap, Star, Activity, ArrowUpRight, Sparkles, Target, MicIcon } from 'lucide-react'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export default function AnalyticsPage() {
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
                        <h1 className="text-4xl font-bold tracking-tight text-[#1E1B4B]">Fluency Analytics</h1>
                        <p className="text-sm font-medium text-[#8E867F] italic font-serif flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-[#1E1B4B]" />
                            "Your performance is a ritual of growth. These are your metrics."
                        </p>
                    </div>
                    <div className="flex gap-4 mt-8 md:mt-0">
                        <div className="px-6 py-3 border border-[#ECE7E3] bg-white rounded-2xl text-[10px] font-bold tracking-[0.25em] text-[#8E867F] uppercase flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#D5CDC6]" />
                            Last 30 Days
                        </div>
                        <button className="px-6 py-3 bg-[#1E1B4B] text-white rounded-2xl text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[#161434] transition-all shadow-xl shadow-indigo-900/10">
                            Generate Report
                        </button>
                    </div>
                </motion.div>

                {/* Core Metrics Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {[
                        { label: 'Fluency Confidence', value: '78%', sub: '+12% this week', icon: TrendingUp },
                        { label: 'Lexical Diversity', value: '4.2k', sub: 'Words mastered', icon: Star },
                        { label: 'Ritual Persistence', value: '14d', sub: 'Longest streak', icon: Activity }
                    ].map((m, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="p-10 bg-white border border-[#ECE7E3] rounded-[2.5rem] space-y-8 shadow-sm shadow-black/[0.02] hover:border-[#1E1B4B] transition-all group overflow-hidden relative"
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <span className="text-[10px] font-bold text-[#D5CDC6] uppercase tracking-[0.3em] group-hover:text-[#1E1B4B] transition-colors">{m.label}</span>
                                <m.icon className="w-5 h-5 text-[#EBE6E1] group-hover:text-[#1E1B4B] transition-colors" />
                            </div>
                            <div className="space-y-2 relative z-10">
                                <div className="text-5xl font-bold text-[#1E1B4B] group-hover:scale-105 transition-transform origin-left">{m.value}</div>
                                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">{m.sub}</div>
                            </div>
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Sparkles className="w-16 h-16 text-[#1E1B4B]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Performance Chart Section */}
                <motion.div variants={itemVariants} className="space-y-10">
                    <div className="flex justify-between items-center px-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D5CDC6]">Performance over time</h3>
                    </div>
                    <div className="bg-white border border-[#ECE7E3] rounded-[3rem] p-12 shadow-sm shadow-black/[0.02]">
                        <div className="h-64 flex items-end justify-between gap-6 md:gap-14">
                            {[45, 65, 35, 85, 55, 75, 95].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col gap-5 group items-center">
                                    <div className="relative w-full h-full flex items-end justify-center">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${val}%` }}
                                            transition={{ duration: 1.2, delay: i * 0.1, ease: "circOut" }}
                                            className="w-full max-w-[40px] bg-[#F6F2EE] rounded-t-2xl group-hover:bg-[#1E1B4B] transition-all shadow-sm shadow-black/[0.01] overflow-hidden"
                                        >
                                            <div className="w-full h-3 bg-[#EBE6E1] opacity-50 mb-auto" />
                                        </motion.div>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#D5CDC6] tracking-widest uppercase group-hover:text-[#1E1B4B] transition-colors">Day {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Detailed Insights */}
                <div className="grid gap-12 md:grid-cols-2">
                    <motion.div variants={itemVariants} className="space-y-8">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D5CDC6] px-4">Pronunciation Focus</h3>
                        <div className="bg-[#F6F2EE]/40 border border-[#ECE7E3] rounded-[2.5rem] p-10 space-y-10">
                            {[
                                { label: 'Vowel Clarity', score: 88 },
                                { label: 'Consonant Force', score: 72 },
                                { label: 'Rhythm / Flow', score: 65 }
                            ].map((item, i) => (
                                <div key={i} className="space-y-4 group">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                                        <span className="text-[#8E867F] group-hover:text-[#1E1B4B] transition-colors">{item.label}</span>
                                        <span className="text-[#1E1B4B] group-hover:scale-110 transition-transform origin-right">{item.score}%</span>
                                    </div>
                                    <div className="h-4 bg-white border border-[#ECE7E3] rounded-full overflow-hidden shadow-inner shadow-black/[0.01]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.score}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className="h-full bg-[#1E1B4B] rounded-full shadow-lg shadow-indigo-900/10"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D5CDC6] px-4">Current Objectives</h3>
                        <div className="bg-white border border-[#ECE7E3] rounded-[2.5rem] p-10 space-y-6 shadow-sm shadow-black/[0.02]">
                            {[
                                { label: "Master the 'Th' Sound", icon: Target, active: true },
                                { label: "Reduce Hesitation Gaps", icon: Zap, active: false },
                                { label: "Practice Daily for 20m", icon: MicIcon, active: true }
                            ].map((obj, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center gap-6 p-6 rounded-2xl border transition-all cursor-default
                            ${obj.active ? 'bg-[#FCFAF8] border-[#ECE7E3] text-[#1E1B4B]' : 'bg-transparent border-transparent text-[#D5CDC6]'}`}
                                >
                                    <div className={`p-3 rounded-xl border transition-all
                            ${obj.active ? 'bg-white border-[#ECE7E3]' : 'bg-[#F6F2EE] border-transparent'}`}>
                                        <obj.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{obj.label}</span>
                                    {obj.active && <div className="ml-auto w-1.5 h-1.5 bg-[#1E1B4B] rounded-full shadow-lg shadow-indigo-900/20" />}
                                </motion.div>
                            ))}
                        </div>
                        <div className="p-8 border border-dotted border-[#ECE7E3] rounded-[2rem] text-center italic font-serif text-[#8E867F] text-xs leading-relaxed bg-[#F6F2EE]/20">
                            "Growth is consistent. We recommend starting your daily ritual session today."
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
