<script lang="ts">
  import { v4 } from 'uuid'
  import GameList from '$lib/components/GameList.svelte'
  import { games } from '$lib/stores/games'
  import type { Game } from '$lib/types'

  const handleAddNewGame = () => {
    const newGame: Game = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      players: [
        { id: v4(), name: 'player 1' },
        { id: v4(), name: 'player 2' },
        { id: v4(), name: 'player 3' },
        { id: v4(), name: 'player 4' },
      ],
      rounds: [],
      points: { yellow: 10, blue: 20, red: 30, black: 50 },
    }
    games.update((value) => [...value, newGame])
  }
</script>

<main class="container">
  <h1 class="title">Okey Masasi</h1>

  <GameList onAddNewGame={handleAddNewGame} />
</main>
