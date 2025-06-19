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

  // Map pour suivre toutes les notes jouées actuellement
  const activeNotesRef = useRef<
    Map<string, { osc: OscillatorNode; gain: GainNode; ctx: AudioContext }>
  >(new Map());

  const startNote = useCallback(
    (note: string) => {
      setCurrentChord(null);

      // Ignore si la note est déjà en cours de lecture
      if (activeNotesRef.current.has(note)) return;

      const frequency = getNoteFrequency(note);
      const audioCtx = new AudioContext();

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

      activeNotesRef.current.set(note, { osc, gain, ctx: audioCtx });

      // Ajoute dans le state les notes actives
      setNotes([...activeNotesRef.current.keys()]);
    },
    [setCurrentChord, setNotes, audioParams]
  );

  const stopNote = useCallback(
    (note: string) => {
      const noteData = activeNotesRef.current.get(note);
      if (!noteData) return;

      const { osc, gain, ctx } = noteData;

      applyRelease(ctx, gain, osc, audioParams.envelope);

      activeNotesRef.current.delete(note);

      setTimeout(() => {
        ctx.close().catch((e) => {
          console.warn(`AudioContext already closed: ${e.message}`);
        });
      }, (audioParams.envelope.release + 0.1) * 1000);
    },
    [setNotes, audioParams]
  );

  return { startNote, stopNote };
}
