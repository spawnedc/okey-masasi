<script lang="ts">
  import { goto } from '$app/navigation'
  import { games } from '$lib/stores/games'
  import { colours, type Game } from '$lib/types'

  let playerNames: [string, string, string, string] = ['', '', '', '']
  let colourPoints: Game['points'] = {
    black: 0,
    blue: 0,
    red: 0,
    yellow: 0,
  }

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const newGame = games.createNewGame({ playerNames, colourPoints })
    goto(`/games/${newGame.id}`)
  }
</script>

<h1 class="title">New game</h1>

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
              required
            />
            <span class="icon is-small is-left" style={`color: ${colour}`}>
              <i class="fas fa-square" />
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <button class="button" type="submit">Add</button>
</form>
