import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import type { Game } from '../types'
import { v4 } from 'uuid'

const getGames = () => {
  const persistedGames = browser ? localStorage.getItem('games') || '[]' : '[]'
  const stored: Game[] = JSON.parse(persistedGames)

  return stored
}

const gamesStore = writable(getGames())

type CreateNewGameProps = {
  playerNames: [string, string, string, string]
  colourPoints: Game['points']
}

const createNewGame = ({ playerNames, colourPoints }: CreateNewGameProps) => {
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
  }

  gamesStore.set([...getGames(), newGame])

  return newGame
}

export const games = {
  ...gamesStore,
  getGame: (gameId: string) => getGames().find((g) => g.id === gameId),
  createNewGame,
}

games.subscribe((value) => {
  if (browser) {
    const sortedGames = [...value].sort((a, b) => {
      const aCreatedAt = new Date(a.createdAt)
      const bCreatedAt = new Date(b.createdAt)

      if (aCreatedAt < bCreatedAt) return 1
      if (aCreatedAt > bCreatedAt) return -1

      return 0
    })

    localStorage.setItem('games', JSON.stringify(sortedGames))
  }
})
