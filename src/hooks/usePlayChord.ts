import { useCallback, useRef } from "react";
import { useChordNotes } from "../context/ChordNotesContext";
import { useCurrentChord } from "../context/CurrentChordContext";
import { getChordInfo, type ChordType } from "../lib/chords";
import { applyAttackDecaySustain, applyRelease } from "../lib/audio";
import { useAudioParams } from "../context/AudioParamsContext";

export function usePlayChord() {
  const { audioParams } = useAudioParams();
  const { setNotes } = useChordNotes();
  const { setCurrentChord } = useCurrentChord();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);

  const startChord = useCallback(
    (rootNote: string, chordType: ChordType) => {
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const { frequencies, notes } = getChordInfo(rootNote, chordType);

      // maj UI
      setCurrentChord({ rootNote, chordType });
      setNotes(notes);

      frequencies.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = audioParams.oscillator;
        osc.frequency.value = freq;

        applyAttackDecaySustain(
          audioCtx,
          gain,
          audioParams.envelope,
          audioParams.volume
        );

        osc.connect(gain).connect(audioCtx.destination);
        osc.start();

        oscNodesRef.current.push(osc);
        gainNodesRef.current.push(gain);
      });
    },
    [setNotes, setCurrentChord, audioParams]
  );

  const stopChord = useCallback(() => {
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;

    for (let i = 0; i < gainNodesRef.current.length; i++) {
      const gain = gainNodesRef.current[i];
      const osc = oscNodesRef.current[i];
      applyRelease(audioCtx, gain, osc, audioParams.envelope);
    }

    // Cleanup
    oscNodesRef.current = [];
    gainNodesRef.current = [];
    audioCtxRef.current = null;
  }, [audioParams]);

  return { startChord, stopChord };
}
