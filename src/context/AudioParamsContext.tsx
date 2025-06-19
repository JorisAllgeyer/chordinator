import { createContext, useContext, useState, type ReactNode } from "react";
import { DEFAULT_AUDIO_PARAMS, type AudioParams } from "../lib/audio";

const AudioParamsContext = createContext<{
  audioParams: AudioParams;
  setAudioParams: (audioParams: AudioParams) => void;
}>({
  audioParams: DEFAULT_AUDIO_PARAMS,
  setAudioParams: () => {},
});

export function AudioParamsProvider({ children }: { children: ReactNode }) {
  const [audioParams, setAudioParams] =
    useState<AudioParams>(DEFAULT_AUDIO_PARAMS);

  return (
    <AudioParamsContext.Provider value={{ audioParams, setAudioParams }}>
      {children}
    </AudioParamsContext.Provider>
  );
}

export function useAudioParams() {
  return useContext(AudioParamsContext);
}
