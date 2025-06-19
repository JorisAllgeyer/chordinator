import { NOTES_NATURAL } from "./notes";

const SEMITONE_RATIO = Math.pow(2, 1 / 12);

export type BaseChordType = "maj" | "min" | "7";
export type ChordType = BaseChordType | "maj7" | "min7" | "add9" | "dim";

const chordIntervals: Record<ChordType, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  "7": [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  add9: [0, 4, 7, 14],
  dim: [0, 3, 6],
};

const noteToFreq = (note: number, octave: number): number =>
  440 * Math.pow(SEMITONE_RATIO, note + (octave - 4) * 12 - 9); // A4 = 440 Hz

function getChordIntervals(rootNote: string, type: ChordType) {
  const rootIndex = NOTES_NATURAL.indexOf(rootNote.toUpperCase());
  if (rootIndex === -1) throw new Error(`Note inconnue : ${rootNote}`);
  const intervals = chordIntervals[type];
  return intervals.map((i) => rootIndex + i);
}

export function getChordInfo(
  rootNote: string,
  type: ChordType,
  octave = 4
): { notes: string[]; frequencies: number[] } {
  const intervals = getChordIntervals(rootNote, type);
  return {
    notes: intervals.map((i) => NOTES_NATURAL[i % 12]),
    frequencies: intervals.map((i) =>
      noteToFreq(i % 12, octave + Math.floor(i / 12))
    ),
  };
}

export function getNoteFrequency(note: string, octave = 4) {
  const noteIndex = NOTES_NATURAL.indexOf(note.toUpperCase());
  if (noteIndex === -1) throw new Error(`Note inconnue : ${noteIndex}`);
  return noteToFreq(noteIndex, octave);
}
