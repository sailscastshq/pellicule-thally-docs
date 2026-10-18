<script setup>
import { computed } from 'vue'
import { useFrame } from 'pellicule'

const frame = useFrame()
const clamp = v => Math.max(0, Math.min(1, v))
const ease = v => 1 - Math.pow(1 - clamp(v), 3)
const between = (f, a, b) => ease((f - a) / (b - a))
const mix = (a, b, t) => a + (b - a) * t
const visible = (f, a, b) => clamp((f - a) / 16) * clamp((b - f) / 16)
const film = computed(() => {
  const f = frame.value
  const morph = between(f, 40, 100)
  return {
    f, morph,
    opening: visible(f, -12, 182),
    leftBar: between(f, 0, 34), rightBar: between(f, 10, 44),
    letters: between(f, 70, 120),
    idea: visible(f, 174, 396),
    ideaText: between(f, 188, 224),
    frameScene: visible(f, 384, 666),
    frameText: between(f, 400, 438),
    progress: clamp((f - 420) / 216),
    closing: visible(f, 654, 910),
    closingMorph: between(f, 678, 740),
    closingLetters: between(f, 710, 760),
    caption: between(f, 760, 790),
    motion: Math.sin((f - 180) / 50),
    wave: Math.sin(f / 12),
  }
})
</script>

<template>
  <svg class="film" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" aria-label="Pellicule logo reveal and motion film">
    <defs>
      <radialGradient id="light"><stop stop-color="#42B883" stop-opacity=".14"/><stop offset="1" stop-color="#42B883" stop-opacity="0"/></radialGradient>
      <linearGradient id="trail"><stop stop-color="#42B883" stop-opacity="0"/><stop offset="1" stop-color="#42B883" stop-opacity=".6"/></linearGradient>
      <clipPath id="left-reveal"><rect :x="39 * (1 - film.letters)" y="0" :width="39 * film.letters" height="40"/></clipPath>
      <clipPath id="right-reveal"><rect x="58" y="0" :width="76 * film.letters" height="40"/></clipPath>
      <clipPath id="closing-left"><rect :x="39 * (1 - film.closingLetters)" y="0" :width="39 * film.closingLetters" height="40"/></clipPath>
      <clipPath id="closing-right"><rect x="58" y="0" :width="76 * film.closingLetters" height="40"/></clipPath>
    </defs>
    <rect width="1280" height="720" fill="#070C0A"/>
    <ellipse cx="640" cy="360" rx="600" ry="430" fill="url(#light)" :opacity=".65 + .25 * Math.sin(film.f / 70)"/>

    <!-- The lettering and final bar geometry match the supplied Pellicule SVG. -->
    <g :opacity="film.opening" transform="translate(305 225) scale(5)">
      <text x="0" y="32" class="logo" clip-path="url(#left-reveal)">pe</text>
      <rect :x="mix(59, 39, film.morph)" :y="mix(4 - 40 * film.leftBar, 7, film.morph)" width="5" :height="mix(2 + 63 * film.leftBar, 25, film.morph)" fill="#42B883"/>
      <rect :x="mix(69, 49, film.morph)" :y="mix(4 - 40 * film.rightBar, 7, film.morph)" width="5" :height="mix(2 + 63 * film.rightBar, 25, film.morph)" fill="#42B883"/>
      <text x="58" y="32" class="logo" clip-path="url(#right-reveal)">icule</text>
    </g>

    <g :opacity="film.idea">
      <g :transform="`translate(${110 - 24 * (1 - film.ideaText)} 0)`" :opacity="film.ideaText">
        <text x="0" y="300" class="headline">Make an idea</text>
        <text x="0" y="390" class="headline" fill="#42B883">move.</text>
        <text x="0" y="470" class="body">Describe it. Write it. Render it.</text>
      </g>
      <g :transform="`translate(930 330) rotate(${film.motion * 13})`">
        <rect :x="-65 + film.motion * 14" :y="-130 - film.motion * 18" width="32" height="240" fill="#42B883"/>
        <rect :x="25 - film.motion * 14" :y="-100 + film.motion * 18" width="32" height="240" fill="#42B883"/>
        <path d="M-150 170H150" stroke="#42B883" stroke-opacity=".3"/>
      </g>
    </g>

    <g :opacity="film.frameScene">
      <g :transform="`translate(0 ${22 * (1 - film.frameText)})`" :opacity="film.frameText">
        <text x="110" y="245" class="headline">Every frame.</text>
        <text x="110" y="335" class="headline" fill="#42B883">On your terms.</text>
        <text x="110" y="410" class="body">Timing, movement and sound — in one scene.</text>
      </g>
      <path d="M110 525H1170" stroke="#284637" stroke-width="2"/>
      <path :d="`M110 525H${110 + 1060 * film.progress}`" stroke="#42B883" stroke-width="3"/>
      <g v-for="tick in 31" :key="tick" :transform="`translate(${110 + (tick - 1) * 1060 / 30} 525)`">
        <path :d="tick % 5 === 1 ? 'M0 -12V12' : 'M0 -6V6'" :stroke="tick / 31 <= film.progress ? '#42B883' : '#284637'"/>
      </g>
      <circle :cx="110 + 1060 * film.progress" cy="525" r="6" fill="#EDF7F1"/>
      <text x="110" y="585" class="measure">900 frames / 30 fps</text>
      <text x="1170" y="585" text-anchor="end" class="measure">30 seconds</text>
    </g>

    <g :opacity="film.closing">
      <g transform="translate(305 225) scale(5)">
        <text x="0" y="32" class="logo" clip-path="url(#closing-left)">pe</text>
        <rect :x="mix(59, 39, film.closingMorph)" :y="mix(-8, 7, film.closingMorph)" width="5" :height="mix(45, 25, film.closingMorph)" fill="#42B883"/>
        <rect :x="mix(69, 49, film.closingMorph)" :y="mix(-8, 7, film.closingMorph)" width="5" :height="mix(45, 25, film.closingMorph)" fill="#42B883"/>
        <text x="58" y="32" class="logo" clip-path="url(#closing-right)">icule</text>
      </g>
      <text x="640" :y="475 + 12 * (1 - film.caption)" text-anchor="middle" class="body" :opacity="film.caption">From a Vue scene to an MP4.</text>
    </g>
  </svg>
</template>

<style>
* { box-sizing: border-box; }
html, body, #app { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #070C0A; }
.film { display: block; width: 100%; height: 100%; font-family: Arial, Helvetica, sans-serif; }
.logo { font: 700 32px Arial, Helvetica, sans-serif; fill: #EDF7F1; }
.headline { font-size: 78px; font-weight: 700; letter-spacing: -3px; fill: #EDF7F1; }
.headline[fill] { fill: #42B883; }
.body { font-size: 27px; fill: #B7C7BE; letter-spacing: -.35px; }
.measure { font-family: Menlo, Consolas, monospace; font-size: 20px; fill: #A1B5A9; }
</style>
