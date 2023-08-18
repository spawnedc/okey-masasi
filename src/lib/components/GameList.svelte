<script lang="ts">
  import { games } from '$lib/stores/games'
  import { dateFormatter } from '$lib/formatters'
</script>

<div class="content">
  <a class="button" href="/games/new">Start a new game</a>
  {#if $games.length}
    <ul>
      {#each $games as game}
        <li><a href={`/games/${game.id}`}>{dateFormatter.format(new Date(game.createdAt))}</a></li>
      {/each}
    </ul>
  {:else}
    <p>No games found.</p>
  {/if}
</div>
