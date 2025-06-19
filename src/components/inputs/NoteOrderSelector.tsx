import { useNoteOrder } from "../../context/NoteOrderContext";

export default function NoteOrderSelector() {
  const { order, setOrder } = useNoteOrder();

  return (
    <label htmlFor="note-order-select">
      Layout&nbsp;
      <select
        id="note-order-select"
        value={order}
        onChange={(e) => setOrder(e.target.value as typeof order)}
      >
        <option value="fifths">fifths</option>
        <option value="natural">natural</option>
      </select>
    </label>
  );
}
