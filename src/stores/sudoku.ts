import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSudoku = defineStore('sudoku', () => {
  const grid = ref<Grid>({ cells: [] })

  const $reset = () => {
    let failure = false
    const cells = [...Array(81).keys()].map((i): Cell => {
      const blockRow = Math.floor(i / 27) % 3
      const blockCol = Math.floor((i % 9) / 3)
      return {
        x: i % 9,
        y: Math.floor(i / 9),
        block: 3 * blockRow + blockCol,
        possibleValues: Array.from(cellValues),
        isInitial: Math.random() > 0.6,
        index: i,
        enteredValue: null
      }
    })
    for (let i = 0; i < 81; i++) {
      // pick one of the empty cells that has the lowest number of possible values
      const nextCell = cells
        .filter((cell) => !cell.value)
        .reduce((acc, curr) => {
          return curr.possibleValues.length < acc.possibleValues.length ? curr : acc
        })
      if (nextCell.possibleValues.length === 0) {
        failure = true
        break
      }

      // enter one of the possible values
      nextCell.value =
        nextCell.possibleValues[Math.floor(Math.random() * nextCell.possibleValues.length)]

      // remove the selected value from the affected cells
      updatePossibleValues(nextCell, cells)
    }
    // This is a bit iffy. This method will run into a contradiction sometimes.
    // in that case, start over.
    if (failure) {
      $reset()
    } else {
      grid.value.cells = cells
    }
  }

  const updatePossibleValues = (cell: Cell, cells: Grid['cells']) => {
    cells
      .filter((affectedCell) => {
        return (
          affectedCell.x === cell.x ||
          affectedCell.y === cell.y ||
          affectedCell.block === cell.block
        )
      })
      .forEach((affectedCell) => {
        affectedCell.possibleValues = affectedCell.possibleValues.filter(
          (value) => value !== cell.value
        )
      })
  }

  return { grid, $reset }
})

export const cellValues = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export type CellValue = (typeof cellValues)[number]

export type Cell = {
  possibleValues: CellValue[]
  value?: CellValue
  isInitial: boolean
  enteredValue: CellValue | null
  index: number
  x: number
  y: number
  block: number
}

type Grid = {
  cells: Array<Cell>
}
