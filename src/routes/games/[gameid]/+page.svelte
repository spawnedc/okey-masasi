<script lang="ts">
  import { page } from '$app/stores'
  import NewRoundModal from '$lib/components/NewRoundModal.svelte'
  import RoundTable from '$lib/components/RoundTable.svelte'
  import { dateFormatter } from '$lib/formatters'
  import { games } from '$lib/stores/games'
  import type { Game, Round } from '$lib/types'

  const { gameid } = $page.params

  let game: Game | undefined
  $: game = $games.find((g) => g.id === gameid)

  const handleNewRoundSubmit = (round: Round) => {
    if (game) {
      game.rounds.push(round)
      games.updateGame(game)
    }
  }

  let isNewRoundModalOpen = false
</script>

{#if !game}
  <p>No such game found</p>
{:else}
  <h1 class="title">{dateFormatter.format(new Date(game.createdAt))}</h1>

  <button class="button" on:click={() => (isNewRoundModalOpen = true)}>New round</button>

  <div class="block" />

  <RoundTable {game} />

  {#if isNewRoundModalOpen === true}
    <NewRoundModal
      {game}
      onCloseClick={() => (isNewRoundModalOpen = false)}
      onSubmit={handleNewRoundSubmit}
    />
  {/if}
{/if}
