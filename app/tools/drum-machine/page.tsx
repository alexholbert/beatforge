// app/tools/drum-machine/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

const drumSounds = [
  { name: 'Kick', note: 'C2', color: 'bg-red-500' },
  { name: 'Snare', note: 'D2', color: 'bg-orange-500' },
  { name: 'Clap', note: 'E2', color: 'bg-yellow-500' },
  { name: 'Closed Hat', note: 'F2', color: 'bg-emerald-500' },
  { name: 'Open Hat', note: 'G2', color: 'bg-cyan-500' },
  { name: 'Perc', note: 'A2', color: 'bg-purple-500' },
];

export default function DrumMachine() {
  const [bpm, setBpm] = useState(128);
  const [swing, setSwing] = useState(55);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<boolean[][]>(
    drumSounds.map(() => Array(16).fill(false))
  );
  const [currentStep, setCurrentStep] = useState(0);

  const synthsRef = useRef<Tone.Synth[]>([]);

  useEffect(() => {
    const init = async () => {
      await Tone.start();
      const synths = drumSounds.map(() => 
        new Tone.Synth().toDestination()
      );
      synthsRef.current = synths;
    };
    init();

    return () => {
      synthsRef.current.forEach(s => s.dispose());
    };
  }, []);

  const toggleStep = (row: number, col: number) => {
    const newPattern = pattern.map(r => [...r]);
    newPattern[row][col] = !newPattern[row][col];
    setPattern(newPattern);
  };

  const playStep = (step: number) => {
    pattern.forEach((row, i) => {
      if (row[step]) {
        synthsRef.current[i]?.triggerAttackRelease(drumSounds[i].note, '8n');
      }
    });
  };

  const startStop = async () => {
    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
      setCurrentStep(0);
    } else {
      await Tone.start();
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.swing = (swing - 50) / 50;

      const loop = new Tone.Sequence((time, step) => {
        playStep(step);
        setCurrentStep(step);
      }, Array.from({ length: 16 }, (_, i) => i), '16n');

      loop.start(0);
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const randomize = () => {
    const newPattern = drumSounds.map(() => 
      Array(16).fill(false).map(() => Math.random() > 0.6)
    );
    setPattern(newPattern);
  };

  const clear = () => {
    setPattern(drumSounds.map(() => Array(16).fill(false)));
  };

  const exportMIDI = () => {
    alert("✅ MIDI Export - Full version coming in next update!\n\nFor now, you can record the pattern in your DAW.");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <h1 className="text-5xl font-bold tracking-tighter text-center mb-4">Drum Machine</h1>
        <p className="text-center text-zinc-400 mb-12">16-Step Sequencer with Swing</p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <div>
              <label>BPM</label>
              <input type="number" value={bpm} onChange={e => setBpm(Number(e.target.value))} className="input w-28 text-center text-3xl" />
            </div>
            <div>
              <label>Swing: {swing}%</label>
              <input type="range" min="50" max="75" value={swing} onChange={e => setSwing(Number(e.target.value))} className="w-64 accent-violet-500" />
            </div>
            <button onClick={startStop} className="px-10 py-4 bg-violet-600 hover:bg-violet-700 rounded-2xl text-xl font-semibold">
              {isPlaying ? 'STOP' : '▶ PLAY'}
            </button>
            <button onClick={randomize} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl">Random</button>
            <button onClick={clear} className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl">Clear</button>
            <button onClick={exportMIDI} className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl">Export MIDI</button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          {drumSounds.map((sound, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-6 mb-8 last:mb-0">
              <div className={`w-32 font-bold ${sound.color.replace('bg-', 'text-')}`}>
                {sound.name}
              </div>
              <div className="flex gap-3 flex-1">
                {Array.from({ length: 16 }).map((_, col) => (
                  <button
                    key={col}
                    onClick={() => toggleStep(rowIndex, col)}
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl transition-all ${
                      pattern[rowIndex][col] 
                        ? 'bg-violet-600 border-violet-400 scale-110' 
                        : 'bg-zinc-950 border-zinc-700 hover:bg-zinc-800'
                    } ${currentStep === col && isPlaying ? 'ring-2 ring-white' : ''}`}
                  >
                    {pattern[rowIndex][col] ? '●' : ''}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}