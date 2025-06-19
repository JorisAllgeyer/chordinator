import { useShowKbBindings } from "../../context/ShowKbBindingsContext";

export default function ToggleKbDisplayButton() {
  const { showKbBindings, toggleKbBindings } = useShowKbBindings();

  return (
    <label>
      Keyboard bindings&nbsp;
      <button
        onClick={toggleKbBindings}
        className={showKbBindings ? " selected" : ""}
      >
        {showKbBindings ? "hide" : "show"}
      </button>
    </label>
  );
}
