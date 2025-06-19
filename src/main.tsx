import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChordNotesProvider } from "./context/ChordNotesContext.tsx";
import { NoteOrderProvider } from "./context/NoteOrderContext.tsx";
import { CurrentChordProvider } from "./context/CurrentChordContext.tsx";
import { KeyboardInterfaceContextProvider } from "./context/KeyboardInterfaceContext.tsx";
import { AudioParamsProvider } from "./context/AudioParamsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AudioParamsProvider>
      <ChordNotesProvider>
        <CurrentChordProvider>
          <NoteOrderProvider>
            <KeyboardInterfaceContextProvider>
              <App />
            </KeyboardInterfaceContextProvider>
          </NoteOrderProvider>
        </CurrentChordProvider>
      </ChordNotesProvider>
    </AudioParamsProvider>
  </StrictMode>
);
