import { createContext, useContext, useState, type ReactNode } from "react";

export type KeyboardInterface = "autoChord" | "clavier";

const KeyboardInterfaceContext = createContext<{
  keyboardInterface: KeyboardInterface;
  setKeyboardInterface: (keyboardInterface: KeyboardInterface) => void;
}>({
  keyboardInterface: "autoChord",
  setKeyboardInterface: () => {},
});

export function KeyboardInterfaceContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [keyboardInterface, setKeyboardInterface] =
    useState<KeyboardInterface>("autoChord");

  return (
    <KeyboardInterfaceContext.Provider
      value={{ keyboardInterface, setKeyboardInterface }}
    >
      {children}
    </KeyboardInterfaceContext.Provider>
  );
}

export function useKeyboardInterface() {
  return useContext(KeyboardInterfaceContext);
}
