import { writeFileSync } from 'node:fs'

// Original score for this example. No recordings, samples, or third-party music.
// Deterministic synthesis: a four-note pluck, a quiet pad, and soft scene swells.
const rate = 48000
const seconds = 30
const count = rate * seconds
const left = new Float64Array(count)
const right = new Float64Array(count)
const tau = 2 * Math.PI
let seed = 42
const noise = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2147483648 - 1 }

function note(start, frequency, duration, volume, pan = 0) {
  const first = Math.floor(start * rate)
  for (let j = 0; j < duration * rate && first + j < count; j++) {
    const t = j / rate
    const attack = Math.min(1, t / .012)
    const end = Math.min(1, (duration - t) / .3)
    const env = attack * Math.exp(-t * 2.1) * end
    const bell = Math.sin(tau * frequency * t) + .22 * Math.sin(tau * frequency * 2.002 * t) + .06 * Math.sin(tau * frequency * 3 * t)
    const value = volume * env * bell
    left[first + j] += value * Math.sqrt((1 - pan) / 2)
    right[first + j] += value * Math.sqrt((1 + pan) / 2)
  }
}

// A rising D–A–E–F# phrase, deliberately unlike a cinematic two-hit ident.
for (const offset of [0, 22.2]) {
  note(offset + .24, 293.6648, 3.8, .19, -.45)
  note(offset + .84, 440, 3.6, .16, .4)
  note(offset + 1.48, 659.2551, 3.4, .13, -.2)
  note(offset + 2.3, 739.9888, 4.2, .12, .3)
}
for (const start of [6.1, 13.1]) {
  note(start, 220, 4, .10, -.3)
  note(start + .38, 329.6276, 4, .08, .3)
}

let filtered = 0
for (let i = 0; i < count; i++) {
  const t = i / rate
  const fade = Math.min(1, t / 2, (seconds - t) / 3)
  const pad = .021 * (Math.sin(tau * 146.8324 * t) + .45 * Math.sin(tau * 220 * t))
  const movement = .6 + .4 * Math.sin(tau * .075 * t)
  filtered = .94 * filtered + .06 * noise()
  const swell = [1.7, 5.7, 12.7, 21.7].reduce((v, at) => v + Math.exp(-Math.pow((t - at) / .4, 2)), 0)
  const air = .13 * filtered * swell
  left[i] += (pad * movement + air) * fade
  right[i] += (pad * (.95 - .05 * Math.sin(t * .7)) + air) * fade
}

let peak = 0
for (let i = 0; i < count; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]))
const gain = .72 / peak
const bytes = Buffer.alloc(44 + count * 4)
bytes.write('RIFF', 0); bytes.writeUInt32LE(bytes.length - 8, 4); bytes.write('WAVEfmt ', 8)
bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(2, 22)
bytes.writeUInt32LE(rate, 24); bytes.writeUInt32LE(rate * 4, 28)
bytes.writeUInt16LE(4, 32); bytes.writeUInt16LE(16, 34); bytes.write('data', 36); bytes.writeUInt32LE(count * 4, 40)
for (let i = 0; i < count; i++) {
  bytes.writeInt16LE(Math.round(left[i] * gain * 32767), 44 + i * 4)
  bytes.writeInt16LE(Math.round(right[i] * gain * 32767), 46 + i * 4)
}
writeFileSync('soundtrack.wav', bytes)
console.log('Created soundtrack.wav: original 30-second stereo score, 48 kHz, peak -2.85 dBFS.')
