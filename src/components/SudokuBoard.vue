<script setup lang="ts">
import { useSudoku } from '@/stores/sudoku'
import type {} from '@/stores/sudoku'
import { watch } from 'vue'
import Button from '../components/Button.vue'
import {
  cellValues,
  type Cell,
  type CellValue,
  difficulties,
  type Difficulty
} from '@/model/Sudoku'
import Modal from './Modal.vue'
import { ref } from 'vue'
const { game, newGame, resetGame, persist } = useSudoku()
const modal = ref<InstanceType<typeof Modal>>()

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

const onClickNewGame = () => {
  modal.value?.show()
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
      <Button @click="onClickNewGame">New game</Button>
      <Button @click="resetGame">Reset</Button>
    </div>
    <Modal ref="modal">
      <ol class="flex flex-col gap-2">
        <li v-for="difficulty in Object.keys(difficulties)" :key="difficulty">
          <Button @click="newGame(difficulty as Difficulty)">{{ difficulty }}</Button>
        </li>
      </ol>
    </Modal>

    <ol
      v-if="game.grid"
      class="grid-flow-dense sticky grid grid-cols-[repeat(3,minmax(1rem,1fr))_4px_repeat(3,minmax(1rem,1fr))_4px_repeat(3,minmax(1rem,1fr))] grid-rows-[repeat(3,minmax(1rem,1fr))_4px_repeat(3,minmax(1rem,1fr))_4px_repeat(3,minmax(1rem,1fr))] w-fit place-self-center"
    >
      <!-- making the grid lines inside the actual grid -->
      <div class="col-start-4 row-span-full min-w-[4px]"></div>
      <div class="col-start-8 row-span-full min-w-[4px]"></div>
      <div class="col-span-full row-start-4 min-h-[4px]"></div>
      <div class="col-span-full row-start-[8] min-h-[4px]"></div>
      <li
        v-for="cell in game.grid"
        :key="cell.index"
        class="min-w-[2.5rem] w-10 aspect-square select-none"
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
