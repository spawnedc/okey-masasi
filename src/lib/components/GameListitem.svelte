<script lang="ts">
  import { base } from '$app/paths'
  import { dateFormatter } from '$lib/formatters'
  import type { Game } from '$lib/types'

  export let game: Game
  export let onDeleteClick: (gameId: string) => void
  export let onEditClick: (game: Game) => void
</script>

<div class="box">
  <div class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <a href={`${base}/games/${game.id}`}>{dateFormatter.format(new Date(game.createdAt))}</a>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <button type="button" class="button is-info is-small" on:click={() => onEditClick(game)}>
          <span class="icon is-small">
            <i class="fas fa-pen-to-square" />
          </span>
        </button>
      </div>
      <div class="level-item">
        <button
          type="button"
          class="button is-danger is-small"
          on:click={() => onDeleteClick(game.id)}
        >
          <span class="icon is-small">
            <i class="fas fa-times" />
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
