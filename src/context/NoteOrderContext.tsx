import { createContext, useContext, useState, type ReactNode } from "react";

export type NoteOrder = "natural" | "fifths";

const NoteOrderContext = createContext<{
  order: NoteOrder;
  setOrder: (order: NoteOrder) => void;
}>({
  order: "fifths",
  setOrder: () => {},
});

export function NoteOrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<NoteOrder>("fifths");

  return (
    <NoteOrderContext.Provider value={{ order, setOrder }}>
      {children}
    </NoteOrderContext.Provider>
  );
}

export function useNoteOrder() {
  return useContext(NoteOrderContext);
}
