import { Canvas } from "./canvas"

function getNear<T>(array: Array<T>, index: number, rule: number) {
    let _index = index + rule
    switch (_index) {
        case -1:
            _index = array.length - 1
            break;
        case array.length:
            _index = 0
            break;
        default:
            break;
    }
    return array[_index]
}

function numberToArray(number: number) {
    const array = (number.toString(2)).split('').map(x => x === '1')

    while (array.length < 8) {
        array.unshift(false)
    }

    return array
}

function arrayToNumber(array: boolean[]) {
    const number = array.reduce((res, x) => res << 1 | Number(x), 0)
    return number
}

export class Game {
    canvas: Canvas
    array: boolean[][] = []
    density: number
    speed: number
    rule: number
    interval: number | null = null
    steps: number = 0

    constructor(canvas: Canvas, rule?: number) {
        this.canvas = canvas
        this.rule = rule || 30
        this.density = 0.5
        this.speed = 100
    }

    start() {
        const a: boolean[] = []
        for (let index = 0; index < this.canvas.width / this.canvas.scale; index++) {
            a.push(Math.random() < this.density)
        }
        this.array = [a]
        this.canvas.render(this.array)
        this.interval = setInterval(() => {
            this.array.push(this.createLine())
            if (this.array.length > this.canvas.height / this.canvas.scale)
                this.array.splice(0, 1)
            this.steps++
            this.canvas.render(this.array)
        }, this.speed)
    }

    stop() {
        console.log(`${this.steps} steps`);
        
        this.steps = 0
        if (this.interval)
            clearInterval(this.interval)
    }

    createLine() {
        const currentLine: boolean[] = this.array[this.array.length - 1]
        const newLine = []
        for (let index = 0; index < currentLine.length; index++) {
            newLine.push(this.getCell(currentLine, index))
        }
        if (JSON.stringify(newLine) === JSON.stringify(currentLine))
            this.stop()
        return newLine
    }

    getCell(array: Array<boolean>, index: number) {
        const _a: boolean[] = []
        const _rule: boolean[] = numberToArray(this.rule)

        _a.push(getNear(array, index, -1))
        _a.push(array[index])
        _a.push(getNear(array, index, +1))

        const a = arrayToNumber(_a)

        return _rule[_rule.length - 1 - a]


        // console.log(this.rule.reduce((res, x) => res << 1 | Number(x), 0))


        // switch (_a) {
        //     case [true, true, true]:
        //         return this.rule[0]
        //     case [true, true, false]:
        //         return this.rule[1]
        //     case [true, false, true]:
        //         return this.rule[2]
        //     case [true, false, false]:
        //         return this.rule[3]
        //     case [false, true, true]:
        //         return this.rule[4]
        //     case [false, true, false]:
        //         return this.rule[5]
        //     case [false, false, true]:
        //         return this.rule[6]
        //     case [false, false, false]:
        //         return this.rule[7]
        //     default:
        //         return false
        // }
    }
}