import { BLACK_KEYS, WHITE_KEYS } from "../lib/notes";
import NotePlayer from "./NotePlayer";

export default function ClavierInterface() {
  return (
    <>
      <div className="kb-row">
        <div className="kb-cell first"></div>
        {WHITE_KEYS.map((note) => (
          <div className="kb-cell">{note}</div>
        ))}
      </div>
      <div className="kb-row">
        <div className="kb-cell first">Black</div>
        <div className="kb-offset-1"></div>
        {BLACK_KEYS.slice(0, 2).map((note) => (
          <div className="kb-cell">
            <NotePlayer note={note} />
          </div>
        ))}
        <div className="kb-cell">&nbsp;</div>
        {BLACK_KEYS.slice(2).map((note) => (
          <div className="kb-cell">
            <NotePlayer note={note} />
          </div>
        ))}
      </div>
      <div className="kb-row">
        <div className="kb-cell first">White</div>
        {WHITE_KEYS.map((note) => (
          <div className="kb-cell">
            <NotePlayer note={note} />
          </div>
        ))}
      </div>
    </>
  );
}
