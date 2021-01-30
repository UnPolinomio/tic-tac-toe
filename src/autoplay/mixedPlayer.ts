import { Board } from '../Board'
import { bestPlayer } from './bestPlayer'
import { randomAutoPlayer } from './randomPlayer'

/**
 * 
 * @param goodness How good a player is. It should be between 0 and 1.
 */
export function getMixedPlayer(goodness: number) {
    if (!(goodness >= 0 && goodness <=1)) {
        throw new Error(`Bad goodness argument. Expected value between 0 and 1. Got ${goodness}`)
    }

    return function (currentBoard: Board, player: 1 | 2) {
        if (Math.random() < goodness) {
            return bestPlayer(currentBoard, player)
        } else {
            return randomAutoPlayer(currentBoard)
        }
    }
}
