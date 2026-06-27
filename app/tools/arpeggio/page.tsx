'use client';

import { useState } from 'react';
import * as Tone from 'tone';

const scales = {
  major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  minor: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
};

const patterns = ['Up', 'Down', 'Up-Down', 'Random'];

export default function ArpeggioGenerator() {
  const [root, setRoot] = useState('C');
  const [scaleType, setScaleType] = useState<'major' | 'minor'>('major');
  const [pattern, setPattern] = useState('Up');
  const [isPlaying, setIsPlaying] = useState(false);

  const playArpeggio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    await Tone.start();

    const synth = new Tone.Synth().toDestination();
    const scale = scales[scaleType];
    const rootIndex = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].indexOf(root);
    const notes = scale.map((note, i) => {
      const noteIndex = (rootIndex + i) % 12;
      return ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'][noteIndex] + '4';
    });

    let sequence = [...notes];
    if (pattern === 'Down') sequence = [...notes].reverse();
    if (pattern === 'Up-Down') sequence = [...notes, ...notes.slice(1, -1).reverse()];
    if (pattern === 'Random') sequence = notes.sort(() => Math.random() - 0.5);

    const now = Tone.now();
    sequence.forEach((note, index) => {
      synth.triggerAttackRelease(note, '8n', now + index * 0.2);
    });

    setTimeout(() => setIsPlaying(false), sequence.length * 200 + 500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Arpeggio Generator</h1>
        <p className="text-center text-zinc-400 mb-12">Create beautiful arpeggios with live playback</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <label className="block mb-3">Root Note</label>
              <select value={root} onChange={(e) => setRoot(e.target.value)} className="input w-full">
                {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-3">Scale</label>
              <div className="flex gap-3">
                <button onClick={() => setScaleType('major')} className={`flex-1 py-4 rounded-2xl ${scaleType === 'major' ? 'bg-violet-600' : 'bg-zinc-800'}`}>Major</button>
                <button onClick={() => setScaleType('minor')} className={`flex-1 py-4 rounded-2xl ${scaleType === 'minor' ? 'bg-violet-600' : 'bg-zinc-800'}`}>Minor</button>
              </div>
            </div>
            <div>
              <label className="block mb-3">Pattern</label>
              <select value={pattern} onChange={(e) => setPattern(e.target.value)} className="input w-full">
                {patterns.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={playArpeggio} 
              disabled={isPlaying}
              className="px-16 py-6 bg-violet-600 hover:bg-violet-700 rounded-3xl text-2xl font-semibold disabled:opacity-50"
            >
              {isPlaying ? 'Playing Arpeggio...' : '▶ Play Arpeggio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}