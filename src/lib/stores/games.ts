import { writable } from 'svelte/store'
import type { CreateNewGameProps, Game } from '../types'
import { v4 } from 'uuid'

const getGames = () => {
  const persistedGames = localStorage.getItem('games') || '[]'
  const stored: Game[] = JSON.parse(persistedGames)

  return stored
}

const gamesStore = writable(getGames())

const createNewGame = ({ playerNames, colourPoints, gostergePoint }: CreateNewGameProps) => {
  const newGame: Game = {
    id: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    players: playerNames.map((name) => ({
      id: v4(),
      name,
    })) as Game['players'],
    rounds: [],
    points: colourPoints,
    gostergePoint,
  }

  gamesStore.set([...getGames(), newGame])

  return newGame
}

const getGame = (gameId: string) => {
  const game = getGames().find((g) => g.id === gameId)
  if (!game) {
    throw new Error(`Game with ID ${gameId} not found`)
  }

  return game
}

const updateGame = (game: Game) => {
  const gamesList = getGames()
  const gameIndex = gamesList.findIndex((g) => g.id === game.id)
  if (gameIndex > -1) {
    gamesList.splice(gameIndex, 1, game)
    gamesStore.set(gamesList)
  }
}

const deleteGame = (gameId: string) => {
  const gamesList = getGames()
  const gameIndex = gamesList.findIndex((g) => g.id === gameId)
  if (gameIndex > -1) {
    gamesList.splice(gameIndex, 1)
    gamesStore.set(gamesList)
  }
}

export const games = {
  ...gamesStore,
  getGame,
  createNewGame,
  updateGame,
  deleteGame,
}

games.subscribe((value) => {
  const sortedGames = [...value].sort((a, b) => {
    const aCreatedAt = new Date(a.createdAt)
    const bCreatedAt = new Date(b.createdAt)

    if (aCreatedAt < bCreatedAt) return 1
    if (aCreatedAt > bCreatedAt) return -1

    return 0
  })

  localStorage.setItem('games', JSON.stringify(sortedGames))
})
