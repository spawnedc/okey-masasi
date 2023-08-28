<script lang="ts">
  import type { Game, Round } from '$lib/types'
  import { getRoundPointsForPlayerIndex } from '$lib/utils'

  export let game: Game
  export let round: Round
  export let playerIndex: number

  let point: number

  $: point = getRoundPointsForPlayerIndex(game, round, playerIndex)
</script>

<span class="point">
  {point}

  {#if round.gosterge === playerIndex}
    *
  {/if}
</span>

<style>
  .point {
    white-space: nowrap;
  }
</style>
