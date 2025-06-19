import { createContext, useContext, useState, type ReactNode } from "react";

type ShowKbBindingsContextType = {
  showKbBindings: boolean;
  toggleKbBindings: () => void;
  setShowKbBindings: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowKbBindingsContext = createContext<
  ShowKbBindingsContextType | undefined
>(undefined);

export function ShowKbBindingsProvider({ children }: { children: ReactNode }) {
  const [showKbBindings, setShowKbBindings] = useState(false);

  const toggleKbBindings = () => setShowKbBindings((prev) => !prev);

  return (
    <ShowKbBindingsContext.Provider
      value={{ showKbBindings, toggleKbBindings, setShowKbBindings }}
    >
      {children}
    </ShowKbBindingsContext.Provider>
  );
}

export function useShowKbBindings() {
  const context = useContext(ShowKbBindingsContext);
  if (!context) {
    throw new Error(
      "useShowKbBindings must be used within a ShowKbBindingsProvider"
    );
  }
  return context;
}
