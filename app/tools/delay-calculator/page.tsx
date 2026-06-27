'use client';

import { useState } from 'react';

export default function DelayCalculator() {
  const [bpm, setBpm] = useState(128);
  const [noteValue, setNoteValue] = useState('quarter');

  const msPerBeat = 60000 / bpm;

  const delays = {
    quarter: msPerBeat,
    eighth: msPerBeat / 2,
    sixteenth: msPerBeat / 4,
    dotted_quarter: msPerBeat * 1.5,
    triplet_eighth: (msPerBeat / 2) * (2 / 3),
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Delay Time Calculator</h1>
        <p className="text-center text-zinc-400 mb-12">Perfect timings for reverb, delay, and automation</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <div className="mb-12">
            <label className="block mb-4 text-lg">BPM</label>
            <input
              type="range"
              min="60"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="text-6xl font-mono text-center mt-6">{bpm}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(delays).map(([name, ms]) => (
              <div key={name} className="bg-zinc-800 rounded-2xl p-6 text-center">
                <div className="text-sm text-zinc-400 mb-2 capitalize">{name.replace('_', ' ')}</div>
                <div className="text-5xl font-mono font-bold text-violet-400">{ms.toFixed(1)}</div>
                <div className="text-xs text-zinc-500">ms</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}