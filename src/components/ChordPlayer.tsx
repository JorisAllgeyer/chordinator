import { usePlayChord } from "../hooks/usePlayChord";
import { useCurrentChord } from "../context/CurrentChordContext";
import type { BaseChordType, ChordType } from "../lib/chords";
import { useShowKbBindings } from "../context/ShowKbBindingsContext";
import { useChordLayout } from "../context/ChordLayoutContext";
import { NOTES_CYCLE_OF_FIFTHS, NOTES_NATURAL } from "../lib/notes";
import { CHORDS_KEY_BINDINGS } from "../lib/keyboard-bindings";

export default function ChordPlayer({ root, type }: ChordPlayerProps) {
  const { showKbBindings } = useShowKbBindings();
  const { chordLayout } = useChordLayout();
  const { startChord, stopChord } = usePlayChord();
  const { currentChord } = useCurrentChord();

  const isSameRoot = currentChord?.rootNote === root;

  const getBaseTypes = (chordType: ChordType): ChordType[] => {
    const map: Record<ChordType, ChordType[]> = {
      maj: ["maj"],
      min: ["min"],
      "7": ["7"],
      maj7: ["maj", "7"],
      min7: ["min", "7"],
      dim: ["maj", "min"],
      add9: ["maj", "min", "7"],
    };
    return map[chordType] ?? [];
  };

  const isActive =
    isSameRoot &&
    (currentChord?.chordType === type ||
      getBaseTypes(currentChord.chordType).includes(type));

  const notes =
    chordLayout === "natural" ? NOTES_NATURAL : NOTES_CYCLE_OF_FIFTHS;
  const noteIndex = notes.indexOf(root);
  const kbBinding = CHORDS_KEY_BINDINGS[type][noteIndex];

  return (
    <button
      onMouseDown={() => startChord(root, type)}
      onMouseUp={stopChord}
      onMouseLeave={stopChord}
      className={`keybutton${isActive ? " selected" : ""}`}
    >
      {showKbBindings ? kbBinding : undefined}
    </button>
  );
}

type ChordPlayerProps = {
  root: string;
  type: BaseChordType;
};
