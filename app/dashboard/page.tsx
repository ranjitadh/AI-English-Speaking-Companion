import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageSquare, Mic, BookOpen, Clock } from 'lucide-react'


// ... (getUserStats is same)
async function getUserStats(userId: string) {
    // Mock data or fetch from database
    return {
        streak: 5,
        minutesSpoken: 45,
        messagesSent: 128,
        level: 2,
        xp: 350
    }
}

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect('/login')
    }

    const stats = await getUserStats(session.user.id!)

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Welcome back, {session.user.name || 'Friend'}!</span>
                </div>
            </div>
            {/* Cards remain same */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.streak} Days</div>
                        <p className="text-xs text-muted-foreground">+1 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Spoken Time</CardTitle>
                        <Mic className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.minutesSpoken} mins</div>
                        <p className="text-xs text-muted-foreground">Great progress!</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.messagesSent}</div>
                        <p className="text-xs text-muted-foreground">Keep chatting!</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Level</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Level {stats.level}</div>
                        <p className="text-xs text-muted-foreground">{stats.xp} XP / 500 XP</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Voice Call</p>
                                    <p className="text-sm text-muted-foreground">10 minutes ago</p>
                                </div>
                                <div className="ml-auto font-medium">+50 XP</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Pronunciation Task</p>
                                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                                </div>
                                <div className="ml-auto font-medium">+20 XP</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Start Speaking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/dashboard/call" className="w-full">
                            <Button className="w-full h-12 text-lg" variant="default">
                                <Mic className="mr-2 h-5 w-5" /> Start Call
                            </Button>
                        </Link>
                        <Link href="/dashboard/chat" className="w-full">
                            <Button className="w-full" variant="secondary">
                                <MessageSquare className="mr-2 h-4 w-4" /> Go to Chat
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
