'use client';

import { useState } from 'react';
import * as Tone from 'tone';

const commonProgressions = [
  ['I', 'V', 'vi', 'IV'],
  ['ii', 'V', 'I'],
  ['I', 'vi', 'IV', 'V'],
  ['vi', 'IV', 'I', 'V'],
  ['I', 'IV', 'V'],
];

const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export default function ChordProgression() {
  const [key, setKey] = useState('C');
  const [mode, setMode] = useState<'major' | 'minor'>('major');
  const [progression, setProgression] = useState(['I', 'V', 'vi', 'IV']);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateNew = () => {
    const randomProg = commonProgressions[Math.floor(Math.random() * commonProgressions.length)];
    setProgression(randomProg);
  };

  const playProgression = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    await Tone.start();

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    const duration = 1.2;

    progression.forEach((roman, index) => {
      const chordNotes = getChordNotes(roman, key, mode);
      synth.triggerAttackRelease(chordNotes, duration * 0.9, now + index * duration);
    });

    setTimeout(() => setIsPlaying(false), progression.length * duration * 1000);
  };

  const getChordNotes = (roman: string, rootKey: string, isMinor: boolean) => {
    const base = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    const rootIndex = base.indexOf(rootKey);
    let notes = [];

    if (['I', 'IV', 'V'].includes(roman)) {
      notes = [rootKey, base[(rootIndex + 4) % 12], base[(rootIndex + 7) % 12]];
    } else {
      notes = [rootKey, base[(rootIndex + 3) % 12], base[(rootIndex + 7) % 12]];
    }
    return notes;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <h1 className="text-6xl font-bold text-center mb-4">Chord Progression Generator</h1>
        <p className="text-center text-zinc-400 mb-12">Generate beautiful progressions with live playback</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <div className="flex justify-center gap-8 mb-12">
            <div>
              <label className="block mb-3 text-sm">Key</label>
              <div className="flex flex-wrap gap-2">
                {keys.map(k => (
                  <button key={k} onClick={() => setKey(k)} className={`px-5 py-2 rounded-xl ${key === k ? 'bg-violet-600' : 'bg-zinc-800'}`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-3 text-sm">Mode</label>
              <div className="flex gap-3">
                <button onClick={() => setMode('major')} className={`px-8 py-3 rounded-xl ${mode === 'major' ? 'bg-violet-600' : 'bg-zinc-800'}`}>Major</button>
                <button onClick={() => setMode('minor')} className={`px-8 py-3 rounded-xl ${mode === 'minor' ? 'bg-violet-600' : 'bg-zinc-800'}`}>Minor</button>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="text-4xl font-bold mb-6">{progression.join(' - ')}</div>
            <div className="flex gap-4 justify-center">
              <button onClick={generateNew} className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl">New Progression</button>
              <button onClick={playProgression} disabled={isPlaying} className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-2xl disabled:opacity-50">
                {isPlaying ? 'Playing...' : '▶ Play'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}