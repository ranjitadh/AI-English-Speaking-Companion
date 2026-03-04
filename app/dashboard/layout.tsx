import { Sidebar, MobileSidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full relative bg-white selection:bg-black selection:text-white">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white border-r border-gray-50">
                <Sidebar />
            </div>
            <main className="md:pl-64 h-full bg-white">
                <div className="flex items-center p-6 md:hidden border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                    <MobileSidebar />
                    <div className="ml-4">
                        <img src="/SpeakMate.png" alt="SpeakMate" className="h-12 w-auto" />
                    </div>
                </div>
                <div className="h-full md:p-4 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
