import { allEqual } from './utils'

export type BoardType = (0 | 1 | 2)[][]
export const emptyBoard: BoardType = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]


export default class Board {
    status: BoardType

    constructor(initialBoard = emptyBoard) {
        this.status = initialBoard
    }

    private arrayAllEqualAndNotZero(array: any[]) {
        return allEqual(array) && !array.includes(0)
    }

    checkIfAllGridIsFilled() {
        return this.status.every(row => row.every(stat => stat != 0))
    }

    checkIfPlayerWins() {
        const status = this.status

        // Check rows
        for (let i of [0, 1, 2]) {
            if (this.arrayAllEqualAndNotZero(status[i])) return true
        }

        // Check columns
        for (let j of [0, 1, 2]) {
            const column = status.map(row => row[j])
            if (this.arrayAllEqualAndNotZero(column)) return true
        }

        // Check diagonals
        const diagonal1 = [status[0][0], status[1][1], status[2][2]]
        if (this.arrayAllEqualAndNotZero(diagonal1)) return true
        
        const diagonal2 = [status[2][0], status[1][1], status[0][2]]
        if (this.arrayAllEqualAndNotZero(diagonal2)) return true


        return false
    }
}
