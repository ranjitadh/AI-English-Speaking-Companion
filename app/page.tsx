'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideSparkles, MicIcon, MessageCircle } from 'lucide-react'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      <header className="px-8 h-20 flex items-center border-b border-gray-50 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link
          className="flex items-center group"
          href="/"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/SpeakMate.png"
            alt="SpeakMate"
            className="h-10 w-auto"
          />
        </Link>
        <nav className="ml-auto flex gap-10">
          <Link className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors" href="/login">Sign in</Link>
          <Link className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b border-black pb-0.5" href="/login?tab=signup">Get started</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center -mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-xl px-10 text-center space-y-16"
        >
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-100 rounded-full bg-gray-50/50 text-[10px] uppercase font-bold tracking-widest text-gray-500 shadow-sm shadow-black/5"
            >
              <LucideSparkles className="w-3.5 h-3.5 text-black" />
              Now in Beta v1.2
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold tracking-tight text-black"
            >
              Speak English <br />
              with <span className="underline-offset-8 decoration-gray-100 italic font-serif">Confidence.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-gray-400 leading-relaxed max-w-sm mx-auto italic font-serif"
            >
              "Simple AI practice for daily conversation. No complex settings, just chat and improve."
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-4"
          >
            <Link href="/login" className="group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-black/10 hover:bg-gray-800 transition-all flex items-center gap-3"
              >
                <MessageCircle className="w-4 h-4" />
                Start Speaking
              </motion.div>
            </Link>
            <Link href="/about" className="group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-gray-100 text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:border-black hover:text-black hover:bg-white transition-all shadow-sm shadow-black/5 flex items-center gap-3"
              >
                How it works
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-12 pt-16 border-t border-gray-50"
          >
            {[
              { label: 'Chat', icon: MessageCircle },
              { label: 'Voice', icon: MicIcon },
              { label: 'Fluent', icon: LucideSparkles }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group">
                  <f.icon className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 italic">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <footer className="py-12 px-10 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic flex items-center gap-2">
          SpeakMate
          <span className="inline-block w-1.5 h-1.5 bg-gray-100 rounded-full" />
          2026 Edition
        </span>
        <div className="flex gap-8 uppercase tracking-widest text-[10px] font-bold text-gray-400 italic">
          <Link className="hover:text-black" href="#">Security</Link>
          <Link className="hover:text-black" href="#">Terms</Link>
          <Link className="hover:text-black" href="#">Privacy</Link>
        </div>
      </footer>
    </div>
  )
}
