import { createContext, useContext, useState, type ReactNode } from "react";

type ChordNotesContextType = {
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
};

const ChordNotesContext = createContext<ChordNotesContextType | undefined>(
  undefined
);

export const ChordNotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<string[]>([]);
  return (
    <ChordNotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </ChordNotesContext.Provider>
  );
};

export const useChordNotes = () => {
  const context = useContext(ChordNotesContext);
  if (!context)
    throw new Error("useChordNotes must be used within a ChordNotesProvider");
  return context;
};
