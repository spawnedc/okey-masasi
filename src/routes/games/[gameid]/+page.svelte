<script lang="ts">
  import { page } from '$app/stores'
  import Modal from '$lib/components/Modal.svelte'
  import RoundForm from '$lib/components/RoundForm.svelte'
  import RoundTable from '$lib/components/RoundTable.svelte'
  import { dateFormatter } from '$lib/formatters'
  import { games } from '$lib/stores/games'
  import type { Game, Round, RoundWithoutId } from '$lib/types'
  import { v4 } from 'uuid'

  const { gameid } = $page.params

  let game: Game | undefined
  $: game = $games.find((g) => g.id === gameid)

  let roundToEdit: Round | undefined

  const handleNewRoundSubmit = (round: RoundWithoutId) => {
    if (game) {
      game.rounds.push({ ...round, id: v4() })
      games.updateGame(game)
    }
  }

  const handleEditRoundSubmit = (round: RoundWithoutId) => {
    if (game) {
      const roundIndex = game.rounds.findIndex((r) => r.id === roundToEdit?.id)
      if (roundIndex > -1 && roundToEdit) {
        game.rounds[roundIndex] = {
          ...roundToEdit,
          ...round,
        }
        games.updateGame(game)
      }
    }
    roundToEdit = undefined
    isEditRoundModalOpen = false
  }

  const handleRoundClick = (round: Round) => {
    roundToEdit = round
    isEditRoundModalOpen = true
  }

  let isNewRoundModalOpen = false
  let isEditRoundModalOpen = false
</script>

{#if !game}
  <p>No such game found</p>
{:else}
  <h1 class="title">{dateFormatter.format(new Date(game.createdAt))}</h1>

  <button class="button" on:click={() => (isNewRoundModalOpen = true)}>New round</button>

  <div class="block" />

  <RoundTable {game} onRowClick={handleRoundClick} />

  {#if isNewRoundModalOpen === true}
    <Modal onCloseClick={() => (isNewRoundModalOpen = false)}>
      <RoundForm
        {game}
        onCloseClick={() => (isNewRoundModalOpen = false)}
        onSubmit={handleNewRoundSubmit}
      />
    </Modal>
  {/if}

  {#if isEditRoundModalOpen === true}
    <Modal onCloseClick={() => (isEditRoundModalOpen = false)}>
      <RoundForm
        {game}
        round={roundToEdit}
        onCloseClick={() => (isEditRoundModalOpen = false)}
        onSubmit={handleEditRoundSubmit}
      />
    </Modal>
  {/if}
{/if}
