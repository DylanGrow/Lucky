<template>
  <div 
    class="dice-wrapper" 
    :class="[`skin-${skin}`, { 'hot-glow': isHot }]"
    role="img" 
    :aria-label="`Dice showing ${value}`"
    aria-live="polite"
  >
    <div class="dice-cube" :style="cubeStyle" :class="{ 'rolling': isRolling }">
      <div v-for="face in faces" :key="face.value" :class="['face', face.class]">
        <span v-for="dot in face.dots" :key="dot.id" class="dot" :style="dot.pos"></span>
      </div>
    </div>
    <div v-if="skin === 'devilsHorns'" class="horn horn-l"></div>
    <div v-if="skin === 'devilsHorns'" class="horn horn-r"></div>
    <div v-if="skin === 'neonHat'" class="tophat"></div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 1, validator: v => v >= 1 && v <= 6 },
  skin: { type: String, default: 'default' },
  isRolling: Boolean,
  isHot: Boolean // 3+ streak or Easter egg trigger
})

const cubeStyle = ref('')
const faces = [
  { value: 1, class: 'front', dots: [{ id: 'c', pos: { gridColumn: 2, gridRow: 2 } }] },
  { value: 2, class: 'back', dots: [
    { id: 'tl', pos: { gridColumn: 1, gridRow: 1 } }, { id: 'br', pos: { gridColumn: 3, gridRow: 3 } }
  ]},
  { value: 3, class: 'right', dots: [
    { id: 'tl', pos: { gridColumn: 1, gridRow: 1 } }, { id: 'c', pos: { gridColumn: 2, gridRow: 2 } }, { id: 'br', pos: { gridColumn: 3, gridRow: 3 } }
  ]},
  { value: 4, class: 'left', dots: [
    { id: 'tl', pos: { gridColumn: 1, gridRow: 1 } }, { id: 'tr', pos: { gridColumn: 3, gridRow: 1 } },
    { id: 'bl', pos: { gridColumn: 1, gridRow: 3 } }, { id: 'br', pos: { gridColumn: 3, gridRow: 3 } }
  ]},
  { value: 5, class: 'top', dots: [
    { id: 'tl', pos: { gridColumn: 1, gridRow: 1 } }, { id: 'tr', pos: { gridColumn: 3, gridRow: 1 } },
    { id: 'c', pos: { gridColumn: 2, gridRow: 2 } }, { id: 'bl', pos: { gridColumn: 1, gridRow: 3 } }, { id: 'br', pos: { gridColumn: 3, gridRow: 3 } }
  ]},
  { value: 6, class: 'bottom', dots: [
    { id: 'tl', pos: { gridColumn: 1, gridRow: 1 } }, { id: 'tc', pos: { gridColumn: 2, gridRow: 1 } }, { id: 'tr', pos: { gridColumn: 3, gridRow: 1 } },
    { id: 'bl', pos: { gridColumn: 1, gridRow: 3 } }, { id: 'bc', pos: { gridColumn: 2, gridRow: 3 } }, { id: 'br', pos: { gridColumn: 3, gridRow: 3 } }
  ]}
]

const rotations = {
  1: { x: 0, y: 0 }, 2: { x: -90, y: 0 }, 3: { x: 0, y: -90 },
  4: { x: 0, y: 90 }, 5: { x: 90, y: 0 }, 6: { x: 180, y: 0 }
}

watch(() => props.value, (newVal) => {
  if (props.isRolling) {
    const spinX = (Math.floor(Math.random() * 2) + 2) * 360
    const spinY = (Math.floor(Math.random() * 2) + 2) * 360
    const final = rotations[newVal]
    cubeStyle.value = `rotateX(${spinX + final.x}deg) rotateY(${spinY + final.y}deg)`
  } else {
    const final = rotations[newVal]
    cubeStyle.value = `rotateX(${final.x}deg) rotateY(${final.y}deg)`
  }
}, { immediate: true })
</script>

<style scoped>
.dice-wrapper {
  width: 80px; height: 80px; perspective: 400px; position: relative;
}
.dice-cube {
  width: 100%; height: 100%; position: absolute;
  transform-style: preserve-3d; transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.face {
  position: absolute; width: 100%; height: 100%; border-radius: 12px;
  display: grid; grid-template: repeat(3, 1fr) / repeat(3, 1fr); padding: 12px; box-sizing: border-box;
  backface-visibility: hidden; border: 3px solid var(--border, #333);
}
.front  { transform: rotateY(0deg) translateZ(40px); }
.back   { transform: rotateY(180deg) translateZ(40px); }
.right  { transform: rotateY(90deg) translateZ(40px); }
.left   { transform: rotateY(-90deg) translateZ(40px); }
.top    { transform: rotateX(90deg) translateZ(40px); }
.bottom { transform: rotateX(-90deg) translateZ(40px); }

.dot {
  width: 14px; height: 14px; border-radius: 50%; background: var(--dot, #111);
  align-self: center; justify-self: center; box-shadow
