// app/tools/drum-machine/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import MidiWriter from 'midi-writer-js';

const drumSounds = [
  { name: 'Kick', note: 'C2', color: 'bg-red-500' },
  { name: 'Snare', note: 'D2', color: 'bg-orange-500' },
  { name: 'Clap', note: 'E2', color: 'bg-yellow-500' },
  { name: 'Closed Hat', note: 'F2', color: 'bg-emerald-500' },
  { name: 'Open Hat', note: 'G2', color: 'bg-cyan-500' },
  { name: '808 Perc', note: 'A2', color: 'bg-purple-500' },
];

const steps = Array.from({ length: 16 }, (_, i) => i);

export default function DrumMachine() {
  const [bpm, setBpm] = useState(128);
  const [swing, setSwing] = useState(55);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<boolean[][]>(
    drumSounds.map(() => Array(16).fill(false))
  );
  const [currentStep, setCurrentStep] = useState(0);

  const synthsRef = useRef<Tone.Synth[]>([]);
  const transportRef = useRef<Tone.Transport>();

  // Initialize Tone.js
  useEffect(() => {
    const initTone = async () => {
      await Tone.start();
      const synths = drumSounds.map((sound, index) => {
        const synth = new Tone.Synth({
          oscillator: { type: index === 0 ? 'sine' : 'square' },
          envelope: { attack: 0.001, decay: index === 0 ? 0.3 : 0.1, sustain: 0 }
        }).toDestination();
        return synth;
      });
      synthsRef.current = synths;
    };
    initTone();

    return () => {
      synthsRef.current.forEach(s => s.dispose());
    };
  }, []);

  // Transport setup
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.swing = (swing - 50) / 50; // Convert to Tone.js swing value
  }, [bpm, swing]);

  const toggleStep = (row: number, col: number) => {
    const newPattern = [...pattern];
    newPattern[row][col] = !newPattern[row][col];
    setPattern(newPattern);
  };

  const playStep = (step: number) => {
    pattern.forEach((row, rowIndex) => {
      if (row[step]) {
        const synth = synthsRef.current[rowIndex];
        if (synth) {
          synth.triggerAttackRelease(drumSounds[rowIndex].note, '8n');
        }
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
      Tone.Transport.scheduleRepeat((time) => {
        playStep(currentStep);
        setCurrentStep((prev) => (prev + 1) % 16);
      }, '16n');
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const randomizePattern = () => {
    const newPattern = drumSounds.map(() =>
      steps.map(() => Math.random() > 0.65)
    );
    setPattern(newPattern);
  };

  const clearPattern = () => {
    setPattern(drumSounds.map(() => Array(16).fill(false)));
  };

  const exportMIDI = () => {
    const track = new MidiWriter.Track();
    track.setTempo(bpm);

    pattern.forEach((row, rowIndex) => {
      row.forEach((isActive, step) => {
        if (isActive) {
          const midiNote = 36 + rowIndex * 2; // Standard drum mapping
          track.addEvent(new MidiWriter.NoteEvent({
            pitch: midiNote,
            duration: '16',
            startTick: step * 120,
            velocity: 100
          }));
        }
      });
    });

    const write = new MidiWriter.Writer(track);
    const link = document.createElement('a');
    link.href = write.base64Uri();
    link.download = `beatforge-drum-pattern-${bpm}bpm.mid`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <h1 className="text-5xl font-bold tracking-tighter text-center mb-4">Drum Machine</h1>
        <p className="text-center text-zinc-400 mb-12">16-Step Sequencer with Swing + MIDI Export</p>

        {/* Controls */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">BPM</label>
              <input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="input w-28 text-3xl text-center"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Swing {swing}%</label>
              <input
                type="range"
                min="50"
                max="75"
                value={swing}
                onChange={(e) => setSwing(Number(e.target.value))}
                className="w-64 accent-violet-500"
              />
            </div>

            <div className="flex gap-4">
              <button onClick={startStop} className="btn-primary px-10 py-4 rounded-2xl text-xl font-semibold">
                {isPlaying ? 'STOP' : 'PLAY'}
              </button>
              <button onClick={randomizePattern} className="btn px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl">
                🎲 Random
              </button>
              <button onClick={clearPattern} className="btn px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl">
                Clear
              </button>
              <button onClick={exportMIDI} className="btn px-6 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl">
                ↓ Export MIDI
              </button>
            </div>
          </div>
        </div>

        {/* Sequencer Grid */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          {drumSounds.map((sound, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4 mb-6 last:mb-0">
              <div className={`w-28 text-right font-mono ${sound.color.replace('bg-', 'text-')} font-bold`}>
                {sound.name}
              </div>
              <div className="flex gap-2 flex-1">
                {steps.map((step) => (
                  <button
                    key={step}
                    onClick={() => toggleStep(rowIndex, step)}
                    className={`step w-12 h-12 rounded-xl border border-zinc-700 flex items-center justify-center text-xl transition-all ${
                      pattern[rowIndex][step]
                        ? 'step-active bg-violet-600 border-violet-400'
                        : 'bg-zinc-950 hover:bg-zinc-800'
                    } ${currentStep === step && isPlaying ? 'ring-2 ring-white' : ''}`}
                  >
                    {pattern[rowIndex][step] ? '●' : ''}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-zinc-500">
          Tip: Click squares to place hits • Use Swing for groove • Export MIDI works in Ableton, FL Studio, Logic
        </div>
      </div>
    </div>
  );
}