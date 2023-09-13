
export function Input(value: number, title: string) {
    const container = document.createElement("label")
    const label = document.createElement('p')
    const input = document.createElement('input')

    container.classList.add('inputContainer')
    label.innerText = title
    input.setAttribute('type', 'number')
    input.value = value.toString()

    container.appendChild(label)
    container.appendChild(input)

    return container
}
