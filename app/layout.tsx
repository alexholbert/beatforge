// app/page.tsx
'use client';

import { useState } from 'react';

export default function BeatForge() {
  const [bpm, setBpm] = useState<number>(128);
  const [noteValue, setNoteValue] = useState<string>('quarter');

  const msPerBeat = 60000 / bpm;
  const msPerHalf = msPerBeat * 2;
  const msPerQuarter = msPerBeat;
  const msPerEighth = msPerBeat / 2;
  const msPerSixteenth = msPerBeat / 4;
  const msPerThirtySecond = msPerBeat / 8;

  const getNoteMs = (note: string) => {
    switch (note) {
      case 'whole': return msPerBeat * 4;
      case 'half': return msPerHalf;
      case 'quarter': return msPerQuarter;
      case 'eighth': return msPerEighth;
      case 'sixteenth': return msPerSixteenth;
      case 'thirtysecond': return msPerThirtySecond;
      case 'dotted_half': return msPerHalf * 1.5;
      case 'dotted_quarter': return msPerQuarter * 1.5;
      case 'dotted_eighth': return msPerEighth * 1.5;
      case 'triplet_quarter': return (msPerQuarter * 2) / 3;
      case 'triplet_eighth': return (msPerEighth * 2) / 3;
      default: return msPerQuarter;
    }
  };

  const selectedMs = getNoteMs(noteValue);
  const commonBpms = [60, 80, 90, 100, 110, 120, 128, 130, 140, 150, 160, 180];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-xl flex items-center justify-center font-bold text-lg">♬</div>
            <div>
              <div className="font-semibold text-2xl tracking-tight">BeatForge</div>
              <div className="text-[10px] text-zinc-500 -mt-1">PRODUCER TOOLS</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="/tools/drum-machine" className="hover:text-violet-400 transition-colors">Drum Machine</a>
            <a href="/tools/swing-calculator" className="hover:text-violet-400 transition-colors">Swing Calculator</a>
            <a href="/tools/chord-progression" className="hover:text-violet-400 transition-colors">Chords</a>
            <a href="/tools/arpeggio" className="hover:text-violet-400 transition-colors">Arpeggios</a>
          </div>
        </div>
      </nav>

      {/* Hero + BPM Tool */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">BeatForge</h1>
          <p className="text-2xl text-zinc-400">The Swiss Army Knife for Music Producers</p>
        </div>

        {/* BPM Calculator - already in your file, keeping it */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 mb-20">
          {/* ... (your existing BPM code from previous) ... */}
          {/* Paste your current BPM section here if you want to keep it identical */}
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-12 text-center text-zinc-500 text-sm">
        © 2026 BeatForge • Free Tools for Producers
      </footer>
    </div>
  );
}
