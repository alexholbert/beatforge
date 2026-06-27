'use client';

import { useState } from 'react';

export default function SwingCalculator() {
  const [bpm, setBpm] = useState(128);
  const [swing, setSwing] = useState(62);

  const msPerBeat = 60000 / bpm;
  const straight16th = msPerBeat / 4;
  const delay = straight16th * (swing - 50) / 50;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Swing Calculator</h1>
        <p className="text-center text-zinc-400 mb-12">Calculate perfect swing timings</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className="block mb-2">BPM</label>
              <input type="range" min="60" max="180" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full" />
              <div className="text-6xl font-mono text-center mt-8">{bpm}</div>
            </div>
            <div>
              <label className="block mb-2">Swing Amount: {swing}%</label>
              <input type="range" min="50" max="75" value={swing} onChange={(e) => setSwing(Number(e.target.value))} className="w-full" />
              <div className="mt-12 space-y-6 text-xl">
                <div>Straight 16th: <span className="font-mono">{straight16th.toFixed(1)} ms</span></div>
                <div>Swung 1st: <span className="font-mono text-emerald-400">{(straight16th + delay).toFixed(1)} ms</span></div>
                <div>Swung 2nd: <span className="font-mono text-amber-400">{(straight16th - delay).toFixed(1)} ms</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}