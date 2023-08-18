export const colours = ['blue', 'yellow', 'red', 'black'] as const

export type Colour = (typeof colours)[number]

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

export type Game = {
  id: string
  createdAt: Date
  updatedAt: Date
  players: [Player, Player, Player, Player]
  points: Record<Colour, number>
  rounds: Round[]
}
