<script lang="ts">
  import { games } from '$lib/stores/games'
  import type { Game } from '$lib/types'
  import GameListitem from './GameListitem.svelte'

  export let onEditGameClick: (game: Game) => void

  const handleDeleteGame = (gameId: string) => {
    const canDelete = confirm('Are you sure?')
    if (canDelete) {
      games.deleteGame(gameId)
    }
  }
</script>

<div class="content">
  {#if $games.length}
    {#each $games as game}
      <GameListitem {game} onDeleteClick={handleDeleteGame} onEditClick={onEditGameClick} />
    {/each}
  {:else}
    <p>No games found.</p>
  {/if}
</div>
