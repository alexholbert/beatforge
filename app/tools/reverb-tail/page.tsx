'use client';

import { useState } from 'react';

export default function ReverbTail() {
  const [bpm, setBpm] = useState(128);
  const [preDelay, setPreDelay] = useState(20);
  const [decay, setDecay] = useState(1.8);

  const msPerBeat = 60000 / bpm;

  const reverbSettings = {
    preDelay: preDelay,
    decayTime: decay,
    tailLength: Math.round(msPerBeat * decay),
    recommended: {
      short: Math.round(msPerBeat * 0.5),
      medium: Math.round(msPerBeat * 1.2),
      long: Math.round(msPerBeat * 2.5),
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Reverb Tail Calculator</h1>
        <p className="text-center text-zinc-400 mb-12">Perfect reverb settings synced to your BPM</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <div className="mb-12">
            <label className="block mb-4">BPM</label>
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

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800 rounded-2xl p-8 text-center">
              <div className="text-sm text-zinc-400 mb-2">Pre-Delay</div>
              <div className="text-5xl font-mono">{preDelay} <span className="text-lg">ms</span></div>
              <input type="range" min="0" max="100" value={preDelay} onChange={(e) => setPreDelay(Number(e.target.value))} className="w-full mt-6" />
            </div>
            <div className="bg-zinc-800 rounded-2xl p-8 text-center">
              <div className="text-sm text-zinc-400 mb-2">Decay Time</div>
              <div className="text-5xl font-mono">{decay.toFixed(1)} <span className="text-lg">s</span></div>
              <input type="range" min="0.5" max="4" step="0.1" value={decay} onChange={(e) => setDecay(Number(e.target.value))} className="w-full mt-6" />
            </div>
            <div className="bg-zinc-800 rounded-2xl p-8 text-center border border-violet-500">
              <div className="text-sm text-violet-400 mb-2">Recommended Tail</div>
              <div className="text-5xl font-mono text-violet-400">{reverbSettings.tailLength}</div>
              <div className="text-xs text-zinc-500">ms</div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-zinc-800 rounded-xl p-4">
              Short: {reverbSettings.recommended.short} ms
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              Medium: {reverbSettings.recommended.medium} ms
            </div>
            <div className="bg-zinc-800 rounded-xl p-4">
              Long: {reverbSettings.recommended.long} ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}