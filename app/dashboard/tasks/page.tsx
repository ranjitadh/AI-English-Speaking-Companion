'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AudioRecorder } from '@/components/voice/AudioRecorder'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

export default function TasksPage() {
    const [completed, setCompleted] = useState(false)

    const handleRecordingComplete = async (blob: Blob) => {
        // Here user would upload the blob to server for analysis
        toast.success("Recording saved! Analyzing...")

        // Simulate processing
        setTimeout(() => {
            setCompleted(true)
            toast.success("Analysis complete!")
        }, 2000)
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Daily Speaking Task</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">Describe Your Hometown</CardTitle>
                                <CardDescription>Topic of the Day • Feb 16, 2026</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Intermediate</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600">
                            <p className="font-medium mb-2">Prompt:</p>
                            <p>Talk about where you grew up. What is it famous for? What do people do there? Would you recommend visiting?</p>
                            <p className="mt-2 text-xs italic text-slate-400">Target time: 30-60 seconds</p>
                        </div>

                        {!completed ? (
                            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg bg-slate-50/50">
                                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                                <p className="text-xs text-muted-foreground mt-2">Click to start recording your answer</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-green-800">Excellent Work!</h4>
                                        <p className="text-sm text-green-700">Your pronunciation was clear. You used good vocabulary ("famous for", "recommend").</p>
                                    </div>
                                </div>

                                <div className="border rounded-md p-4">
                                    <h4 className="font-medium mb-2 text-sm">Feedback</h4>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li>• <span className="text-red-500 line-through mr-1">peoples</span> → <span className="text-green-600 font-medium">people</span> (Grammar)</li>
                                        <li>• Try to use more connecting words like "Moreover" or "However".</li>
                                    </ul>
                                </div>

                                <Button variant="outline" onClick={() => setCompleted(false)} className="w-full">
                                    <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>History</CardTitle>
                        <CardDescription>Your past speaking tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium text-sm">Favorite Movie</p>
                                        <p className="text-xs text-muted-foreground">Feb {16 - i}</p>
                                    </div>
                                    <Badge variant={i === 1 ? "default" : "secondary"}>{85 + i}%</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
