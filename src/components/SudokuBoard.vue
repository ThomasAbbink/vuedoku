<script setup lang="ts">
import { useSudoku } from '@/stores/sudoku'
import type {} from '@/stores/sudoku'
import { watch } from 'vue'
import Button from '../components/Button.vue'
import { cellValues, type Cell, type CellValue } from '@/model/Sudoku'

const { game, newGame, resetGame, persist } = useSudoku()

watch(
  game,
  (state) => {
    persist(state)
  },
  { deep: true }
)

const parseInput = (input: string): Cell['enteredValue'] => {
  if (!input) {
    return null
  }
  try {
    const digit = parseInt(input)
    if (!cellValues.includes(digit as CellValue)) {
      return null
    }

    return digit as CellValue
  } catch (error) {
    return null
  }
}

const handleInput = (event: Event, cell: Cell) => {
  const parsed = parseInput((event.target as HTMLInputElement).value?.slice(-1))
  ;(event.target as HTMLInputElement).value = parsed?.toString() || ''
  cell.enteredValue = parsed
}
</script>

<template>
  <div class="flex flex-col gap-6 items-center">
    <div class="flex items-end gap-2">
      <span class="font-mono text-white items-center flex text-sm h-fit">difficulty: </span
      ><span
        class="before:bg-red-400/80 h-fit text-white before:content-[''] before:absolute before:inset-0 relative w-fit before:z-[-1] before:skew-x-6 px-1"
      >
        {{ game.difficulty }}</span
      >
    </div>
    <div class="flex gap-4">
      <Button @click="newGame">New game</Button>
      <Button @click="resetGame">Reset</Button>
    </div>
    <ol
      v-if="game.grid"
      class="grid grid-cols-[repeat(9,minmax(1rem,1fr))] grid-rows-[repeat(9,minmax(1rem,1fr))] w-fit place-self-center glow"
    >
      <li
        v-for="cell in game.grid"
        :key="cell.index"
        class="min-w-[2.5rem] w-10 aspect-square [&:nth-child(3n+0)]:border-r-4 [&:nth-child(9n)]:border-r-0 border-[rgba(2,6,23,0.7)] [&:nth-child(n+19)]:border-b-4 [&:nth-child(n+28)]:!border-b-0 [&:nth-child(n+46)]:!border-b-4 [&:nth-child(n+55)]:!border-b-0 select-none"
      >
        <input
          min="1"
          max="9"
          type="number"
          :value="cell.isRevealed ? cell.value : cell.enteredValue"
          @input="(event) => handleInput(event, cell)"
          maxlength="1"
          :disabled="cell.isRevealed"
          class="text-slate-950 w-full h-full text-center outline-none font-bold text-xl caret-transparent [input::-webkit-outer-spin-button] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-slate-500 selection:bg-transparent transition-colors duration-75"
          :class="{
            'bg-slate-300': cell.isRevealed,
            'bg-white hover:bg-red-100 cursor-pointer focus-visible:bg-red-200': !cell.isRevealed
          }"
        />
      </li>
    </ol>
  </div>
</template>

<style>
:root {
  --color-1: #450a0a;
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
  inset: -0.3rem;
  position: absolute;

  background: conic-gradient(
    from var(--angle, 0deg),
    var(--color-1),
    var(--color-2),
    var(--color-3),
    var(--color-2),
    var(--color-1)
  );
  z-index: -1;
  animation: rotation 20s linear infinite;
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
