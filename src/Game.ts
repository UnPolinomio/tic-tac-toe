import Board from './Board'
import { defaultTranslateDictionary, TranslateDictionaryType } from './translation'
import { getLanguage, getSquaredWindowSize } from './utils'

export interface GameConfigType {
    size?: number
    translateDictionary?: TranslateDictionaryType
}

const lang = getLanguage()
const defaultGameConfig: GameConfigType = {
    size: getSquaredWindowSize(),
    translateDictionary: defaultTranslateDictionary[Object.keys(defaultTranslateDictionary).includes(lang) ? lang : 'en']
}


export default class Game {
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    config: GameConfigType
    board: Board
    currentPlayer: 1 | 2

    static playerSymbols = ['X', 'O']

    constructor(canvas: HTMLCanvasElement, config?: GameConfigType) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.board = new Board()
        this.config = { ...defaultGameConfig, ...config }
        this.currentPlayer = 1

        this.setSize(this.config.size)

        this.convertSize = this.convertSize.bind(this)
        this.convertSizeArray = this.convertSizeArray.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    setSize(size: number) {
        this.config.size = size
    
        this.canvas.width = size
        this.canvas.height = size
    }

    protected convertSize(size: number) {
        return size * this.config.size / 100
    }

    protected convertSizeArray(...sizes: number[]) {
        return sizes.map(this.convertSize)
    }

    protected getMousePosition(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: (event.clientX - rect.left) * 100 / this.config.size,
            y: (event.clientY - rect.top) * 100 / this.config.size
        }
    }

    protected drawGrid() {
        const s = this.convertSize
        const ctx = this.ctx
        
        ctx.lineWidth = 7

        ctx.beginPath()

        ctx.moveTo(s(100/3), s(0))
        ctx.lineTo(s(100/3), s(100))

        ctx.moveTo(s(100 * 2/3), s(0))
        ctx.lineTo(s(100 * 2/3), s(100))

        ctx.moveTo(s(0), s(100/3))
        ctx.lineTo(s(100), s(100/3))

        ctx.moveTo(s(0), s(100 * 2/3))
        ctx.lineTo(s(100), s(100 * 2/3))
        
        ctx.stroke()
    }

    protected drawX(x: number, y: number) {
        const width = this.convertSize(100 / 7)

        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.beginPath()

        this.ctx.moveTo(-width/2, -width/2)
        this.ctx.lineTo(width/2, width/2)

        this.ctx.moveTo(-width/2, width/2)
        this.ctx.lineTo(width/2, -width/2)

        this.ctx.lineWidth = 5
        this.ctx.strokeStyle = 'rgb(200, 0, 0, 255)';
        this.ctx.stroke()

        this.ctx.restore()
    }

    protected drawO(x: number, y: number) {
        const width = this.convertSize(100 / 7)
        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.beginPath()

        this.ctx.arc(0, 0, width/2, 0, Math.PI*2, true)

        this.ctx.fillStyle = 'rgb(0, 0, 200, 255)'
        this.ctx.fill()

        this.ctx.restore()
    }

    redraw() {
        const s = this.convertSize
        const sa = this.convertSizeArray

        this.ctx.clearRect(0, 0, s(100), s(100))
        for (let i = 0; i < this.board.status.length; i++) {
            const row = this.board.status[i]

            for (let j = 0; j < row.length; j++) {
                const value = row[j]

                const [x, y] = sa(100/6 + j*100/3, 100/6 + i*100/3)

                if (value === 1) {
                    this.drawX(x, y)
                } else if (value === 2) {
                    this.drawO(x, y)
                }

            }
        }

        this.drawGrid()
    }

    handleClick(event: MouseEvent) {
        const { x, y } = this.getMousePosition(event)
        let i: number, j: number
        i = Math.min(2, Math.floor(y / (100 / 3)))
        j = Math.min(2, Math.floor(x / (100 / 3)))
        if (this.board.status[i][j] === 0 ){
            this.board.status[i][j] = this.currentPlayer
            const [x, y] = this.convertSizeArray(100/6 + j*100/3, 100/6 + i*100/3)

            if (this.currentPlayer === 1) {
                this.drawX(x, y)
            } else {
                this.drawO(x, y)
            }
        } else {
            return
        }
        
        const translate = this.config.translateDictionary
        const playerSymbol = `"${Game.playerSymbols[this.currentPlayer - 1]}"`
        let restartGame = false
        let winOrTie = false

        if (this.board.checkIfPlayerWins()) {
            restartGame = confirm(`${translate.playerWins.replace('$player', playerSymbol)} ${translate.restart}`)
            winOrTie = true
        } else if (this.board.checkIfAllGridIsFilled()) {
            restartGame = confirm(`${translate.tie} ${translate.restart}`)
            winOrTie = true
        }

        if (!winOrTie) {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
            return
        }

        this.currentPlayer = 1
        if (restartGame) {
            this.restart()
        } else {
            this.stop()
        }
    }

    start() {
        this.drawGrid()
        this.canvas.addEventListener('click', this.handleClick)
    }

    stop() {
        this.canvas.removeEventListener('click', this.handleClick)
    }

    restart() {
        this.board.status = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        this.redraw()
    }
}
