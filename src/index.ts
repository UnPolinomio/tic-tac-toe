import Game from './Game'
import { getCanvasSize } from './utils'

const canvas = document.createElement('canvas')
const size = getCanvasSize()
const TicTacToe = new Game(canvas, size)

document.body.appendChild(canvas)
TicTacToe.start()

window.addEventListener('resize', (event) => {
    TicTacToe.setSize(getCanvasSize())
    TicTacToe.draw()
})
