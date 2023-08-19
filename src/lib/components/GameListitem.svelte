<script lang="ts">
  import { dateFormatter } from '$lib/formatters'
  import type { Game } from '$lib/types'

  export let game: Game
  export let onDelete: (gameId: string) => void
</script>

<div class="box">
  <div class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <a href={`/games/${game.id}`}>{dateFormatter.format(new Date(game.createdAt))}</a>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <button type="button" class="button is-info is-small">
          <span class="icon is-small">
            <i class="fas fa-pen-to-square" />
          </span>
        </button>
      </div>
      <div class="level-item">
        <button type="button" class="button is-danger is-small" on:click={() => onDelete(game.id)}>
          <span class="icon is-small">
            <i class="fas fa-times" />
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
