import type { Colour, Game } from './types'

const getPointFromRemainingTiles = (game: Game, remainingTiles: number, okeyColour: Colour) => {
  const colourPoint = game.points[okeyColour]
  return remainingTiles * colourPoint
}

export const getTotalPoints = (game: Game) => {
  return game.players.map((player, playerIndex) =>
    game.rounds.reduce((totalPoints, round) => {
      const tilesPoint = getPointFromRemainingTiles(
        game,
        round.remainingTiles[playerIndex],
        round.okeyColour,
      )
      const gostergePoint = round.gosterge === playerIndex ? -game.gostergePoint : 0
      return totalPoints + tilesPoint + gostergePoint
    }, 0),
  ) as [number, number, number, number]
}
