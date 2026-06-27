// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [bpm, setBpm] = useState(128);
  const [selectedNote, setSelectedNote] = useState('quarter');

  const msPerBeat = 60000 / bpm;

  const noteValues = [
    { name: 'Whole', value: 'whole', ms: msPerBeat * 4 },
    { name: 'Half', value: 'half', ms: msPerBeat * 2 },
    { name: 'Quarter', value: 'quarter', ms: msPerBeat },
    { name: 'Eighth', value: 'eighth', ms: msPerBeat / 2 },
    { name: 'Sixteenth', value: 'sixteenth', ms: msPerBeat / 4 },
    { name: 'Dotted Quarter', value: 'dotted_quarter', ms: msPerBeat * 1.5 },
    { name: 'Triplet Eighth', value: 'triplet_eighth', ms: (msPerBeat / 2) * (2/3) },
  ];

  const currentMs = noteValues.find(n => n.value === selectedNote)?.ms || msPerBeat;

  const commonBpms = [60, 80, 90, 100, 120, 128, 130, 140, 150, 160, 174, 180];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600 rounded-2xl flex items-center justify-center text-2xl">♬</div>
            <div>
              <div className="font-bold text-3xl tracking-tighter">BeatForge</div>
              <p className="text-xs text-zinc-500 -mt-1">PRODUCER TOOLS</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium">
            <Link href="/tools/drum-machine" className="hover:text-violet-400 transition-colors">Drum Machine</Link>
            <Link href="/tools/swing-calculator" className="hover:text-violet-400 transition-colors">Swing Calc</Link>
            <Link href="/tools/chord-progression" className="hover:text-violet-400 transition-colors">Chords</Link>
            <Link href="/tools/arpeggio" className="hover:text-violet-400 transition-colors">Arpeggio</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            The Swiss Army Knife<br />for Music Producers
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Free professional tools: BPM calculators, Drum Machine with swing, MIDI export, Chord generators, and more.
          </p>
        </div>

        {/* BPM Calculator - Priority #1 Tool */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-20 glass">
          <h2 className="text-3xl font-semibold mb-8 text-center">BPM to Milliseconds Calculator</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <label className="block text-sm text-zinc-400 mb-3">BPM</label>
              <input
                type="range"
                min="40"
                max="220"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full accent-violet-500"
              />
              <div className="text-center mt-4">
                <input
                  type="number"
                  value={bpm}
                  onChange={(e) => setBpm(Math.max(40, Math.min(220, Number(e.target.value))))}
                  className="input text-6xl font-mono font-bold w-40 text-center mx-auto block"
                />
                <p className="text-sm text-zinc-500 mt-1">BPM</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {commonBpms.map(b => (
                  <button
                    key={b}
                    onClick={() => setBpm(b)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm transition-colors"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Note Value</label>
                <select
                  value={selectedNote}
                  onChange={(e) => setSelectedNote(e.target.value)}
                  className="input w-full text-lg"
                >
                  {noteValues.map(note => (
                    <option key={note.value} value={note.value}>{note.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-black/50 rounded-2xl p-8 text-center border border-zinc-700">
                <p className="text-zinc-400 text-sm mb-2">TIME (ms)</p>
                <p className="text-7xl font-mono font-bold text-violet-400 tracking-tighter">
                  {currentMs.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/tools/drum-machine" className="card bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500 group">
            <div className="text-4xl mb-4">🥁</div>
            <h3 className="text-2xl font-semibold mb-2">Drum Machine</h3>
            <p className="text-zinc-400">16-step sequencer with swing + MIDI export</p>
          </Link>

          <Link href="/tools/swing-calculator" className="card bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500 group">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-2xl font-semibold mb-2">Swing Calculator</h3>
            <p className="text-zinc-400">Advanced swing timing for any BPM</p>
          </Link>

          <Link href="/tools/chord-progression" className="card bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500 group">
            <div className="text-4xl mb-4">🎹</div>
            <h3 className="text-2xl font-semibold mb-2">Chord Progressions</h3>
            <p className="text-zinc-400">Generate + play + export MIDI</p>
          </Link>
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-12 text-center text-zinc-500 text-sm">
        BeatForge © 2026 • Free tools for producers, beatmakers &amp; sound designers
      </footer>
    </div>
  );
}