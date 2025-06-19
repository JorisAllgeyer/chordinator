import type { BaseChordType, ChordType } from "./chords";
import { NOTES_NATURAL } from "./notes";

/**
 * Default key bindings for a MacBook keyboard in autochord mode
 */
export const CHORDS_KEY_BINDINGS: Record<"maj" | "min" | "7", string[]> = {
  maj: ["&", "é", '"', "'", "(", "§", "è", "!", "ç", "à", ")", "-"],
  min: ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "^", "$"],
  "7": ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "ù", "`"],
};

/**
 * Possible combinaisons of keys for chord types
 */
const COMBINATION_TO_CHORD_TYPE: Record<string, ChordType> = {
  maj: "maj",
  min: "min",
  "7": "7",
  "maj+7": "maj7",
  "min+7": "min7",
  "maj+min": "dim",
  "maj+min+7": "add9",
};

/**
 * Default key bindings for a MacBook keyboard in clavier mode
 */
export const NOTES_KEY_BINDINGS = [
  "<",
  "q",
  "w",
  "s",
  "x",
  "c",
  "f",
  "v",
  "g",
  "b",
  "h",
  "n",
];

/**
 * Main chord type available on the autochord visual keyboard
 */
const baseChordType = ["maj", "min", "7"] as const;

/**
 * For a set of pressed keys determines the chord (root note + type) to play
 */
export function getChordFromKeys(
  pressedKeys: Set<string>,
  notes: string[]
): { rootNote: string; chordType: ChordType } | undefined {
  const normalizedPressed = new Set(
    Array.from(pressedKeys).map((key) => key.toLowerCase())
  );

  for (let i = 0; i < 12; i++) {
    const typesPressed: BaseChordType[] = [];

    for (const type of baseChordType) {
      const key = CHORDS_KEY_BINDINGS[type][i]?.toLowerCase();
      if (key && normalizedPressed.has(key)) {
        typesPressed.push(type);
      }
    }

    if (typesPressed.length > 0) {
      const typeOrder = baseChordType;
      const sortedCombo = typeOrder
        .filter((t) => typesPressed.includes(t))
        .join("+");

      const chordType = COMBINATION_TO_CHORD_TYPE[sortedCombo];

      if (chordType) {
        return {
          rootNote: notes[i],
          chordType,
        };
      }
    }
  }

  return undefined;
}

/**
 * From a single pressed key (clavier mode) determines the note to play
 */
export function getNoteFromKeyPressed(event: KeyboardEvent) {
  const key = event.key.toLowerCase();
  const index = NOTES_KEY_BINDINGS.indexOf(key);
  return index !== -1 ? NOTES_NATURAL[index] : undefined;
}
