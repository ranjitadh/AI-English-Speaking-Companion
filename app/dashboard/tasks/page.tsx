'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AudioRecorder } from '@/components/voice/AudioRecorder'
import { CheckCircle2, RotateCcw, Sparkles, Zap, Trophy, History } from 'lucide-react'
import { toast } from 'sonner'

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

export default function TasksPage() {
    const [completed, setCompleted] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const handleRecordingComplete = async (blob: Blob) => {
        setIsRecording(false)
        const loadingToast = toast.loading("Analyzing your speech...")

        // Simulate processing
        setTimeout(() => {
            setCompleted(true)
            toast.dismiss(loadingToast)
            toast.success("Analysis complete!", {
                icon: <Trophy className="w-4 h-4 text-black" />,
            })
        }, 2500)
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex-1 space-y-12 p-8 md:p-12 bg-white selection:bg-black selection:text-white"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between border-b border-gray-100 pb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Daily Practice</h2>
                    <p className="text-sm font-medium text-gray-400 italic font-serif flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Sharpen your speaking skills with today's challenge.
                    </p>
                </div>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-3">
                <motion.div variants={itemVariants} className="md:col-span-2 space-y-8">
                    <div className="p-10 border border-gray-100 rounded-[2rem] bg-white shadow-sm shadow-black/[0.02] space-y-10 relative overflow-hidden group hover:border-black transition-all duration-500">
                        <div className="flex justify-between items-start relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">"Describe Your Hometown"</h3>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] italic">Topic of the day • Level: Intermediate</p>
                            </div>
                            <div className="px-4 py-1.5 border border-dotted border-gray-200 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                60s Target
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50/50 rounded-2xl border border-gray-100 text-sm text-gray-500 leading-relaxed italic font-serif relative z-10">
                            <p className="font-bold text-gray-900 uppercase text-[10px] tracking-widest not-italic mb-4 opacity-50">The Prompt</p>
                            "Talk about where you grew up. What is it famous for? What do people do there? Would you recommend visiting?"
                        </div>

                        <AnimatePresence mode="wait">
                            {!completed ? (
                                <motion.div
                                    key="recording-zone"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center py-12 border border-dotted border-gray-200 rounded-2xl bg-gray-50/20 group-hover:bg-white transition-all duration-500"
                                >
                                    <div className="relative">
                                        {isRecording && (
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                className="absolute inset-0 bg-red-100 rounded-full -z-10"
                                            />
                                        )}
                                        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-6 italic">
                                        {isRecording ? "Recording in progress..." : "Click microphone to start"}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="feedback-zone"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8 relative z-10"
                                >
                                    <div className="p-8 bg-black text-white rounded-2xl border border-black shadow-xl shadow-black/10 flex items-start gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-white mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Excellent Work</h4>
                                            <p className="text-sm font-medium opacity-70 leading-relaxed italic font-serif">"Your pronunciation was clear. You used good vocabulary ('famous for', 'recommend'). Your pace was ideal."</p>
                                        </div>
                                    </div>

                                    <div className="p-8 border border-gray-100 rounded-2xl space-y-6">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Structural Feedback</h4>
                                        <ul className="space-y-4 text-sm font-medium text-gray-600 italic">
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                <span>"peoples" → <span className="text-black font-bold not-italic">people</span></span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                                <span>Try more transition words like "moreover".</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setCompleted(false)}
                                        className="w-full py-4 border border-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
                                    >
                                        <RotateCcw className="h-4 w-4" /> Reset Challenge
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-8">
                    <div className="flex items-center gap-3 px-1">
                        <History className="w-4 h-4 text-gray-300" />
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">History</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { title: "Favorite Movie", date: "yesterday", score: "88" },
                            { title: "Daily Routine", date: "Feb 14", score: "92" },
                            { title: "Future Goals", date: "Feb 13", score: "78" }
                        ].map((task, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 5 }}
                                className="p-5 border border-gray-50 rounded-2xl flex items-center justify-between hover:border-gray-200 transition-all cursor-default group"
                            >
                                <div>
                                    <p className="text-xs font-bold text-gray-800">{task.title}</p>
                                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">{task.date}</p>
                                </div>
                                <div className="text-xs font-bold text-gray-400 group-hover:text-black transition-colors">{task.score}%</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-8 border border-dotted border-gray-100 rounded-3xl bg-gray-50/30 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center mx-auto">
                            <Zap className="w-5 h-5 text-gray-200" />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Maintain your 5-day streak to unlock advanced topics.</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
