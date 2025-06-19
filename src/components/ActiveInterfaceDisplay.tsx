import {
  useKeyboardInterface,
  type KeyboardInterface,
} from "../context/KeyboardInterfaceContext";

export default function ActiveInterfaceDisplay({
  type,
}: ActiveInterfaceDisplayProps) {
  const { keyboardInterface, setKeyboardInterface } = useKeyboardInterface();
  const active = type === keyboardInterface;

  return (
    <div>
      Active :&nbsp;
      <button
        className={`keybutton${active ? " selected" : ""}`}
        onClick={() => setKeyboardInterface(type)}
      >
        {active ? "Y" : "N"}
      </button>
    </div>
  );
}

type ActiveInterfaceDisplayProps = {
  type: KeyboardInterface;
};
