import ADSRSelector from "./components/inputs/ADSRSelector";
import AutoChordInterface from "./components/AutoChordInterface";

import KeyboardListener from "./components/KeyboardListner";
import NoteOrderSelector from "./components/inputs/NoteOrderSelector";
import OscillatorSelector from "./components/inputs/OscillatorSelector";
import VolumeSelector from "./components/inputs/VolumeSelector";
import "./style.css";
import ClavierInterface from "./components/ClavierInterface";
import KeyboardInterfaceSelector from "./components/inputs/KeyboardInterfaceSelector";
import ChordNotesDisplay from "./components/ChordNotesDisplay";

function App() {
  return (
    <div className="screen">
      <div className="container">
        <section className="screen-section">
          <h1>CHORDINATOR V1.0</h1>
        </section>
        <section className="screen-section">
          <div className="sub-section">
            <OscillatorSelector />
            <VolumeSelector />
          </div>
          <div className="sub-section divider">
            <ADSRSelector />
            <KeyboardInterfaceSelector />
          </div>
        </section>
        <section className="screen-section">
          <div className="sub-section">
            <AutoChordInterface />
            <NoteOrderSelector />
          </div>
        </section>
        <section className="screen-section">
          <ClavierInterface />
        </section>
        <section className="screen-section">
          <ChordNotesDisplay />
        </section>
      </div>
      <KeyboardListener />
    </div>
  );
}

export default App;
