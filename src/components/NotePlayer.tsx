import { useChordNotes } from "../context/ChordNotesContext";
import { useShowKbBindings } from "../context/ShowKbBindingsContext";
import { usePlayNote } from "../hooks/usePlayNote";
import { NOTES_KEY_BINDINGS } from "../lib/keyboard-bindings";
import { NOTES_NATURAL } from "../lib/notes";

export default function NotePlayer({ note }: NotePlayerProps) {
  const { showKbBindings } = useShowKbBindings();
  const { notes } = useChordNotes();
  const { startNote, stopNote } = usePlayNote();

  const isNotePlaying = notes.includes(note);

  const noteIndex = NOTES_NATURAL.indexOf(note);
  const kbBinding = NOTES_KEY_BINDINGS[noteIndex];

  return (
    <button
      onMouseDown={() => startNote(note)}
      onMouseUp={() => stopNote(note)}
      onMouseLeave={() => stopNote(note)}
      className={`keybutton${isNotePlaying ? " selected" : ""}`}
    >
      {showKbBindings ? kbBinding : ""}
    </button>
  );
}

type NotePlayerProps = {
  note: string;
};
