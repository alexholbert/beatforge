'use client';

import { useState } from 'react';
import * as Tone from 'tone';

export default function RhythmExplorer() {
  const [bpm, setBpm] = useState(128);
  const [delayTime, setDelayTime] = useState(250);

  const playRhythm = async () => {
    await Tone.start();
    const kick = new Tone.MembraneSynth().toDestination();
    const hat = new Tone.MetalSynth().toDestination();
    const delay = new Tone.FeedbackDelay(delayTime / 1000, 0.3).toDestination();

    hat.connect(delay);

    const now = Tone.now();
    kick.triggerAttackRelease('C2', '8n', now);
    hat.triggerAttackRelease('32n', now + 0.25);
    kick.triggerAttackRelease('C2', '8n', now + 0.5);
    hat.triggerAttackRelease('32n', now + 0.75);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-5xl font-bold mb-8">Rhythm Explorer</h1>
      <div className="max-w-md">
        <label>BPM: {bpm}</label>
        <input type="range" min="80" max="160" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full" />
        <label>Delay (ms): {delayTime}</label>
        <input type="range" min="100" max="600" value={delayTime} onChange={(e) => setDelayTime(Number(e.target.value))} className="w-full" />
        <button onClick={playRhythm} className="mt-8 px-10 py-4 bg-violet-600 rounded-2xl">Play Groove</button>
      </div>
    </div>
  );
}