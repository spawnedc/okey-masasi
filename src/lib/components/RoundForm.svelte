<script lang="ts">
  import { colours, type Colour, type Game, type Round, type RoundWithoutId } from '$lib/types'

  export let onCloseClick: () => void
  export let onSubmit: (round: RoundWithoutId) => void
  export let game: Game
  export let round: Round | undefined = undefined

  let remainingTiles: Round['remainingTiles'] = round?.remainingTiles || [0, 0, 0, 0]
  let gosterge: number | undefined = round?.gosterge
  let winner: number | undefined = round?.winner
  let okeyColour: Colour | undefined = round?.okeyColour

  $: if (winner !== undefined) {
    remainingTiles[winner] = 0
  }

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (okeyColour !== undefined && winner !== undefined) {
      onSubmit({
        okeyColour,
        remainingTiles,
        winner,
        gosterge,
      })
    }
  }
</script>

<form on:submit={handleFormSubmit}>
  <div class="control">
    <div class="label">Okey colour</div>
    {#each colours as colour}
      <label class="radio">
        <input type="radio" bind:group={okeyColour} value={colour} name="okeyColour" required />
        <span class="icon" style={`color: ${colour}`}>
          <i class="fas fa-square" />
        </span>
      </label>
    {/each}
  </div>
  <div class="block" />
  <div class="control">
    <table class="table is-narrow is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Winner</th>
          <th>Name</th>
          <th>PK?</th>
          <th>
            <span>Gosterge</span>
            <button
              class="button is-text is-small"
              type="button"
              on:click={() => (gosterge = undefined)}
            >
              <i class="fas fa-times" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each game.players as player, index}
          <tr>
            <td>
              <input
                class="radio"
                type="radio"
                name="winner"
                bind:group={winner}
                value={index}
                required
              />
            </td>
            <td>{player.name}</td>
            <td>
              <input
                class="input is-small"
                type="number"
                bind:value={remainingTiles[index]}
                disabled={winner === index}
                min={winner === index ? 0 : 1}
              />
            </td>
            <td>
              <input class="radio" type="radio" bind:group={gosterge} value={index} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="level is-mobile">
      <div class="level-right">
        <div class="level-item">
          <button class="button is-danger" type="button" on:click={onCloseClick}>Cancel</button>
        </div>
      </div>
      <div class="level-left">
        <div class="level-item">
          <button class="button is-primary" type="submit">Save</button>
        </div>
      </div>
    </div>
  </div>
</form>
