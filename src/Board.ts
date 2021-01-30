import { allEqual } from './utils'

export type BoardValues = 0 | 1 | 2
export type BoardIndex = 0 | 1 | 2
export type BoardRow = [BoardValues, BoardValues, BoardValues]
export type BoardType = [BoardRow, BoardRow, BoardRow]
export const boardIndexesList: [0, 1, 2] = [0, 1, 2]
export const emptyBoard: BoardType = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

export class Board {
    status: BoardType

    constructor(initialBoard = emptyBoard) {
        this.status = initialBoard
    }

    protected arrayAllEqualAndNotZero(array: any[]) {
        return allEqual(array) && !array.includes(0)
    }

    checkIfAllGridIsFilled() {
        return this.status.every(row => row.every(stat => stat != 0))
    }

    checkIfPlayerWins(returnWinner: true): [boolean, 1 | 2 | null]
    checkIfPlayerWins(returnWinner?: false): boolean
    checkIfPlayerWins(returnWinner = false) {
        const status = this.status
        const returner = (winner: 1 | 2) => {
            if (returnWinner) {
                return [true, winner]
            }
            return true
        }

        // Check rows
        for (let i of boardIndexesList) {
            if (this.arrayAllEqualAndNotZero(status[i])) return returner(status[i][0] as 1 | 2)
        }

        // Check columns
        for (let j of boardIndexesList) {
            const column = status.map(row => row[j])
            if (this.arrayAllEqualAndNotZero(column)) return returner(column[0] as 1 | 2)
        }

        // Check diagonals
        const diagonal1 = [status[0][0], status[1][1], status[2][2]]
        if (this.arrayAllEqualAndNotZero(diagonal1)) return returner(diagonal1[0] as 1 | 2)
        
        const diagonal2 = [status[2][0], status[1][1], status[0][2]]
        if (this.arrayAllEqualAndNotZero(diagonal2)) return returner(diagonal2[0] as 1 | 2)


        if (returnWinner) {
            return [false, null]
        } else {
            return false
        }
    }
}
