import { useChordNotes } from "../context/ChordNotesContext";
import { useCurrentChord } from "../context/CurrentChordContext";

export default function ChordNotesDisplay() {
  const { notes } = useChordNotes();
  const { currentChord } = useCurrentChord();

  return (
    <div className="sub-section">
      <div>Notes : {notes.join(", ")}</div>
      <div style={{ width: 110 }}>
        Chord : {currentChord?.rootNote} {currentChord?.chordType}
      </div>
    </div>
  );
}
