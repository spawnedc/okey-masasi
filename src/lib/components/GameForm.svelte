<script lang="ts">
  import { colours, colourToBulmaMap, type CreateNewGameProps, type Game } from '$lib/types'

  export let game: Game | undefined = undefined
  export let onCancelClick: () => void
  export let onSubmit: (newGameParams: CreateNewGameProps) => void

  type PlayerNames = [string, string, string, string]

  let playerNames: PlayerNames =
    (game?.players.map((p) => p.name) as PlayerNames) || new Array(4).fill('')
  let colourPoints: Game['points'] = game?.points || {
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
  }

  let gostergePoint: number = 100

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    onSubmit({ playerNames, colourPoints, gostergePoint })
  }
</script>

<form on:submit={handleFormSubmit}>
  <div class="content">
    {#each [0, 1, 2, 3] as playerIndex}
      <div class="field">
        <label for={`player${playerIndex}`} class="label">Player {playerIndex + 1}</label>
        <div class="control has-icons-left">
          <input
            id={`player${playerIndex}`}
            class="input"
            type="text"
            placeholder={`Player ${playerIndex + 1}'s name`}
            bind:value={playerNames[playerIndex]}
            required
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </div>
      </div>
    {/each}
  </div>

  <div class="label">Colour points</div>
  <div class="columns is-mobile is-multiline">
    {#each colours as colour}
      <div class="column is-half">
        <div class="field">
          <div class="control has-icons-left">
            <input
              id={`colour-${colour}`}
              class="input"
              type="number"
              placeholder={`${colour + 1}'s points`}
              bind:value={colourPoints[colour]}
              min="1"
              required
            />
            <span class={`icon is-small is-left has-text-${colourToBulmaMap[colour].bg}`}>
              <i class="fas fa-square" />
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="field">
    <label for={`gostergePoint`} class="label">Gosterge point</label>
    <div class="control has-icons-left">
      <input id="gostergePoint" class="input" type="number" bind:value={gostergePoint} required />
      <span class="icon is-small is-left">
        <i class="fas fa-user" />
      </span>
    </div>
  </div>

  <div class="level is-mobile">
    <div class="level-right">
      <div class="level-item">
        <button class="button is-danger" type="button" on:click={onCancelClick}>Cancel</button>
      </div>
    </div>
    <div class="level-left">
      <div class="level-item">
        <button class="button is-primary" type="submit">Save</button>
      </div>
    </div>
  </div>
</form>
