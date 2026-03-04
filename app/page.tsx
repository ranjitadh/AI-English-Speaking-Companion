'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideSparkles, MicIcon, MessageCircle, Sparkles, Zap, ArrowRight } from 'lucide-react'

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const } }
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] font-sans selection:bg-[#1E1B4B] selection:text-white">
      <header className="px-12 h-24 flex items-center border-b border-[#ECE7E3] bg-[#FDFCFB]/80 backdrop-blur-md sticky top-0 z-50">
        <Link
          className="flex items-center group"
          href="/"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/SpeakMate.png"
            alt="SpeakMate"
            className="h-16 w-auto"
          />
        </Link>
        <nav className="ml-auto flex gap-14 text-[11px] font-bold uppercase tracking-[0.25em]">
          <Link className="text-[#8E867F] hover:text-[#1E1B4B] transition-colors" href="/login">Sign in</Link>
          <Link className="text-[#1E1B4B] border-b-2 border-[#1E1B4B] pb-1 hover:tracking-[0.15em] transition-all" href="/login?tab=signup">Get started</Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl px-10 text-center space-y-20 pb-20"
        >
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-5 py-2 border border-[#ECE7E3] rounded-full bg-[#F6F2EE]/50 text-[10px] uppercase font-bold tracking-[0.2em] text-[#8E867F] shadow-sm shadow-black/[0.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1E1B4B]" />
              Spring beta release v1.2
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold tracking-tight text-[#1E1B4B] leading-[1.1]"
            >
              Speak English <br />
              with <span className="underline-offset-8 decoration-[#ECE7E3] italic font-serif">Confidence.</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg font-medium text-[#8E867F] leading-relaxed max-w-lg mx-auto italic font-serif"
            >
              "Simple, ritualistic AI practice for daily conversation. We focus on clarity, not just complexity."
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-8 justify-center pt-6"
          >
            <Link href="/login" className="group">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-14 py-5 bg-[#1E1B4B] text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-[1.5rem] shadow-xl shadow-indigo-900/10 hover:bg-[#161434] transition-all flex items-center gap-4"
              >
                <MessageCircle className="w-4 h-4" />
                Start Speaking
              </motion.div>
            </Link>
            <Link href="/about" className="group">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 border border-[#ECE7E3] text-[#8E867F] text-[11px] font-bold uppercase tracking-[0.25em] rounded-[1.5rem] hover:border-[#1E1B4B] hover:text-[#1E1B4B] hover:bg-white transition-all shadow-sm shadow-black/[0.02] flex items-center gap-4 bg-white"
              >
                Our Philosophy
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-16 pt-24 border-t border-[#ECE7E3]"
          >
            {[
              { label: 'Chat', icon: MessageCircle },
              { label: 'Voice', icon: MicIcon },
              { label: 'Fluent', icon: Sparkles }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center border border-[#ECE7E3] group-hover:border-[#1E1B4B] transition-all shadow-sm shadow-black/[0.01]">
                  <f.icon className="w-5 h-5 text-[#D5CDC6] group-hover:text-[#1E1B4B] transition-colors" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D5CDC6] italic group-hover:text-[#8E867F] transition-colors">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <footer className="py-16 px-10 border-t border-[#ECE7E3] flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-[10px] font-bold text-[#D5CDC6] uppercase tracking-[0.2em] italic flex items-center gap-3">
            SpeakMate
            <span className="inline-block w-1.5 h-1.5 bg-[#E5DFD9] rounded-full" />
            Est. 2026
          </span>
          <p className="text-[10px] text-[#D5CDC6] font-medium uppercase tracking-[0.1em]">Made for the curious speakers of the world.</p>
        </div>
        <div className="flex gap-12 uppercase tracking-[0.2em] text-[10px] font-bold text-[#8E867F] italic">
          <Link className="hover:text-[#1E1B4B]" href="#">Security</Link>
          <Link className="hover:text-[#1E1B4B]" href="#">Terms</Link>
          <Link className="hover:text-[#1E1B4B]" href="#">Privacy</Link>
        </div>
      </footer>
    </div>
  )
}
