<script setup lang="ts">
import './style.css'
import { RouterView } from 'vue-router'
import Divider from '@/components/Divider.vue'
</script>

<template>
  <header
    class="w-full text-white flex items-center justify-center text-5xl flex-col px-6 gap-5 mb-5 mt-8"
  >
    <h1>Vuedoku</h1>
    <Divider />
  </header>
  <RouterView />
</template>
