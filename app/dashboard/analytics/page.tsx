import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Activity, TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vocabulary Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+150 Words</div>
                        <p className="text-xs text-muted-foreground">in the last 30 days</p>
                        <div className="h-[80px] mt-4 bg-muted/20 rounded-md flex items-end justify-around pb-2 px-2">
                            {[30, 45, 60, 50, 70, 90, 100].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-2 bg-primary rounded-t-sm" />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fluency Score</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78/100</div>
                        <p className="text-xs text-muted-foreground text-green-500 font-medium">+5 points this week</p>
                        <div className="h-2 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-green-500 w-[78%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
