import { useChordLayout } from "../../context/ChordLayoutContext";

export default function ChordLayoutSelector() {
  const { chordLayout, setChordLayout } = useChordLayout();

  return (
    <label htmlFor="chord-layout-select">
      Layout&nbsp;
      <select
        id="chord-layout-select"
        value={chordLayout}
        onChange={(e) => setChordLayout(e.target.value as typeof chordLayout)}
      >
        <option value="fifths">fifths</option>
        <option value="natural">natural</option>
      </select>
    </label>
  );
}
