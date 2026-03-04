'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Sparkles, MessageSquare, MicIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

const transport = new TextStreamChatTransport({ api: '/api/chat' })

export default function ChatInterface() {
    const [input, setInput] = useState('')

    const { messages, status, sendMessage } = useChat({
        transport,
        messages: [
            {
                id: '1',
                role: 'assistant' as const,
                content: 'Hello. Let\'s practice your English today. What shall we talk about?',
                parts: [{ type: 'text' as const, text: 'Hello. Let\'s practice your English today. What shall we talk about?' }]
            }
        ]
    })

    const isLoading = status === 'submitted' || status === 'streaming'
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return
        sendMessage({ text: input })
        setInput('')
    }

    const getMessageText = (message: (typeof messages)[number]): string => {
        if (message.content) return message.content
        const textPart = message.parts?.find((p) => p.type === 'text')
        if (textPart && 'text' in textPart) return textPart.text as string
        return ''
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white max-w-2xl mx-auto border border-gray-100 mt-4 rounded-2xl overflow-hidden relative shadow-2xl shadow-black/[0.02]">
            {/* Minimal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                        <Sparkles className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-900 uppercase">AI Language Coach</h3>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={cn("w-1.5 h-1.5 rounded-full", isLoading ? "bg-black animate-pulse" : "bg-emerald-400")} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isLoading ? 'Thinking' : 'Online'}</span>
                </div>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 px-8 pt-10 pb-4 bg-white">
                <div className="space-y-12 max-w-xl mx-auto">
                    <AnimatePresence initial={false}>
                        {messages.map((message) => {
                            const isUser = (message.role as string) === 'user'
                            return (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className={cn(
                                        "flex w-full group",
                                        isUser ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div className={cn(
                                        "max-w-[85%] text-sm leading-relaxed",
                                        isUser
                                            ? "text-black font-semibold bg-gray-50 px-6 py-4 rounded-2xl rounded-tr-none border border-gray-100 shadow-sm shadow-black/5"
                                            : "text-gray-600 bg-white px-1 py-1 border-l-2 border-gray-100 pl-6 group-hover:border-black transition-colors"
                                    )}>
                                        {getMessageText(message)}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-start"
                        >
                            <div className="text-gray-300 italic text-[11px] font-bold uppercase tracking-widest pl-6 border-l-2 border-gray-50 py-1 transition-all">
                                <span className="flex items-center gap-2">
                                    <motion.span
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        Generating...
                                    </motion.span>
                                </span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={scrollRef} className="h-20" />
                </div>
            </ScrollArea>

            {/* Simple Input */}
            <div className="p-8 bg-white border-t border-gray-50">
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-4 relative max-w-xl mx-auto"
                >
                    <motion.div
                        initial={false}
                        animate={isLoading ? { opacity: 0.5 } : { opacity: 1 }}
                        className="flex-1 flex gap-3"
                    >
                        <input
                            placeholder="Type an English sentence..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            className="flex-1 bg-gray-50/50 border border-gray-100 focus:border-black focus:bg-white focus:outline-none h-14 px-6 rounded-xl text-sm font-medium transition-all"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="h-14 px-8 bg-black text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            <Send className="w-3 h-3" />
                            Send
                        </motion.button>
                    </motion.div>
                </form>
            </div>
        </div>
    )
}
