export function getSquaredWindowSize() {
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

export function deepArrayClone<T extends { map }>(items: T): T {
    return items.map(item => Array.isArray(item) ? deepArrayClone(item) : item)
}

/**
 * 
 * @param min Minimum
 * @param max Maximum (not included)
 */
export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffleArray<T>(array: T[]): T[] {
    let newArray = deepArrayClone(array)

    for(let i = 0; i < newArray.length; i++) {
        let j = getRandomInt(0, newArray.length)
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }

    return newArray
}
