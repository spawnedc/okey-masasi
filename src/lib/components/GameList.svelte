<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { games } from '$lib/stores/games'
  import type { Game } from '$lib/types'
  import GameListitem from './GameListitem.svelte'
  import { messages } from './GameList.messages.svelte'

  export let onEditGameClick: (game: Game) => void

  const handleDeleteGame = (gameId: string) => {
    const canDelete = confirm($_(messages.deletePrompt.id))
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
    <p>{$_(messages.noGamesFound.id)}</p>
  {/if}
</div>
