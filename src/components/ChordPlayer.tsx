import { usePlayChord } from "../hooks/usePlayChord";
import { useCurrentChord } from "../context/CurrentChordContext";
import type { ChordType } from "../lib/chords";

export default function ChordPlayer({ root, type }: ChordPlayerProps) {
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

  return (
    <button
      onMouseDown={() => startChord(root, type)}
      onMouseUp={stopChord}
      onMouseLeave={stopChord}
      className={isActive ? "keybutton selected" : "keybutton"}
    >
      &nbsp;
    </button>
  );
}

type ChordPlayerProps = {
  root: string;
  type: ChordType;
};
