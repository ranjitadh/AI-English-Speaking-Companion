'use client'

import { useChat } from '@ai-sdk/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Bot, Sparkles, Mic, MessageCircle, MoreHorizontal, ArrowLeft } from 'lucide-react'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

export default function ChatInterface() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
    })

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="flex flex-col h-full bg-[#FDFCFB] selection:bg-[#1E1B4B] selection:text-white">
            {/* Editorial Header */}
            <header className="px-8 py-8 border-b border-[#ECE7E3] bg-[#FDFCFB]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="p-3 bg-white border border-[#ECE7E3] text-[#D5CDC6] hover:text-[#1E1B4B] hover:border-[#1E1B4B] rounded-2xl transition-all shadow-sm shadow-black/[0.01]">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#1E1B4B] flex items-center gap-3">
                            AI Chat
                            <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/20" />
                        </h1>
                        <p className="text-[10px] font-bold text-[#8E867F] uppercase tracking-[0.25em] italic font-serif">"Active ritual session. Focused practice."</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 border border-[#ECE7E3] bg-[#F6F2EE]/50 rounded-full text-[9px] font-bold text-[#8E867F] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#1E1B4B]" />
                        v1.2 Beta Core
                    </div>
                    <button className="p-3 text-[#D5CDC6] hover:text-[#1E1B4B] transition-colors rounded-2xl bg-white border border-[#ECE7E3] shadow-sm shadow-black/[0.01]">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-6 py-12 md:px-14">
                <div className="max-w-3xl mx-auto space-y-12">
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 space-y-8"
                        >
                            <div className="w-16 h-16 bg-white border border-[#ECE7E3] rounded-3xl mx-auto flex items-center justify-center shadow-sm shadow-black/[0.02]">
                                <MessageCircle className="w-6 h-6 text-[#1E1B4B]" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#1E1B4B]">Start your conversation.</h2>
                                <p className="text-sm font-medium text-[#8E867F] italic font-serif max-w-xs mx-auto">"Practice makes progress. What is on your mind today?"</p>
                            </div>
                        </motion.div>
                    )}

                    <AnimatePresence initial={false}>
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-6 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm shadow-black/[0.01] transition-all
                  ${m.role === 'user'
                                        ? 'bg-[#1E1B4B] border-[#1E1B4B] text-white shadow-xl shadow-indigo-900/10'
                                        : 'bg-white border-[#ECE7E3] text-[#1E1B4B]'
                                    }`}
                                >
                                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>

                                <div className={`group relative max-w-[80%] space-y-2 ${m.role === 'user' ? 'items-end' : ''}`}>
                                    <div className={`p-6 rounded-[2rem] text-sm leading-relaxed transition-all
                    ${m.role === 'user'
                                            ? 'bg-white border border-[#ECE7E3] text-[#1E1B4B] rounded-tr-none hover:border-[#1E1B4B] shadow-sm shadow-black/[0.02]'
                                            : 'bg-[#F6F2EE] border border-transparent text-[#1E1B4B] rounded-tl-none hover:bg-[#EBE6E1] shadow-inner shadow-black/[0.01]'
                                        }`}
                                    >
                                        {m.content}
                                    </div>
                                    <div className={`flex items-center gap-3 px-3 text-[9px] font-bold text-[#D5CDC6] uppercase tracking-widest italic
                    ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {m.role === 'user' ? 'Practitioner' : 'AI Companion'}
                                        <span className="w-1 h-1 bg-[#EBE6E1] rounded-full" />
                                        Now
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-6 items-center"
                        >
                            <div className="w-12 h-12 bg-white border border-[#ECE7E3] text-[#1E1B4B] rounded-2xl flex items-center justify-center shadow-sm shadow-black/[0.01]">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="flex gap-1.5 items-center px-6 py-4 bg-[#F6F2EE] border border-transparent rounded-[1.5rem] rounded-tl-none">
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#D5CDC6] rounded-full" />
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#D5CDC6] rounded-full" />
                                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#D5CDC6] rounded-full" />
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Luxury Input Section */}
            <footer className="p-8 md:px-14 md:pb-12 bg-[#FDFCFB]">
                <div className="max-w-3xl mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex items-center group"
                    >
                        <div className="absolute left-6 text-[#D5CDC6] group-focus-within:text-[#1E1B4B] transition-colors">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="What is on your mind? Start speaking..."
                            className="w-full pl-16 pr-32 py-6 bg-white border border-[#ECE7E3] rounded-[2.5rem] text-sm focus:outline-none focus:border-[#1E1B4B] transition-all font-medium text-[#1E1B4B] shadow-lg shadow-black/[0.03]"
                        />
                        <div className="absolute right-4 flex items-center gap-2">
                            <button
                                type="button"
                                className="p-3 text-[#D5CDC6] hover:text-[#1E1B4B] hover:bg-[#F6F2EE] rounded-2xl transition-all"
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!input || isLoading}
                                className="p-4 bg-[#1E1B4B] text-white disabled:bg-[#F1EDE9] disabled:text-[#D5CDC6] rounded-2xl transition-all shadow-xl shadow-indigo-900/10 flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </form>
                    <div className="mt-6 flex justify-center gap-10 items-center">
                        <span className="text-[9px] font-bold text-[#D5CDC6] uppercase tracking-[0.25em] italic">Press Enter to ritualize</span>
                        <div className="flex gap-6">
                            <button className="text-[9px] font-bold text-[#D5CDC6] uppercase tracking-[0.2em] hover:text-[#1E1B4B] transition-colors">Clear Ritual</button>
                            <button className="text-[9px] font-bold text-[#D5CDC6] uppercase tracking-[0.2em] hover:text-[#1E1B4B] transition-colors">Export Log</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
