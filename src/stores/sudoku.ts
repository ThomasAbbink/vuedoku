import { create, empty, type Grid } from '@/model/Sudoku'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSudoku = defineStore('sudoku', () => {
  const grid = ref<Grid>({
    cells: localStorage.getItem('cells') ? JSON.parse(localStorage.getItem('cells') || '') : empty()
  })

  const newGame = () => {
    grid.value.cells = create({ difficulty: 'normal' })
  }

  const resetGame = () => {
    grid.value.cells = grid.value.cells.map((cell) => ({ ...cell, enteredValue: null }))
  }

  return { grid, newGame, resetGame }
})
