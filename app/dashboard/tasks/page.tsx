"use client"

import { motion, Variants } from "framer-motion"
import { CheckCircle2, Clock, Brain, Flame, ArrowRight, Star, Target, Sparkles, BookOpen } from "lucide-react"
import { useState } from "react"

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

export default function TasksPage() {
    const [activeTab, setActiveTab] = useState('daily')

    return (
        <div className="max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ECE7E3] pb-10"
            >
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F6F2EE] text-[#1E1B4B] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Task Center
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1E1B4B]">Your structured<br />practice path.</h1>
                </div>
                <div className="mt-8 md:mt-0 flex gap-4 text-sm">
                    <button
                        onClick={() => setActiveTab('daily')}
                        className={`pb-4 px-2 border-b-2 transition-colors font-medium ${activeTab === 'daily' ? 'border-[#1E1B4B] text-[#1E1B4B]' : 'border-transparent text-[#8E867F] hover:text-[#1E1B4B]'}`}
                    >
                        Daily Objectives
                    </button>
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`pb-4 px-2 border-b-2 transition-colors font-medium ${activeTab === 'weekly' ? 'border-[#1E1B4B] text-[#1E1B4B]' : 'border-transparent text-[#8E867F] hover:text-[#1E1B4B]'}`}
                    >
                        Weekly Milestones
                    </button>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-12 md:grid-cols-3"
            >
                {/* Main Tasks List */}
                <div className="md:col-span-2 space-y-6">
                    <motion.div variants={itemVariants} className="group cursor-default relative overflow-hidden bg-[#1E1B4B] rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-950/20 isolate">
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
                                    <Target className="w-8 h-8 text-indigo-200" />
                                </div>
                                <span className="px-4 py-2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Primary</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-3">15-Minute Conversational Fluency</h3>
                                <p className="text-indigo-200 text-lg max-w-md">Engage in an unscripted dialogue focusing on natural transitions and idiom usage.</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center gap-4 text-sm text-indigo-200 font-medium">
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 15 mins</span>
                                    <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> High Focus</span>
                                </div>
                                <button className="flex items-center gap-2 px-8 py-4 bg-white text-[#1E1B4B] rounded-full font-bold hover:scale-105 transition-transform">
                                    Start Session <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Vocabulary Retention",
                                desc: "Review 10 new words from your recent sessions.",
                                time: "5 mins",
                                icon: BookOpen,
                                status: "pending"
                            },
                            {
                                title: "Pronunciation Drill",
                                desc: "Focus on minimal pairs specific to your native language.",
                                time: "10 mins",
                                icon: Mic,
                                status: "completed"
                            }
                        ].map((task, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className={`p-8 rounded-[2.5rem] border transition-all ${task.status === 'completed'
                                    ? 'bg-[#F6F2EE]/50 border-transparent'
                                    : 'bg-white border-[#ECE7E3] pb-10 shadow-sm hover:border-[#1E1B4B] hover:shadow-xl hover:-translate-y-1'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl ${task.status === 'completed' ? 'bg-[#EBE6E1] text-[#8E867F]' : 'bg-[#F6F2EE] text-[#1E1B4B]'}`}>
                                        <task.icon className="w-6 h-6" />
                                    </div>
                                    {task.status === 'completed' ? (
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    ) : (
                                        <button className="w-8 h-8 rounded-full border-2 border-[#ECE7E3] hover:border-[#1E1B4B] transition-colors" />
                                    )}
                                </div>
                                <h4 className={`text-xl font-bold mb-2 ${task.status === 'completed' ? 'text-[#8E867F] line-through' : 'text-[#1E1B4B]'}`}>{task.title}</h4>
                                <p className={`text-sm mb-6 ${task.status === 'completed' ? 'text-[#D5CDC6]' : 'text-[#8E867F]'}`}>{task.desc}</p>
                                <div className="flex items-center gap-2 text-[11px] font-bold text-[#D5CDC6] uppercase tracking-wider">
                                    <Clock className="w-3.5 h-3.5" /> {task.time}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <motion.div variants={itemVariants} className="p-10 bg-[#F6F2EE] rounded-[3rem] space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-[#8E867F] uppercase tracking-[0.2em]">Current Streak</h3>
                                <Flame className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="text-5xl font-bold text-[#1E1B4B]">4 <span className="text-xl text-[#8E867F]">days</span></div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-[#EBE6E1]">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-[#8E867F]">Daily Goal Progress</span>
                                <span className="text-[#1E1B4B]">60%</span>
                            </div>
                            <div className="h-2 w-full bg-[#EBE6E1] rounded-full overflow-hidden">
                                <div className="h-full bg-[#1E1B4B] w-[60%] rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-12 border border-dotted border-[#ECE7E3] rounded-[3rem] text-center space-y-6 bg-[#F6F2EE]/10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white border border-[#ECE7E3] rounded-full flex items-center justify-center shadow-sm">
                            <Star className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1E1B4B] mb-2">Unlock "Consistent Orator"</h4>
                            <p className="text-sm text-[#8E867F]">Complete 3 more daily objectives to earn your next badge.</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
// Placeholder for missing mic icon import
const Mic = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
