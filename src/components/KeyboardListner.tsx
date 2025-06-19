import { useEffect, useRef } from "react";
import {
  getChordFromKeys,
  getNoteFromKeyPressed,
} from "../lib/keyboard-bindings";
import { useNoteOrder } from "../context/NoteOrderContext";
import { NOTES_NATURAL, NOTES_CYCLE_OF_FIFTHS } from "../lib/notes";
import { usePlayChord } from "../hooks/usePlayChord";
import { useAudioParams } from "../context/AudioParamsContext";
import { usePlayNote } from "../hooks/usePlayNote";
import { useKeyboardInterface } from "../context/KeyboardInterfaceContext";

export default function KeyboardListener() {
  const { audioParams } = useAudioParams();
  const { order } = useNoteOrder();
  const { keyboardInterface } = useKeyboardInterface();

  const { startChord, stopChord } = usePlayChord();
  const { startNote, stopNote } = usePlayNote();

  const notesContext =
    order === "natural" ? NOTES_NATURAL : NOTES_CYCLE_OF_FIFTHS;

  // Pour éviter de rejouer le même accord si la touche est maintenue
  const activeKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeKeysRef.current.has(event.key)) return; // déjà enfoncée
      activeKeysRef.current.add(event.key);

      if (keyboardInterface === "autoChord") {
        const chordFromKeys = getChordFromKeys(
          activeKeysRef.current,
          notesContext
        );

        if (chordFromKeys) {
          stopChord();
          const { rootNote, chordType } = chordFromKeys;
          startChord(rootNote, chordType);
        }
      } else {
        const note = getNoteFromKeyPressed(event);
        if (note) {
          startNote(note);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (activeKeysRef.current.has(e.key)) {
        if (keyboardInterface === "autoChord") {
          stopChord();
        } else {
          stopNote();
        }
        activeKeysRef.current.delete(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    audioParams,
    keyboardInterface,
    startChord,
    stopChord,
    startNote,
    stopNote,
    notesContext,
  ]);

  return null;
}
