import type { Game, Round } from './types'

export const getRoundPointsForPlayerIndex = (game: Game, round: Round, playerIndex: number) => {
  const gostergePoint = round.gosterge === playerIndex ? -game.gostergePoint : 0

  let tilesPoint = round.remainingTiles[playerIndex] * game.points[round.okeyColour]

  if (round.wonByOkey) {
    tilesPoint *= 2
  }

  const roundPoint = tilesPoint + gostergePoint

  return roundPoint
}

export const getTotalPoints = (game: Game) =>
  game.players.map((player, playerIndex) =>
    game.rounds.reduce(
      (totalPoints, round) => totalPoints + getRoundPointsForPlayerIndex(game, round, playerIndex),
      0,
    ),
  ) as [number, number, number, number]
