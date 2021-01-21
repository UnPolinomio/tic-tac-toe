export type TranslateDictionaryOptions = 'playerWins' | 'tie' | 'restart'

export type TranslateDictionaryType = {
    [key in TranslateDictionaryOptions]: string
}

export type TranslateDictionaryDatabase = {
    [key: string]: TranslateDictionaryType
}

export const defaultTranslateDictionary: TranslateDictionaryDatabase = {
    'en': {
        'playerWins': 'Player $player has won.',
        'tie': 'It\'s a tie.',
        'restart': 'Do you want to restart the game?'
    },
    'es': {
        'playerWins': 'El jugador $player ha ganado.',
        'tie': 'Es empate.',
        'restart': '¿Desea reiniciar el juego?'
    },
}
