/**
 * The 12 dominant keys in natural order
 */
export const NOTES_NATURAL = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

/**
 * The 12 dominant keys in circle of fifths order
 */
export const NOTES_CYCLE_OF_FIFTHS = [
  "C#",
  "G#",
  "D#",
  "A#",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
];

export const WHITE_KEYS = NOTES_NATURAL.filter((note) => !note.includes("#"));
export const BLACK_KEYS = NOTES_NATURAL.filter((note) => note.includes("#"));
