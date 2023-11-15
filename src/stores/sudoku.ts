import { createCells, emptyGrid, type Grid } from '@/model/Sudoku'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSudoku = defineStore('sudoku', () => {
  const grid = ref<Grid>({ cells: emptyGrid() })

  const $reset = () => {
    grid.value.cells = createCells({ difficulty: 'normal' })
  }

  return { grid, $reset }
})
