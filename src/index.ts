import { Game } from './Game'
import { getMixedPlayer } from './autoplay/mixedPlayer'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const TicTacToe = new Game(canvas, {
    autoPlayer: getMixedPlayer(0.6)
})
