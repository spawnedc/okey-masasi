<script lang="ts">
  import type { Game } from '$lib/types'
  import RoundPoint from './RoundPoint.svelte'

  export let game: Game
</script>

<table class="table is-narrow is-fullwidth is-striped is-bordered">
  <thead>
    <tr>
      <th class="has-text-centered">
        <span class="icon">
          <i class="fas fa-hashtag" />
        </span>
      </th>
      <th class="has-text-centered">
        <span class="icon">
          <i class="fas fa-palette" />
        </span>
      </th>
      {#each game.players as player}
        <th colspan="2" class="has-text-centered">{player.name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each game.rounds as round, index}
      <tr on:click={() => console.info(index)}>
        <td class="has-text-centered">{index + 1}</td>
        <td class="has-text-centered">
          <span class="icon" style={`color: ${round.okeyColour}`}>
            <i class="fas fa-square" />
          </span>
        </td>
        {#each game.players as player, index}
          {#if round.winner === index}
            <td class="has-text-centered" colspan="2">
              <span class="icon has-text-success">
                <i class="fas fa-trophy" />
              </span>
            </td>
          {:else}
            <td class="has-text-centered">
              <RoundPoint {game} playerIndex={index} {round} />
            </td>
            <td class="has-text-centered">
              {round.remainingTiles[index]}
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
