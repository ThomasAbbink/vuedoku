export const cellValues = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export type CellValue = (typeof cellValues)[number]

export type Cell = {
  possibleValues: CellValue[]
  value?: CellValue
  isRevealed?: boolean
  enteredValue: CellValue | null
  index: number
  x: number
  y: number
  block: number
}

export type Difficulty = 'easy' | 'normal' | 'hard'

const difficulties: Record<Difficulty, number> = {
  easy: 0.5,
  normal: 0.4,
  hard: 0.3
}

export type Grid = {
  cells: Array<Cell>
}

export const emptyGrid = () => {
  return [...Array(81).keys()].map((i): Cell => {
    const blockRow = Math.floor(i / 27) % 3
    const blockCol = Math.floor((i % 9) / 3)
    return {
      x: i % 9,
      y: Math.floor(i / 9),
      block: 3 * blockRow + blockCol,
      possibleValues: Array.from(cellValues),
      index: i,
      enteredValue: null
    }
  })
}

export const createCells = ({ difficulty }: { difficulty: Difficulty }): Grid['cells'] => {
  let failure = false
  const cells = emptyGrid()

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
    propagatePossibleValues(nextCell, cells)

    //
    if (Math.random() < difficulties[difficulty]) {
      nextCell.isRevealed = true
    }
  }
  // This is a bit iffy. This method will run into a contradiction sometimes.
  // in that case, start over.
  if (failure) {
    return createCells({ difficulty })
  } else {
    return cells
  }
}

//warning: this mutates the array in place
const propagatePossibleValues = (cell: Cell, cells: Grid['cells']) => {
  cells
    .filter((affectedCell) => {
      return (
        affectedCell.x === cell.x || affectedCell.y === cell.y || affectedCell.block === cell.block
      )
    })
    .forEach((affectedCell) => {
      affectedCell.possibleValues = affectedCell.possibleValues.filter(
        (value) => value !== cell.value
      )
    })
}
