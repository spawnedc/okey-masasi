<script lang="ts">
  import type { Colour, Game, Round } from '$lib/types'

  export let game: Game
  export let round: Round
  export let playerIndex: number

  const getPointFromRemainingTiles = (remainingTiles: number, okeyColour: Colour) => {
    const colourPoint = game.points[okeyColour]
    return remainingTiles * colourPoint
  }

  const tilesPoint = getPointFromRemainingTiles(round.remainingTiles[playerIndex], round.okeyColour)

  let gostergePoint: number
  $: gostergePoint = round.gosterge === playerIndex ? -100 : 0

  let point: number
  $: point = tilesPoint + gostergePoint
</script>

<span class="point">
  {point}

  {#if gostergePoint !== 0}
    *
  {/if}
</span>

<style>
  .point {
    white-space: nowrap;
  }
</style>
