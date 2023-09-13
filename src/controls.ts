import { Game } from "./game";
import { Input } from "./input";

export class Controls {
    app: HTMLDivElement
    game: Game

    width: number
    height: number
    scale: number
    density: number
    speed: number
    rule: number

    widthInput: HTMLLabelElement
    heightInput: HTMLLabelElement
    scaleInput: HTMLLabelElement
    densityInput: HTMLLabelElement
    speedInput: HTMLLabelElement
    ruleInput: HTMLLabelElement

    constructor(app: HTMLDivElement, game: Game) {
        this.app = app
        this.game = game
        this.width = game.canvas.width
        this.height = game.canvas.height
        this.scale = game.canvas.scale
        this.density = game.density
        this.speed = game.speed
        this.rule = game.rule

        const container = document.createElement("div")
        container.classList.add("controls")

        const button = document.createElement('button')
        button.textContent = 'СТАРТ'
        button.addEventListener('click', () => this.save())

        this.widthInput = Input(game.canvas.width, 'ширина')
        this.heightInput = Input(game.canvas.height, 'высота')
        this.scaleInput = Input(game.canvas.scale, 'размер')
        this.densityInput = Input(game.density, 'плотность')
        this.speedInput = Input(game.speed, 'скорость')
        this.ruleInput = Input(game.rule, 'правило')

        container.appendChild(this.widthInput)
        container.appendChild(this.heightInput)
        container.appendChild(this.scaleInput)
        container.appendChild(this.densityInput)
        container.appendChild(this.speedInput)
        container.appendChild(this.ruleInput)
        container.appendChild(button)

        app.appendChild(container)
    }

    save() {
        this.game.stop()
        this.width = Number(this.widthInput.getElementsByTagName('input')[0].value)
        this.height = Number(this.heightInput.getElementsByTagName('input')[0].value)
        this.scale = Number(this.scaleInput.getElementsByTagName('input')[0].value)
        this.density = Number(this.densityInput.getElementsByTagName('input')[0].value)
        this.speed = Number(this.speedInput.getElementsByTagName('input')[0].value)
        this.rule = Number(this.ruleInput.getElementsByTagName('input')[0].value)
        this.game.canvas.width = this.width
        this.game.canvas.height = this.height
        this.game.canvas.scale = this.scale
        this.game.canvas.resize()
        this.game.density = this.density
        this.game.speed = this.speed
        this.game.rule = this.rule
        this.game.start()
    }
}