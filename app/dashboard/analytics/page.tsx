'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Activity, Sparkles, Zap, Mic } from 'lucide-react'

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

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function AnalyticsPage() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 space-y-12 p-8 md:p-12 bg-white selection:bg-black selection:text-white"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-gray-100 pb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">My Growth</h2>
                    <p className="text-sm font-medium text-gray-400 italic font-serif flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Analyzing 12 practice sessions from this week.
                    </p>
                </div>
            </motion.div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                <motion.div variants={itemVariants} className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm shadow-black/[0.02] space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Vocabulary</span>
                        <Zap className="h-4 w-4 text-gray-200" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">+150 words</div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-1 italic">Last 30 days</p>
                    </div>
                    <div className="h-[100px] flex items-end justify-between gap-2 px-2 pt-4">
                        {[30, 45, 60, 50, 70, 90, 85].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                                className="w-full bg-black rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm shadow-black/[0.02] space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Fluency Index</span>
                        <Activity className="h-4 w-4 text-gray-200" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">78% <span className="text-xs font-normal text-gray-400">Stable</span></div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-1 italic">+5.2 points increase</p>
                    </div>
                    <div className="pt-6">
                        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "78%" }}
                                transition={{ duration: 1.2, ease: "circOut", delay: 1 }}
                                className="h-full bg-black"
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 border border-gray-100 rounded-3xl bg-white shadow-sm shadow-black/[0.02] space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Pronunciation</span>
                        <Mic className="h-4 w-4 text-gray-200" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-900">B2 <span className="text-xs font-normal text-gray-400">Upper</span></div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-1 italic">Based on latest call</p>
                    </div>
                    <div className="pt-8 flex justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="w-16 h-16 rounded-full border border-dotted border-gray-200 flex items-center justify-center p-2"
                        >
                            <Sparkles className="w-6 h-6 text-gray-100" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                variants={itemVariants}
                className="p-12 border border-gray-100 rounded-[2.5rem] bg-gray-50/20 text-center"
            >
                <p className="text-sm font-medium text-gray-400 italic font-serif">"You speak 15% clearer than last month. Keep the consistency up."</p>
            </motion.div>
        </motion.div>
    )
}
