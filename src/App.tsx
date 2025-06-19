import ADSRSelector from "./components/inputs/ADSRSelector";
import AutoChordInterface from "./components/AutoChordInterface";
import KeyboardListener from "./components/KeyboardListener";
import ChordLayoutSelector from "./components/inputs/ChordLayoutSelector";
import OscillatorSelector from "./components/inputs/OscillatorSelector";
import VolumeSelector from "./components/inputs/VolumeSelector";
import "./style.css";
import ClavierInterface from "./components/ClavierInterface";
import KeyboardInterfaceSelector from "./components/inputs/KeyboardInterfaceSelector";
import ChordNotesDisplay from "./components/ChordNotesDisplay";
import ToggleKbDisplayButton from "./components/inputs/toggleKbBindingsButton";
import ActiveInterfaceDisplay from "./components/ActiveInterfaceDisplay";

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
          </div>
        </section>
        <section className="screen-section">
          <section className="sub-section">
            <KeyboardInterfaceSelector />
            <ToggleKbDisplayButton />
          </section>
        </section>
        <section className="screen-section">
          <div className="sub-section">
            <ChordLayoutSelector />
            <ActiveInterfaceDisplay type="autoChord"></ActiveInterfaceDisplay>
          </div>
          <div className="divider">
            <AutoChordInterface />
          </div>
        </section>
        <section className="screen-section">
          <div className="sub-section">
            <ClavierInterface />
            <ActiveInterfaceDisplay type="clavier"></ActiveInterfaceDisplay>
          </div>
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
