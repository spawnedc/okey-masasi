<script lang="ts">
  import { games } from '$lib/stores/games'
</script>

<div class="content">
  <a class="button" href="/games/new">Start a new game</a>
  {#if $games.length}
    <ul>
      {#each $games as game}
        <li><a href={`/games/${game.id}`}>{game.id}</a></li>
      {/each}
    </ul>
  {:else}
    <p>No games found.</p>
  {/if}
</div>
