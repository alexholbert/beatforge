'use client';

import { useState } from 'react';
import * as Tone from 'tone';

const scales = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

export default function MelodyGenerator() {
  const [root, setRoot] = useState('C');
  const [scaleType, setScaleType] = useState<'major' | 'minor'>('major');
  const [length, setLength] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateMelody = () => {
    const scale = scales[scaleType];
    const rootIndex = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].indexOf(root);
    const melody = Array.from({ length }, () => {
      const degree = scale[Math.floor(Math.random() * scale.length)];
      const octave = Math.random() > 0.5 ? 4 : 5;
      const noteIndex = (rootIndex + degree) % 12;
      return ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'][noteIndex] + octave;
    });
    return melody;
  };

  const playMelody = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    await Tone.start();

    const synth = new Tone.Synth().toDestination();
    const melody = generateMelody();
    const now = Tone.now();

    melody.forEach((note, index) => {
      synth.triggerAttackRelease(note, '8n', now + index * 0.25);
    });

    setTimeout(() => setIsPlaying(false), melody.length * 250 + 500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Melody Generator</h1>
        <p className="text-center text-zinc-400 mb-12">Instant melodic ideas with live playback</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <label>Root</label>
              <select value={root} onChange={(e) => setRoot(e.target.value)} className="input w-full">
                {['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Scale</label>
              <div className="flex gap-3">
                <button onClick={() => setScaleType('major')} className={`flex-1 py-4 rounded-2xl ${scaleType === 'major' ? 'bg-violet-600' : 'bg-zinc-800'}`}>Major</button>
                <button onClick={() => setScaleType('minor')} className={`flex-1 py-4 rounded-2xl ${scaleType === 'minor' ? 'bg-violet-600' : 'bg-zinc-800'}`}>Minor</button>
              </div>
            </div>
            <div>
              <label>Length: {length} notes</label>
              <input type="range" min="4" max="16" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          <button onClick={playMelody} disabled={isPlaying} className="w-full py-6 bg-violet-600 hover:bg-violet-700 rounded-3xl text-2xl font-semibold">
            {isPlaying ? 'Playing Melody...' : '▶ Generate & Play Melody'}
          </button>
        </div>
      </div>
    </div>
  );
}