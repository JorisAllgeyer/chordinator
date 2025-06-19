import { useKeyboardInterface } from "../../context/KeyboardInterfaceContext";

export default function KeyboardInterfaceSelector() {
  const { keyboardInterface, setKeyboardInterface } = useKeyboardInterface();
  return (
    <div>
      <label htmlFor="keyboard-interface-select">Keyboard Interface </label>
      <select
        id="keyboard-interface-select"
        value={keyboardInterface}
        onChange={(e) =>
          setKeyboardInterface(e.target.value as typeof keyboardInterface)
        }
      >
        <option value="autoChord">auto-chord</option>
        <option value="clavier">clavier</option>
      </select>
    </div>
  );
}
