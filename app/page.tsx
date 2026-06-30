'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-3xl">♬</div>
            <div>
              <div className="font-bold text-3xl tracking-tighter">BeatForge</div>
              <div className="text-xs text-zinc-500 -mt-1">PRODUCER TOOLS</div>
            </div>
          </div>

          <div className="flex gap-10 text-sm font-medium">
            <Link href="/tools/drum-machine" className="hover:text-violet-400 transition-colors">Drum Machine</Link>
            <Link href="/tools/swing-calculator" className="hover:text-violet-400 transition-colors">Swing Calculator</Link>
            <Link href="/tools/chord-progression" className="hover:text-violet-400 transition-colors">Chord Progressions</Link>
            <Link href="/tools/arpeggio" className="hover:text-violet-400 transition-colors">Arpeggios</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-24 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-6 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="uppercase tracking-[3px] text-xs font-mono">Free for Producers</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
            The Swiss Army Knife<br />for Music Producers
          </h1>

          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
            Professional tools. Real-time audio. MIDI export. Built for beatmakers.
          </p>

          <div className="flex gap-6 justify-center">
            <Link 
              href="/tools/drum-machine" 
              className="px-10 py-5 bg-white text-black font-semibold text-xl rounded-2xl hover:bg-zinc-200 transition-all flex items-center gap-3"
            >
              Open Drum Machine →
            </Link>
            <Link 
              href="/tools/swing-calculator" 
              className="px-10 py-5 border border-zinc-700 hover:bg-zinc-900 rounded-2xl text-xl font-medium transition-all"
            >
              Swing Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-8 py-24">
        <h2 className="text-4xl font-semibold text-center mb-16">Our Tools</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/tools/drum-machine" className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-violet-500 transition-all">
            <div className="text-6xl mb-6">🥁</div>
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-violet-400">Drum Machine</h3>
            <p className="text-zinc-400">16-step sequencer with swing, randomization, and MIDI export.</p>
          </Link>

          <Link href="/tools/chord-progression" className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-violet-500 transition-all">
            <div className="text-6xl mb-6">🎹</div>
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-violet-400">Chord Progressions</h3>
            <p className="text-zinc-400">Generate, play, and export beautiful progressions.</p>
          </Link>

          <Link href="/tools/swing-calculator" className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-violet-500 transition-all">
            <div className="text-6xl mb-6">⏱️</div>
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-violet-400">Swing Calculator</h3>
            <p className="text-zinc-400">Precise swing timings for any BPM and genre.</p>
          </Link>
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-16 text-center text-zinc-500 text-sm">
        © 2026 BeatForge • Free Tools for Music Producers
      </footer>
    </div>
  );
}