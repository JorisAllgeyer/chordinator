type OscillatorTypeEnum = "sine" | "square" | "sawtooth" | "triangle";

export type ADSR = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export const DEFAULT_ADSR: ADSR = {
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 1,
};

export type AudioParams = {
  volume: number;
  oscillator: OscillatorTypeEnum;
  envelope: ADSR;
};

export const DEFAULT_AUDIO_PARAMS: AudioParams = {
  volume: 0.25,
  oscillator: "sawtooth",
  envelope: DEFAULT_ADSR,
};

/**
 * Apply a given attack/decay/sustain envelope to an AudioContext
 */
export function applyAttackDecaySustain(
  audioCtx: AudioContext,
  gainNode: GainNode,
  adsr: ADSR,
  volume: number
) {
  const now = audioCtx.currentTime;

  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + adsr.attack);
  gainNode.gain.linearRampToValueAtTime(
    volume * adsr.sustain,
    now + adsr.attack + adsr.decay
  );
}

/**
 * Apply a given release envelope to an AudioContext
 */
export function applyRelease(
  audioCtx: AudioContext,
  gainNode: GainNode,
  oscillator: OscillatorNode,
  adsr: ADSR
) {
  const now = audioCtx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0, now + adsr.release);
  oscillator.stop(now + adsr.release);
}
