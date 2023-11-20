<script setup lang="ts"></script>

<template>
  <div class="divider" />
</template>

<style scoped>
.divider {
  background: white;
  width: 100%;
  margin: 0 2rem 0 2rem;
  height: 2px;
  position: relative;
  border-radius: 1rem;
}
.divider::before,
.divider::after {
  content: '';
  inset: 0;
  position: absolute;
  border-radius: 1rem;
  background: conic-gradient(
    from var(--angle, 0deg),
    var(--color-1),
    var(--color-2),
    var(--color-3),
    var(--color-2),
    var(--color-1)
  );
  z-index: -1;
  animation: rotation 10s linear infinite;
}
.divider::after {
  filter: blur(6px);
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
