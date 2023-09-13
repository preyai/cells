
function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext("2d")
    if (context === null)
        throw new Error("not context");
    return context
}

export class Canvas {
    app: HTMLDivElement;
    element: HTMLCanvasElement;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    scale: number;

    constructor(app: HTMLDivElement, width?: number, height?: number) {
        this.app = app
        this.width = width || app.clientWidth
        this.height = height || app.clientHeight
        this.scale = 1
        this.element = document.createElement('canvas')
        this.context = getContext(this.element)
        this.resize()
        const container = document.createElement('div')
        container.appendChild(this.element)
        app.appendChild(container)
    }

    resize() {
        this.element.width = this.width
        this.element.height = this.height
    }

    render(array: boolean[][]) {
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.fillStyle = "red";
        for (let rowIndex = 0; rowIndex < array.length; rowIndex++) {
            const row = array[rowIndex];
            for (let colIndex = 0; colIndex < row.length; colIndex++) {
                if (row[colIndex])
                    this.context.fillRect(colIndex * this.scale, rowIndex * this.scale, this.scale, this.scale)
            }
        }
    }

}