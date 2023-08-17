export enum Colour {
  'BLUE' = 'blue',
  'YELLOW' = 'yellow',
  'RED' = 'red',
  'BLACK' = 'black'
}

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
  players: [Player, Player, Player, Player]
  points: Record<Colour, number>
  rounds: Round[]
}
