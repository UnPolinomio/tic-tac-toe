import { Board, BoardIndex, boardIndexesList } from '../Board'
import { deepArrayClone, shuffleArray } from '../utils'

function minmax(board: Board, player: 1 | 2, maximizing: boolean, returnBestMove: true): [BoardIndex, BoardIndex]
function minmax(board: Board, player: 1 | 2, maximizing: boolean, returnBestMove?: false): number
function minmax(board: Board, player: 1 | 2, maximizing: boolean, returnBestMove: boolean = false): [BoardIndex, BoardIndex] | number {
    const [thereIsAWinner, winner] = board.checkIfPlayerWins(true)
    if (thereIsAWinner) {
        return player === winner ? 1 : -1
    }

    if (board.checkIfAllGridIsFilled()) {
        return 0
    }


    let bestMove: [BoardIndex, BoardIndex] = [1, 1]
    let score = maximizing ? -Infinity : Infinity
    let currentPlayer: 1 | 2 = (maximizing) ? (player) : (player === 1 ? 2 : 1)

    for(let i of shuffleArray(boardIndexesList)) {
        for (let j of shuffleArray(boardIndexesList)) {
            if ((maximizing && score === 1) || (!maximizing && score === -1)) {
                break
            }

            if (board.status[i][j] === 0) {
                const newStatus = deepArrayClone(board.status)
                newStatus[i][j] = currentPlayer
                const newBoard = new Board(newStatus)
                const newScore = minmax(newBoard, player, !maximizing)

                if ((maximizing && newScore > score) || (!maximizing && newScore < score)) {
                    score = newScore
                    bestMove = [i, j]
                }
            }
        } 
    }

    if (returnBestMove) {
        return bestMove
    } else {
        return score
    }
}

export function bestPlayer(currentBoard: Board, player: 1 | 2) {
    return minmax(currentBoard, player, true, true)
}
