'use client';

import { useState } from 'react';

const noteToFreq = (note: string, octave: number = 4) => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const index = notes.indexOf(note);
  return 440 * Math.pow(2, (index - 9 + (octave - 4) * 12) / 12);
};

export default function FrequencyNote() {
  const [freq, setFreq] = useState(440);
  const [note, setNote] = useState('A');
  const [octave, setOctave] = useState(4);

  const calculatedFreq = noteToFreq(note, octave);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Frequency ↔ Note Converter</h1>
        <p className="text-center text-zinc-400 mb-12">Perfect for synth tuning and sound design</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 grid md:grid-cols-2 gap-12">
          <div>
            <label className="block mb-4">Frequency (Hz)</label>
            <input
              type="range"
              min="20"
              max="2000"
              value={freq}
              onChange={(e) => setFreq(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-6xl font-mono text-center mt-8">{freq}</div>
          </div>
          <div>
            <label className="block mb-4">Note</label>
            <div className="flex gap-4">
              <select value={note} onChange={(e) => setNote(e.target.value)} className="input flex-1">
                {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <input type="number" value={octave} onChange={(e) => setOctave(Number(e.target.value))} className="input w-24" />
            </div>
            <div className="text-6xl font-mono text-center mt-8 text-violet-400">{calculatedFreq.toFixed(2)} Hz</div>
          </div>
        </div>
      </div>
    </div>
  );
}