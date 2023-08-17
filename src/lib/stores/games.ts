import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import type { Game } from '../types'

const getGames = () => {
  const persistedGames = browser ? localStorage.getItem('games') || '[]' : '[]'
  const stored: Game[] = JSON.parse(persistedGames)

  return stored
}

export const games = writable(getGames())

games.subscribe((value) => {
  if (browser) {
    localStorage.setItem('games', JSON.stringify(value))
  }
})
