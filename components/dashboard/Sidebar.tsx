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
        <div className="flex flex-col h-full bg-white border-r border-gray-100 w-full">
            {/* Logo */}
            <div className="px-8 py-10">
                <Link href="/dashboard" className="flex items-center group">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="/SpeakMate.png"
                        alt="SpeakMate"
                        className="h-12 w-auto"
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
                                    'relative flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all',
                                    active
                                        ? 'text-black bg-gray-50/80 border border-gray-100 shadow-sm shadow-black/5'
                                        : 'text-gray-400 hover:text-black hover:bg-gray-50'
                                )}
                            >
                                <route.icon className={cn("h-4 w-4", active ? "text-black" : "text-gray-200")} />
                                <span className="flex-1">{route.label}</span>
                                {active && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 w-1 h-3 bg-black rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 py-8 border-t border-gray-50 space-y-1">
                <Link
                    href="/dashboard/profile"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-all"
                >
                    <Settings className="h-4 w-4 text-gray-200 group-hover:text-black" />
                    Settings
                </Link>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => logout()}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-all w-full text-left"
                >
                    <LogOut className="h-4 w-4 text-gray-200 group-hover:text-red-500" />
                    Logout
                </motion.button>
            </div>

            {/* Minimal v Label */}
            <div className="px-8 pb-8">
                <div className="p-4 bg-gray-50/50 rounded-2xl border border-dotted border-gray-100 flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-gray-100">
                        <Sparkles className="w-2.5 h-2.5 text-gray-300" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest italic">Beta 1.2</span>
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
                    className="md:hidden p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 active:bg-gray-50 transition-all"
                >
                    <AlignLeft className="h-5 w-5" />
                </motion.button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-white border-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
