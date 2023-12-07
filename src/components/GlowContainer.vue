<script setup lang="ts"></script>
<template>
  <div class="glow flex">
    <slot></slot>
  </div>
</template>

<style>
:root {
  --color-1: #812323;
  --color-2: #f87171;
  --color-3: #fef2f2;
}

@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.glow {
  position: relative;
}
.glow::before,
.glow::after {
  content: '';
  inset: -1rem;
  position: absolute;
  border-radius: 4px;
  background: conic-gradient(
    from var(--angle, 90deg),
    var(--color-1),
    var(--color-2),
    var(--color-3),
    var(--color-2),
    var(--color-1)
  );
  z-index: -1;
  animation: rotation 5s linear infinite;
}
.glow::after {
  filter: blur(5px);
}

@keyframes rotation {
  0% {
    --angle: 0deg;
  }
  100% {
    --angle: 360deg;
  }
}
</style>
