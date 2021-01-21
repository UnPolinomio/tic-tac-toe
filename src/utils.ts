export function getCanvasSize() {
    const width = window.innerWidth, height = window.innerHeight
    const size = width < height ? width : height

    return size
}

export function allEqual(array: any[]) {
    return array.every(value => value === array[0])
}

export function getLanguage() {
    return navigator.language.slice(0, 2)
}
