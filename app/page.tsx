'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-2xl">♬</div>
            <span className="font-bold text-3xl tracking-tighter">BeatForge</span>
          </div>
          <div className="flex gap-10 text-sm font-medium">
            <Link href="/tools/drum-machine" className="hover:text-violet-400 transition">Drums</Link>
            <Link href="/tools/chord-progression" className="hover:text-violet-400 transition">Chords</Link>
            <Link href="/tools/arpeggio" className="hover:text-violet-400 transition">Arpeggios</Link>
            <Link href="/tools/swing-calculator" className="hover:text-violet-400 transition">Swing</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-bg pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-8">
            Tools for Serious<br />Music Producers
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
            Professional-grade calculators, generators, and utilities used by beatmakers worldwide.
          </p>
          <Link href="/tools/drum-machine" className="inline-block px-12 py-5 bg-white text-black font-semibold text-xl rounded-2xl hover:bg-zinc-200 transition">
            Launch Drum Machine
          </Link>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-6xl mx-auto px-8 py-24">
        <h2 className="text-4xl font-semibold text-center mb-16">Essential Tools</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/tools/drum-machine" className="card-hover bg-zinc-900 border border-zinc-800 rounded-3xl p-10 group">
            <div className="text-6xl mb-6">🥁</div>
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-violet-400">Drum Machine</h3>
            <p className="text-zinc-400">16-step sequencer with swing, randomization, and MIDI export.</p>
          </Link>

          <Link href="/tools/chord-progression" className="card-hover bg-zinc-900 border border-zinc-800 rounded-3xl p-10 group">
            <div className="text-6xl mb-6">🎹</div>
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-violet-400">Chord Progressions</h3>
            <p className="text-zinc-400">Generate inspiring progressions with live playback.</p>
          </Link>

          <Link href="/tools/swing-calculator" className="card-hover bg-zinc-900 border border-zinc-800 rounded-3xl p-10 group">
            <div className="text-6xl mb-6">⏱️</div>
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-violet-400">Swing Calculator</h3>
            <p className="text-zinc-400">Precise swing timings for any genre and BPM.</p>
          </Link>
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-16 text-center text-zinc-500">
        © 2026 BeatForge • Free Tools for Music Producers
      </footer>
    </div>
  );
}