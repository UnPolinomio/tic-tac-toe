import { allEqual } from './utils'

type FourNumberTuple = [number, number, number, number]
type ThreeNumberTuple = [number, number, number]

export default class Game {
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    size: number
    status: [ThreeNumberTuple, ThreeNumberTuple, ThreeNumberTuple]
    currentPlayer: 1 | 2

    constructor(canvas: HTMLCanvasElement, size: number) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.status = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        this.currentPlayer = 1

        this.setSize(size)

        this.convertSize = this.convertSize.bind(this)
        this.convertSizeArray = this.convertSizeArray.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    setSize(size: number) {
        this.size = size
    
        this.canvas.width = size
        this.canvas.height = size
    }

    protected convertSize(size: number) {
        return size * this.size/ 100 as number
    }

    protected convertSizeArray(...sizes: number[]) {
        return sizes.map(this.convertSize)
    }

    protected getMousePosition(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect()
        return {
            x: (event.clientX - rect.left) * 100 / this.size,
            y: (event.clientY - rect.top) * 100 / this.size
        }
    }

    private drawGrid() {
        const s = this.convertSize
        const sa = this.convertSizeArray
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

    private drawX(x: number, y: number) {
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
    private drawO(x: number, y: number) {
        const width = this.convertSize(100 / 7)
        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.beginPath()

        this.ctx.arc(0, 0, width/2, 0, Math.PI*2, true)

        this.ctx.fillStyle = 'rgb(0, 0, 200, 255)'
        this.ctx.fill()

        this.ctx.restore()
    }

    draw() {
        const sa = this.convertSizeArray

        for (let i = 0; i < this.status.length; i++) {
            const row = this.status[i]

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

    private arrayAllEqualAndNotZero(array: any[]) {
        return allEqual(array) && !array.includes(0)
    }

    private checkIfPlayerWins() {
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

    private checkIfAllGridIsFilled() {
        return this.status.every(row => row.every(stat => stat != 0))
    }

    handleClick(event: MouseEvent) {
        const { x, y } = this.getMousePosition(event)
        let i: number, j: number
        i = Math.min(2, Math.floor(y / (100 / 3)))
        j = Math.min(2, Math.floor(x / (100 / 3)))
        if (this.status[i][j] === 0 ){
            this.status[i][j] = this.currentPlayer
        } else {
            return;
        }

        this.draw()

        if (this.checkIfPlayerWins()) {
            const restartGame = confirm(`El jugador ${this.currentPlayer} ha ganado. ¿Desea reiniciar el juego?`)
            if (restartGame) {
                this.restart()
            } else {
                this.stop()
                return
            }
            return
        } else if (this.checkIfAllGridIsFilled()) {
            const restartGame = confirm('Es empate. ¿Desea reiniciar el juego?')
            if (restartGame) {
                this.restart()
            } else {
                this.stop()
                return
            }
        }
        
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
    }

    start() {
        this.draw()
        this.canvas.addEventListener('click', this.handleClick)
    }

    stop() {
        this.canvas.removeEventListener('click', this.handleClick)
    }

    restart() {
        const s = this.convertSize
        this.status = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        this.ctx.clearRect(0, 0, s(100), s(100))
        this.draw()
    }
}