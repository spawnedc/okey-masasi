export const colours = ['blue', 'yellow', 'red', 'black'] as const

export type Colour = (typeof colours)[number]

type colourMap = {
  bg: string
  text: string
}

export const colourToBulmaMap: Record<Colour, colourMap> = {
  black: {
    bg: 'black',
    text: 'white',
  },
  yellow: {
    bg: 'warning',
    text: 'black',
  },
  red: {
    bg: 'danger',
    text: 'white',
  },
  blue: {
    bg: 'link',
    text: 'white',
  },
}

export type Player = {
  id: string
  name: string
}

export type Round = {
  id: string
  okeyColour: Colour
  gosterge?: number // player index
  winner: number // player index
  remainingTiles: [number, number, number, number]
}

export type RoundWithoutId = Omit<Round, 'id'>

export type Game = {
  id: string
  createdAt: Date
  updatedAt: Date
  players: [Player, Player, Player, Player]
  points: Record<Colour, number>
  rounds: Round[]
}

export type CreateNewGameProps = {
  playerNames: [string, string, string, string]
  colourPoints: Game['points']
}
