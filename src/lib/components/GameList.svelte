<script lang="ts">
  import { games } from '$lib/stores/games'
  import GameListitem from './GameListitem.svelte'

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
      <GameListitem {game} onDelete={handleDeleteGame} />
    {/each}
  {:else}
    <p>No games found.</p>
  {/if}
</div>
