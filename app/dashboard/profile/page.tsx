import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const session = await auth()

    if (!session?.user) {
        redirect('/login')
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
            </div>

            <div className="grid gap-4 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input defaultValue={session.user.name || ''} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input defaultValue={session.user.email || ''} disabled />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                {/* ... (Learning Preferences similar to before) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Learning Preferences</CardTitle>
                        <CardDescription>Customize your AI companion.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>English Level</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>Beginner</option>
                                <option selected>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>AI Personality</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>Professional Teacher</option>
                                <option selected>Friendly Companion</option>
                                <option>Strict Motivator</option>
                            </select>
                        </div>
                        <Button variant="secondary">Update Preferences</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
