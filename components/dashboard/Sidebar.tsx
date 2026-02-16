'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    AlignLeft,
    LayoutDashboard,
    MessageSquare,
    Mic,
    BookOpen,
    PieChart,
    LogOut,
    User,
    Settings
} from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { logout } from '@/app/actions/auth'

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'AI Chat',
        icon: MessageSquare,
        href: '/dashboard/chat',
        color: 'text-violet-500',
    },
    {
        label: 'AI Voice Call',
        icon: Mic,
        href: '/dashboard/call',
        color: 'text-pink-700',
    },
    {
        label: 'Practice Tasks',
        icon: BookOpen,
        href: '/dashboard/tasks',
        color: 'text-orange-700',
    },
    {
        label: 'Analytics',
        icon: PieChart,
        href: '/dashboard/analytics',
        color: 'text-emerald-500',
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        {/* Logo placeholder */}
                        <div className="bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg w-full h-full flex items-center justify-center font-bold">SM</div>
                    </div>
                    <h1 className={cn("text-2xl font-bold font-heading")}>
                        SpeakMate
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <Link
                    href="/dashboard/profile"
                    className={cn(
                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
                    )}
                >
                    <div className="flex items-center flex-1">
                        <Settings className={cn("h-5 w-5 mr-3 text-gray-400")} />
                        Settings
                    </div>
                </Link>
                <button
                    onClick={() => logout()}
                    className={cn(
                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-red-400 hover:bg-white/10 rounded-lg transition text-zinc-400"
                    )}
                >
                    <div className="flex items-center flex-1">
                        <LogOut className={cn("h-5 w-5 mr-3 text-red-500")} />
                        Logout
                    </div>
                </button>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <AlignLeft />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-none w-72">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
