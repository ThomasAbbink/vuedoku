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
        class="before:bg-red-400/80 h-fit text-white before:content-[''] before:absolute before:inset-0 flex relative w-fit before:z-[-1] z-10 before:skew-x-12 px-1"
      >
        {{ game.difficulty }}</span
      >
    </div>
    <div class="flex gap-2">
      <Button @click="newGame"> New game </Button>
      <Button @click="resetGame">Reset</Button>
    </div>
    <ol
      v-if="game.grid"
      class="grid grid-cols-[repeat(9,2.5rem)] grid-rows-[repeat(9,2.5rem)] w-fit place-self-center"
    >
      <li
        v-for="cell in game.grid"
        :key="cell.index"
        class="[&:nth-child(3n+0)]:border-r-4 [&:nth-child(9n)]:border-r-0 border-slate-800 [&:nth-child(n+19)]:border-b-4 [&:nth-child(n+28)]:!border-b-0 [&:nth-child(n+46)]:!border-b-4 [&:nth-child(n+55)]:!border-b-0 select-none"
      >
        <input
          ref="itemRefs"
          min="1"
          max="9"
          type="number"
          :value="cell.isRevealed ? cell.value : cell.enteredValue"
          @input="(event) => handleInput(event, cell)"
          maxlength="1"
          :disabled="cell.isRevealed"
          class="text-slate-950 w-full h-full flex items-center justify-center text-center outline-none font-bold text-xl caret-transparent [input::-webkit-outer-spin-button] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-slate-500 selection:bg-transparent transition-colors duration-75"
          :class="{
            'bg-slate-300': cell.isRevealed,
            'bg-white hover:bg-sky-100 cursor-pointer focus-visible:bg-sky-200': !cell.isRevealed
          }"
        />
      </li>
    </ol>
  </div>
</template>
