<script setup>
import { computed } from 'vue'
import { useFrame, interpolate } from 'pellicule'
const frame = useFrame()
const opacity = computed(() => interpolate(frame.value, [0, 20], [0, 1]))
const y = computed(() => interpolate(frame.value, [0, 20], [24, 0]))
</script>

<template>
  <main class="video">
    <div :style="{ opacity, transform: `translateY(${y}px)` }">
      <h1>Hello, video.</h1>
      <span>An idea. A prompt. A video.</span>
    </div>
  </main>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; }
.video { width: 100%; height: 100%; display: grid; place-items: center; background: #111827; color: #f8fafc; font-family: Arial, sans-serif; }
h1 { font-size: 84px; margin: 18px 0; letter-spacing: -4px; }
span { color: #cbd5e1; font-size: 22px; }
</style>
