import { createContext, useContext, useState, type ReactNode } from "react";

export type ChordLayout = "natural" | "fifths";

const ChordLayoutContext = createContext<{
  chordLayout: ChordLayout;
  setChordLayout: React.Dispatch<React.SetStateAction<ChordLayout>>;
}>({
  chordLayout: "fifths",
  setChordLayout: () => {},
});

export function ChordLayoutProvider({ children }: { children: ReactNode }) {
  const [chordLayout, setChordLayout] = useState<ChordLayout>("fifths");

  return (
    <ChordLayoutContext.Provider value={{ chordLayout, setChordLayout }}>
      {children}
    </ChordLayoutContext.Provider>
  );
}

export function useChordLayout() {
  return useContext(ChordLayoutContext);
}
