<script lang="ts">
  import { colours, type Colour, type Game, type Round } from '$lib/types'
  import { v4 } from 'uuid'

  export let onCloseClick: () => void
  export let onSubmit: (round: Round) => void
  export let game: Game

  let remainingTiles: Round['remainingTiles'] = [0, 0, 0, 0]
  let gostergePlayerIndex: number | undefined
  let winnerPlayerIndex: number
  let okeyColour: Colour

  $: if (winnerPlayerIndex !== undefined) {
    remainingTiles[winnerPlayerIndex] = 0
  }

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const round: Round = {
      id: v4(),
      okeyColour,
      remainingTiles,
      winner: winnerPlayerIndex,
      gosterge: gostergePlayerIndex,
    }
    onSubmit(round)
    onCloseClick()
  }
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={onCloseClick} />
  <div class="modal-content">
    <div class="box">
      <h2 class="subtitle">New round</h2>
      <form on:submit={handleFormSubmit}>
        <div class="control">
          <div class="label">Okey colour</div>
          {#each colours as colour}
            <label class="radio">
              <input type="radio" bind:group={okeyColour} value={colour} required />
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
                    on:click={() => (gostergePlayerIndex = undefined)}
                  >
                    <i class="fas fa-x" />
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
                      bind:group={winnerPlayerIndex}
                      value={index}
                    />
                  </td>
                  <td>{player.name}</td>
                  <td>
                    <input
                      class="input is-small"
                      type="number"
                      bind:value={remainingTiles[index]}
                      disabled={winnerPlayerIndex === index}
                    />
                  </td>
                  <td>
                    <input
                      class="radio"
                      type="radio"
                      bind:group={gostergePlayerIndex}
                      value={index}
                    />
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          <div class="field is-grouped">
            <p class="control">
              <button type="submit" class="button is-link">Save changes</button>
            </p>
            <p class="control">
              <button type="button" class="button" on:click={onCloseClick}>Cancel</button>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close" on:click={onCloseClick} />
</div>
