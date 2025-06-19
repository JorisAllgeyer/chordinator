import { useCallback, useRef } from "react";
import { getNoteFrequency } from "../lib/chords";
import { useChordNotes } from "../context/ChordNotesContext";
import { applyAttackDecaySustain, applyRelease } from "../lib/audio";
import { useAudioParams } from "../context/AudioParamsContext";
import { useCurrentChord } from "../context/CurrentChordContext";

export function usePlayNote() {
  const { audioParams } = useAudioParams();
  const { setCurrentChord } = useCurrentChord();
  const { setNotes } = useChordNotes();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentGainRef = useRef<GainNode | null>(null);
  const currentOscRef = useRef<OscillatorNode | null>(null);

  const startNote = useCallback(
    (note: string) => {
      setCurrentChord(null);
      const frequency = getNoteFrequency(note);
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      setNotes([note]);

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = audioParams.oscillator;
      osc.frequency.value = frequency;

      applyAttackDecaySustain(
        audioCtx,
        gain,
        audioParams.envelope,
        audioParams.volume
      );

      osc.connect(gain).connect(audioCtx.destination);
      osc.start();

      currentOscRef.current = osc;
      currentGainRef.current = gain;
    },
    [setNotes, audioParams]
  );

  const stopNote = useCallback(() => {
    const gain = currentGainRef.current;
    const osc = currentOscRef.current;
    const audioCtx = audioCtxRef.current;

    if (!gain || !osc || !audioCtx) return;

    applyRelease(audioCtx, gain, osc, audioParams.envelope);

    currentGainRef.current = null;
    currentOscRef.current = null;
    audioCtxRef.current = null;
  }, [audioParams]);

  return { startNote, stopNote };
}
