<script lang="ts">
  import { colourToBulmaMap, type Game, type Round } from '$lib/types'
  import RoundPoint from './RoundPoint.svelte'

  export let game: Game
  export let onRowClick: (round: Round) => void

  let rounds: Round[]
  $: rounds = game.rounds
</script>

<table class="table is-narrow is-fullwidth is-striped is-bordered">
  <thead>
    <tr>
      <th class="has-text-centered pl-0 pr-0">
        <span class="icon">
          <i class="fas fa-hashtag" />
        </span>
      </th>
      {#each game.players as player}
        <th colspan="2" class="has-text-centered">{player.name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each game.rounds as round, index}
      <tr on:click={() => onRowClick(round)}>
        <td
          class={`has-text-centered has-background-${
            colourToBulmaMap[round.okeyColour].bg
          } has-text-${colourToBulmaMap[round.okeyColour].text}`}
        >
          {index + 1}
        </td>

        {#each game.players as player, index}
          <td class="has-text-centered">
            <RoundPoint {game} playerIndex={index} {round} />
          </td>
          <td class="has-text-centered" class:has-background-success={round.winner === index}>
            {#if round.winner === index}
              <span class="icon has-text-white">
                <i class="fas fa-trophy" />
              </span>
            {:else}
              {round.remainingTiles[index]}
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
  <tfoot> <td>? </td></tfoot>
</table>
