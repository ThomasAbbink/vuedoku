<script setup lang="ts">
import './style.css'
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="w-full text-white flex items-center justify-center text-5xl flex-col">
    <h1 class="py-10">Vuedoku</h1>
    <hr class="rounded h-0.5 bg-sky-100 w-9/12" />
  </header>
  <RouterView />
</template>
