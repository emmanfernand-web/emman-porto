/**
 * Tiny guitar synth using the Web Audio API (Karplus-Strong plucked string).
 * No audio files. Buffers are generated once per note and cached.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const cache = new Map<number, AudioBuffer>();

/** Standard tuning, low to high. */
export const OPEN_STRINGS = [
  { name: "E", freq: 82.41, octave: 2 },
  { name: "A", freq: 110.0, octave: 2 },
  { name: "D", freq: 146.83, octave: 3 },
  { name: "G", freq: 196.0, octave: 3 },
  { name: "B", freq: 246.94, octave: 3 },
  { name: "E", freq: 329.63, octave: 4 },
] as const;

/** Open E major chord, for the intro strum. */
export const E_MAJOR = [82.41, 123.47, 164.81, 207.65, 246.94, 329.63];

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35; // keep it quiet
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function pluckBuffer(c: AudioContext, freq: number) {
  const hit = cache.get(freq);
  if (hit) return hit;
  const seconds = 2.2;
  const sr = c.sampleRate;
  const length = Math.floor(sr * seconds);
  const buf = c.createBuffer(1, length, sr);
  const data = buf.getChannelData(0);
  const period = Math.max(2, Math.round(sr / freq));
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
  let p = 0;
  for (let i = 0; i < length; i++) {
    const next = (p + 1) % period;
    const v = ring[p];
    data[i] = v;
    ring[p] = (v + ring[next]) * 0.4985; // averaging + decay
    p = next;
  }
  cache.set(freq, buf);
  return buf;
}

export function pluck(freq: number, volume = 1, delay = 0) {
  const c = getCtx();
  if (!c || !master) return;
  const src = c.createBufferSource();
  src.buffer = pluckBuffer(c, freq);
  const g = c.createGain();
  g.gain.value = Math.min(1, Math.max(0, volume));
  src.connect(g).connect(master);
  src.start(c.currentTime + delay);
}

export function strum(freqs: number[] = E_MAJOR, spread = 0.06) {
  freqs.forEach((f, i) => pluck(f, 0.8, i * spread));
}

/** Call from a click handler so mobile browsers allow audio. */
export function unlockAudio() {
  getCtx();
}
