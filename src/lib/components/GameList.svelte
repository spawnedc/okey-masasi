<script lang="ts">
  import { games } from '$lib/stores/games'

  export let onAddNewGame: (() => void) | undefined
</script>

{#if $games.length}
  <ul>
    {#each $games as game}
      <li><a href={`/games/${game.id}`}>{game.id}</a></li>
    {/each}
  </ul>
{:else}
  <p>No games found.</p>
{/if}

<button type="button" on:click={onAddNewGame}>Start a new game</button>
