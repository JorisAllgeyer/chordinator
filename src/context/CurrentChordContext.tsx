import { createContext, useContext, useState } from "react";
import type { ChordType } from "../lib/chords";

type CurrentChord = {
  rootNote: string;
  chordType: ChordType;
} | null;

type CurrentChordContextType = {
  currentChord: CurrentChord;
  setCurrentChord: (chord: CurrentChord) => void;
};

const CurrentChordContext = createContext<CurrentChordContextType | undefined>(
  undefined
);

export function CurrentChordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentChord, setCurrentChord] = useState<CurrentChord>(null);

  return (
    <CurrentChordContext.Provider value={{ currentChord, setCurrentChord }}>
      {children}
    </CurrentChordContext.Provider>
  );
}

export function useCurrentChord() {
  const context = useContext(CurrentChordContext);
  if (!context) {
    throw new Error(
      "useCurrentChord must be used within a CurrentChordProvider"
    );
  }
  return context;
}
