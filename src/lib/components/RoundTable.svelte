<script lang="ts">
  import type { Colour, Game, Round } from '$lib/types'
  import RoundPoint from './RoundPoint.svelte'

  export let game: Game
</script>

<table class="table is-narrow is-fullwidth is-striped">
  <thead>
    <tr>
      <th class="has-text-centered">No</th>
      <th class="has-text-centered">Col</th>
      {#each game.players as player}
        <th class="has-text-centered">{player.name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each game.rounds as round, index}
      <tr>
        <td class="has-text-centered">{index + 1}</td>
        <td class="has-text-centered">
          <span class="icon" style={`color: ${round.okeyColour}`}>
            <i class="fas fa-square" />
          </span>
        </td>
        {#each game.players as player, index}
          <th class="has-text-centered">
            {#if round.winner === index}
              <span class="icon">
                <i class="fas fa-trophy" />
              </span>
            {:else}
              <RoundPoint {game} playerIndex={index} {round} />
            {/if}
          </th>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
