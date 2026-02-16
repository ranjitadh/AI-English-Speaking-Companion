'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, User as UserIcon, MoreVertical, Phone } from 'lucide-react'
import { cn } from "@/lib/utils"

type Message = {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hi! How are you feeling today?',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            // @ts-ignore
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, newMessage])
        setInput('')
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `That sounds interesting! Tell me more about "${newMessage.content}".`,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiResponse])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between p-4 border-b bg-card">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/ai-avatar.png" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">English Companion</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4 bg-muted/10">
                <div className="space-y-4 max-w-3xl mx-auto">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                message.role === 'user'
                                    ? "ml-auto bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                            )}
                        >
                            {message.content}
                            <span className="text-[10px] opacity-70 block text-right">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="bg-muted text-foreground w-max rounded-lg px-3 py-2 text-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-card mt-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                    className="flex w-full items-center space-x-2 max-w-3xl mx-auto"
                >
                    <Input
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isTyping}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}
