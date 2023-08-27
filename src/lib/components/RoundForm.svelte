<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { messages as appMessages } from '$lib/app.messages.svelte'
  import {
    colours,
    type Colour,
    type Game,
    type Round,
    type RoundWithoutId,
    colourToBulmaMap,
  } from '$lib/types'
  import { messages } from './RoundForm.messages.svelte'

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
    <div class="label">{$_(messages.okeyColourLabel.id)}</div>
    {#each colours as colour}
      <label class="radio">
        <input type="radio" bind:group={okeyColour} value={colour} name="okeyColour" required />
        <span class={`icon has-text-${colourToBulmaMap[colour].bg}`}>
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
          <th title={$_(messages.winnerLabel.id)} class="has-text-centered">
            <span class="icon has-text-warning">
              <i class="fas fa-trophy" />
            </span>
          </th>
          <th>{$_(messages.nameLabel.id)}</th>
          <th title={$_(messages.remainingTilesLabel.id)}>
            <span class="icon has-text-black">
              <i class="far fa-clone" />
            </span>
          </th>
          <th
            title={$_(messages.indicatorLabel.id)}
            class="has-text-centered"
            on:click={() => (gosterge = undefined)}
          >
            <span class="icon has-text-black">
              <i class="fas fa-mobile-button" />
            </span>
          </th>
          <th
            title={$_(messages.indicatorLabel.id)}
            class="has-text-centered"
            on:click={() => (gosterge = undefined)}
          >
            <span class="icon has-text-black">
              <i class="fas fa-mobile-button" />
            </span>
          </th>
          <th
            title={$_(messages.indicatorLabel.id)}
            class="has-text-centered"
            on:click={() => (gosterge = undefined)}
          >
            <span class="icon has-text-black">
              <i class="fas fa-mobile-button" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each game.players as player, index}
          <tr>
            <td class="has-text-centered">
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
            <td width="80">
              <input
                class="input is-small"
                type="number"
                name={`remainingTiles[${index}]`}
                bind:value={remainingTiles[index]}
                readonly={winner === index}
                min={winner === index ? 0 : 1}
              />
            </td>
            <td class="has-text-centered">
              <input
                class="radio"
                type="radio"
                name="gosterge"
                bind:group={gosterge}
                value={index}
              />
            </td>
            <td class="has-text-centered">
              <!-- <input class="radio" type="radio" bind:group={gosterge} value={index} /> -->
            </td>
            <td class="has-text-centered">
              <!-- <input class="radio" type="radio" bind:group={gosterge} value={index} /> -->
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="block" />
  <div class="level is-mobile">
    <div class="level-right">
      <div class="level-item">
        <button class="button is-danger" type="button" on:click={onCloseClick}>
          {$_(appMessages.cancel.id)}
        </button>
      </div>
    </div>
    <div class="level-left">
      <div class="level-item">
        <button class="button is-primary" type="submit">
          {$_(appMessages.save.id)}
        </button>
      </div>
    </div>
  </div>
</form>
