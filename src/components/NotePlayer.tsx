import { useChordNotes } from "../context/ChordNotesContext";
import { usePlayNote } from "../hooks/usePlayNote";

export default function NotePlayer({ note }: NotePlayerProps) {
  const { notes } = useChordNotes();
  const { startNote, stopNote } = usePlayNote();

  const isNotePlaying = notes.includes(note);

  return (
    <button
      onMouseDown={() => startNote(note)}
      onMouseUp={stopNote}
      onMouseLeave={stopNote}
      className={isNotePlaying ? "keybutton selected" : "keybutton"}
    >
      &nbsp;
    </button>
  );
}

type NotePlayerProps = {
  note: string;
};
