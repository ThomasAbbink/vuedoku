import { create, empty, type Game } from '@/model/Sudoku'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSudoku = defineStore('sudoku', () => {
  const fromLocal = fromLocalStorage()
  const game = ref<Game>(fromLocal || { grid: empty(), difficulty: 'normal' })

  const newGame = () => {
    game.value.grid = create({ difficulty: 'easy' })
  }

  const resetGame = () => {
    game.value.grid = game.value.grid.map((cell) => ({ ...cell, enteredValue: null }))
  }

  const persist = (game: Game) => {
    localStorage.setItem('game', JSON.stringify(game))
  }

  return { game, newGame, resetGame, persist }
})

const fromLocalStorage = (): Game | null => {
  const stringvalue = localStorage.getItem('game')
  return stringvalue ? JSON.parse(stringvalue) : null
}
