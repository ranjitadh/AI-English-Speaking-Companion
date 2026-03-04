'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    MessageSquare,
    Mic,
    BookOpen,
    BarChart2,
    Settings,
    LogOut,
    Sparkles,
    AlignLeft,
} from 'lucide-react'
import { logout } from '@/app/actions/auth'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const routes = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'AI Chat', icon: MessageSquare, href: '/dashboard/chat' },
    { label: 'Voice Practice', icon: Mic, href: '/dashboard/call' },
    { label: 'Lessons', icon: BookOpen, href: '/dashboard/tasks' },
    { label: 'Stats', icon: BarChart2, href: '/dashboard/analytics' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full bg-[#FCFAF8] border-r border-[#ECE7E3] w-full">
            {/* Logo */}
            <div className="px-8 py-10">
                <Link href="/dashboard" className="flex items-center group">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        src="/SpeakMate.png"
                        alt="SpeakMate"
                        className="h-16 w-auto"
                    />
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 space-y-1">
                {routes.map((route) => {
                    const active = pathname === route.href
                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="block"
                        >
                            <motion.div
                                initial={false}
                                whileHover={{ x: 3 }}
                                className={cn(
                                    'relative flex items-center gap-3 px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all',
                                    active
                                        ? 'text-[#1E1B4B] bg-[#F1EDE9] border border-[#E5DFD9] shadow-inner shadow-black/[0.02]'
                                        : 'text-[#8E867F] hover:text-[#1E1B4B] hover:bg-[#F6F2EE]'
                                )}
                            >
                                <route.icon className={cn("h-4 w-4", active ? "text-[#1E1B4B]" : "text-[#D5CDC6]")} />
                                <span className="flex-1">{route.label}</span>
                                {active && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 y-full h-4 bg-[#1E1B4B] rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 py-8 border-t border-[#ECE7E3] space-y-1">
                <Link
                    href="/dashboard/profile"
                    className="group flex items-center gap-3 px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-[#8E867F] hover:text-[#1E1B4B] hover:bg-[#F6F2EE] transition-all"
                >
                    <Settings className="h-4 w-4 text-[#D5CDC6] group-hover:text-[#1E1B4B]" />
                    Settings
                </Link>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => logout()}
                    className="group flex items-center gap-3 px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-[#8E867F] hover:text-red-500 hover:bg-red-50/50 transition-all w-full text-left"
                >
                    <LogOut className="h-4 w-4 text-[#D5CDC6] group-hover:text-red-500" />
                    Logout
                </motion.button>
            </div>

            {/* Subtle Beta Stamp */}
            <div className="px-8 pb-8">
                <div className="p-4 bg-[#F6F2EE]/50 rounded-2xl border border-[#ECE7E3] flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-[#ECE7E3]">
                        <Sparkles className="w-3 h-3 text-[#D5CDC6]" />
                    </div>
                    <div>
                        <span className="block text-[9px] font-bold text-[#8E867F] uppercase tracking-widest italic leading-none mb-0.5">Beta 1.2 Edition</span>
                        <span className="block text-[8px] font-medium text-[#D5CDC6] uppercase tracking-[0.2em] leading-none">Spring 2026</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-3 bg-white border border-[#ECE7E3] rounded-2xl shadow-sm text-[#1E1B4B] active:bg-[#F6F2EE] transition-all"
                >
                    <AlignLeft className="h-5 w-5" />
                </motion.button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-[#FCFAF8] border-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
