<script lang="ts">
  import { colourToBulmaMap, type Game, type Round } from '$lib/types'
  import { getTotalPoints } from '$lib/utils'
  import RoundPoint from './RoundPoint.svelte'

  export let game: Game
  export let onRowClick: (round: Round) => void

  let rounds: Round[]
  $: rounds = game.rounds

  let totalPoints: [number, number, number, number]
  $: totalPoints = getTotalPoints(game)

  let winnerIndex: number
  $: {
    const minValue = Math.min(...totalPoints)
    winnerIndex = totalPoints.indexOf(minValue)
  }
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
            <RoundPoint {game} {round} playerIndex={index} />
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
  {#if rounds.length > 0}
    <tfoot>
      <tr>
        <th class="has-text-centered">
          <span class="icon has-text-success">
            <i class="fas fa-clipboard-list" />
          </span>
        </th>
        {#each totalPoints as point, index}
          <th class="has-text-centered" colspan="2">
            {point}
            {#if winnerIndex === index}
              <span class="icon has-text-warning">
                <i class="fas fa-trophy" />
              </span>
            {/if}
          </th>
        {/each}
      </tr>
    </tfoot>
  {/if}
</table>

<style>
  thead th {
    border-bottom-width: 3px;
    border-bottom-color: #000;
  }
  tfoot th {
    border-top-width: 2px;
    border-top-color: #000;
  }
  th[colspan='2'],
  tbody td:nth-child(2n) {
    border-left-width: 3px;
    border-left-color: #000;
  }
</style>
