import { useAudioParams } from "../../context/AudioParamsContext";

const options = ["sine", "square", "sawtooth", "triangle"] as const;

export default function OscillatorSelector() {
  const { audioParams, setAudioParams } = useAudioParams();

  const changeOscillatorType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const oscillatorType = event.target.value as (typeof options)[number];
    setAudioParams({ ...audioParams, oscillator: oscillatorType });
  };

  return (
    <label>
      Oscillator&nbsp;
      <select value={audioParams.oscillator} onChange={changeOscillatorType}>
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </label>
  );
}
