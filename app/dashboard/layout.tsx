import { Sidebar, MobileSidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full">
                <div className="flex items-center p-4 md:hidden border-b">
                    <MobileSidebar />
                    <div className="ml-4 font-bold">SpeakMate</div>
                </div>
                {children}
            </main>
        </div>
    )
}
