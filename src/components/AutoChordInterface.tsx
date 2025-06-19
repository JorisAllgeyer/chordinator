import ChordPlayer from "./ChordPlayer";

import { useChordLayout } from "../context/ChordLayoutContext";
import { NOTES_NATURAL, NOTES_CYCLE_OF_FIFTHS } from "../lib/notes";

export default function AutoChordInterface() {
  const { chordLayout } = useChordLayout();
  const notes =
    chordLayout === "natural" ? NOTES_NATURAL : NOTES_CYCLE_OF_FIFTHS;

  return (
    <div className="kb-container">
      <div className="kb-row">
        <div className="kb-cell first"></div>
        {notes.map((note) => (
          <div className="kb-cell">{note}</div>
        ))}
      </div>
      <div className="kb-row">
        <div className="kb-cell first">Maj</div>
        {notes.map((note) => (
          <div className="kb-cell">
            <ChordPlayer root={note} type="maj" />
          </div>
        ))}
      </div>
      <div className="kb-row">
        <div className="kb-cell first">Min</div>
        <div className="kb-offset-1"></div>
        {notes.map((note) => (
          <div className="kb-cell">
            <ChordPlayer root={note} type="min" />
          </div>
        ))}
      </div>
      <div className="kb-row">
        <div className="kb-cell first">7th</div>
        <div className="kb-offset-1"></div>
        <div className="kb-offset-1"></div>
        {notes.map((note) => (
          <div className="kb-cell">
            <ChordPlayer root={note} type="7" />
          </div>
        ))}
      </div>
    </div>
  );
}
