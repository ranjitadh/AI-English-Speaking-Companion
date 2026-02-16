import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare, Mic, Globe } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold text-xl" href="#">
          SpeakMate
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login?tab=signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your AI English Speaking Partner
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Practice English conversation 24/7 with a human-like AI friend. Improve your confidence, pronunciation, and vocabulary starting today.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button className="bg-white text-black hover:bg-gray-200" size="lg">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black" size="lg">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-white shadow-sm">
                <div className="p-2 bg-black rounded-full text-white">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold">Real-time Chat</h2>
                <p className="text-center text-gray-500">
                  Chat with your AI friend anytime. Get instant corrections and suggestions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-white shadow-sm">
                <div className="p-2 bg-black rounded-full text-white">
                  <Mic className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold">Voice Calls</h2>
                <p className="text-center text-gray-500">
                  Practice speaking with realistic voice combinations. Low latency and natural flow.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-white shadow-sm">
                <div className="p-2 bg-black rounded-full text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold">Pronunciation Coach</h2>
                <p className="text-center text-gray-500">
                  Receive detailed feedback on your pronunciation and fluency.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 SpeakMate Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
