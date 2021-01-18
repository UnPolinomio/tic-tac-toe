export function getCanvasSize() {
    const width = window.innerWidth, height = window.innerHeight
    const size = width < height ? width : height

    return size
}

export function allEqual(array: any[]) {
    return array.every(value => value === array[0])
}
