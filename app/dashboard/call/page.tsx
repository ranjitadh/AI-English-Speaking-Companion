'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function VoiceCallPage() {
    const [isCalling, setIsCalling] = useState(false)
    const [micActive, setMicActive] = useState(true)
    const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle')
    const [transcript, setTranscript] = useState("Press 'Start Call' to begin speaking with your AI friend.")

    // Timer
    const [seconds, setSeconds] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isCalling) {
            timerRef.current = setInterval(() => {
                setSeconds(s => s + 1)
            }, 1000)
        } else {
            if (timerRef.current) clearInterval(timerRef.current)
            setSeconds(0)
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isCalling])

    const formatTime = (totalSeconds: number) => {
        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    const handleStartCall = () => {
        setIsCalling(true)
        setStatus('listening')
        setTranscript("Listening...")
        // In a real app, this would initialize WebRTC/Voice Service
    }

    const handleEndCall = () => {
        setIsCalling(false)
        setStatus('idle')
        setTranscript("Call ended.")
    }

    const toggleMic = () => {
        setMicActive(!micActive)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center p-4 bg-slate-950 text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900/20 pointer-events-none" />

            <div className="z-10 flex flex-col items-center space-y-8 max-w-md w-full text-center">

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">AI English Companion</h2>
                    <p className="text-slate-400">{isCalling ? formatTime(seconds) : 'Ready to talk?'}</p>
                </div>

                {/* Visualizer / Avatar */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    {/* Ripples when speaking */}
                    <AnimatePresence>
                        {status === 'speaking' && (
                            <>
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-full border border-purple-500/30"
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                    />
                                ))}
                            </>
                        )}
                        {status === 'listening' && (
                            <>
                                {[1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-full border border-blue-500/30"
                                        initial={{ scale: 1, opacity: 0.8 }}
                                        animate={{ scale: 1.1, opacity: 0.5 }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.2 }}
                                    />
                                ))}
                            </>
                        )}
                    </AnimatePresence>

                    <div className={cn(
                        "w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/20 transition-all duration-500",
                        status === 'speaking' ? "scale-105 shadow-purple-500/40" : "scale-100"
                    )}>
                        <div className="w-40 h-40 rounded-full bg-slate-900/20 backdrop-blur-sm flex items-center justify-center">
                            <Volume2 className={cn("w-16 h-16 text-white transition-opacity", status === 'speaking' ? "opacity-100" : "opacity-50")} />
                        </div>
                    </div>
                </div>

                {/* Transcript / Status Text */}
                <div className="h-16 flex items-center justify-center px-6 py-2 rounded-2xl bg-white/5 backdrop-blur-md">
                    <p className="text-sm font-medium text-slate-200 animate-pulse">
                        {status === 'processing' ? 'Thinking...' : transcript}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    {!isCalling ? (
                        <Button
                            size="lg"
                            className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20"
                            onClick={handleStartCall}
                        >
                            <Phone className="h-8 w-8" />
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-12 w-12 rounded-full bg-slate-800 hover:bg-slate-700 text-white border-none"
                                onClick={toggleMic}
                            >
                                {micActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-400" />}
                            </Button>

                            <Button
                                size="lg"
                                className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
                                onClick={handleEndCall}
                            >
                                <PhoneOff className="h-8 w-8" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
