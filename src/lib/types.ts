export const colours = ['blue', 'yellow', 'red', 'black'] as const

export type Colour = (typeof colours)[number]

export type Player = {
  id: string
  name: string
}

export type RoundScore = {
  playerId: Player['id']
  remainingTiles: number
}

export type Round = {
  id: string
  okeyColour: Colour
  gosterge?: Player['id']
  winner: Player['id']
}

export type Game = {
  id: string
  createdAt: Date
  updatedAt: Date
  players: [Player, Player, Player, Player]
  points: Record<Colour, number>
  rounds: Round[]
}
