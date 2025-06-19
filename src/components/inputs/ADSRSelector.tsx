import { useAudioParams } from "../../context/AudioParamsContext";

export default function ADSRSelector() {
  const { audioParams, setAudioParams } = useAudioParams();

  const timeOpts = [
    { label: "fast", value: 0 },
    { label: "soft", value: 0.25 },
    { label: "long", value: 1 },
  ];

  const valueOpts = [
    { label: "25%", value: 0.25 },
    { label: "50%", value: 0.5 },
    { label: "75%", value: 0.75 },
    { label: "100%", value: 1 },
  ];

  const options = {
    attack: [...timeOpts],
    decay: [...timeOpts],
    sustain: [...valueOpts],
    release: [...timeOpts],
  };

  const changeADSR = (
    event: React.ChangeEvent<HTMLSelectElement>,
    param: string
  ) => {
    const adsr = {
      ...audioParams.envelope,
      [param]: parseFloat(event.target.value),
    };
    setAudioParams({ ...audioParams, envelope: adsr });
  };

  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {(["attack", "decay", "sustain", "release"] as const).map((param) => (
        <div key={param}>
          <label style={{ display: "block", marginBottom: 4 }}>
            {param.charAt(0).toUpperCase() + param.slice(1)}
          </label>
          <select
            value={audioParams.envelope[param]}
            onChange={(e) => changeADSR(e, param)}
          >
            {options[param].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
