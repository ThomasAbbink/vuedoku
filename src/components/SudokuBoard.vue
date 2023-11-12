<script setup lang="ts">
import { useSudoku, cellValues } from '@/stores/sudoku'
import type { CellValue, Cell } from '@/stores/sudoku'
import { ref, watch } from 'vue'

const { grid, $reset } = useSudoku()
$reset()

watch(
  grid.cells,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('cells', JSON.stringify(state))
  },
  { deep: true }
)

const itemRefs = ref<HTMLInputElement[]>([])
// umm wtf Vue. give me access to the input in an event handler. I don't
// want to keep a ref for all these inputs
const selectAll = (id: number) => {
  itemRefs.value[id].select()
}

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
  <ol
    class="grid grid-cols-[repeat(9,2.5rem)] grid-rows-[repeat(9,2.5rem)] w-fit place-self-center"
  >
    <li
      v-for="cell in grid.cells"
      :key="cell.index"
      class="[&:nth-child(3n+0)]:border-r-4 [&:nth-child(9n)]:border-r-0 border-slate-800 [&:nth-child(n+19)]:border-b-4 [&:nth-child(n+28)]:!border-b-0 [&:nth-child(n+46)]:!border-b-4 [&:nth-child(n+55)]:!border-b-0 select-none"
    >
      <input
        :title="cell.possibleValues.toString()"
        @focus="(_) => selectAll(cell.index)"
        ref="itemRefs"
        min="1"
        max="9"
        type="number"
        :value="cell.isInitial ? cell.value : cell.enteredValue"
        @input="(event) => handleInput(event, cell)"
        maxlength="1"
        :disabled="cell.isInitial"
        class="text-slate-950 w-full h-full flex items-center justify-center text-center outline-none font-bold text-xl caret-transparent [input::-webkit-outer-spin-button] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-slate-500 selection:bg-transparent transition-colors duration-75"
        :class="{
          'bg-slate-300': cell.isInitial,
          'bg-white hover:bg-sky-100 cursor-pointer focus-visible:bg-sky-200': !cell.isInitial,
          'border-green-500': cell.enteredValue === cell.value,
          'border-red-400': cell.enteredValue && cell.enteredValue !== cell.value
        }"
      />
    </li>
  </ol>
</template>
