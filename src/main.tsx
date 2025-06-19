import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChordNotesProvider } from "./context/ChordNotesContext.tsx";
import { ChordLayoutProvider } from "./context/ChordLayoutContext.tsx";
import { CurrentChordProvider } from "./context/CurrentChordContext.tsx";
import { KeyboardInterfaceContextProvider } from "./context/KeyboardInterfaceContext.tsx";
import { AudioParamsProvider } from "./context/AudioParamsContext.tsx";
import { ShowKbBindingsProvider } from "./context/ShowKbBindingsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioParamsProvider>
      <ChordNotesProvider>
        <CurrentChordProvider>
          <ChordLayoutProvider>
            <KeyboardInterfaceContextProvider>
              <ShowKbBindingsProvider>
                <App />
              </ShowKbBindingsProvider>
            </KeyboardInterfaceContextProvider>
          </ChordLayoutProvider>
        </CurrentChordProvider>
      </ChordNotesProvider>
    </AudioParamsProvider>
  </StrictMode>
);
