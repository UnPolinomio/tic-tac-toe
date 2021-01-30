import { Board, BoardIndex, boardIndexesList } from '../Board'
import { getRandomInt } from '../utils'

export function randomAutoPlayer(currentBoard: Board) {
    const board = currentBoard.status
    const options: [BoardIndex, BoardIndex][] = []

    for (let i of boardIndexesList) {
        const row = board[i]
        for (let j of boardIndexesList) {
            if (row[j] === 0) {
                options.push([i, j])
            }
        }
    }

    if (options.length > 0) {
        const index = getRandomInt(0, options.length)
        return options[index]
    } else {
        throw new Error('Game already ended')
    }
}
