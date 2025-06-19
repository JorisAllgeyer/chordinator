import { useAudioParams } from "../../context/AudioParamsContext";

export default function VolumeSelector() {
  const { audioParams, setAudioParams } = useAudioParams();

  const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    setAudioParams({ ...audioParams, volume });
  };

  return (
    <label>
      Volume&nbsp;
      <input
        type="range"
        min={0}
        max={0.5} // prevent overdrive
        step={0.05}
        value={audioParams.volume}
        onChange={changeVolume}
      />
    </label>
  );
}
