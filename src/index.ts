import Game from './Game'
import { getSquaredWindowSize } from './utils'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const TicTacToe = new Game(canvas)
TicTacToe.start()

window.addEventListener('resize', (event) => {
    TicTacToe.setSize(getSquaredWindowSize())
    TicTacToe.draw()
})
