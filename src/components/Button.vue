<script setup lang="ts"></script>
<template>
  <button
    class="grid grid-cols-[0.3rem_1fr_0.3rem] grid-rows-[0.3rem_1fr_0.3rem] group max-w-fit overflow-hidden select-none"
  >
    <div class="row-start-2 row-span-2 col-start-2 col-span-2 bg-red-400 w-full h-full"></div>
    <div
      class="row-start-1 col-start-1 row-span-2 col-span-2 relative bg-white group-hover:bg-sky-100 group-active:bg-sky-200 p-2 font-bold font-mono group-active:translate-x-[0.3rem] group-active:translate-y-[0.3rem] transition-all duration-150"
    >
      <slot></slot>
    </div>
  </button>
</template>
