<script lang="ts">
  import { _, date, time } from 'svelte-i18n'
  import { v4 } from 'uuid'
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { messages } from '$lib/app.messages.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import RoundForm from '$lib/components/RoundForm.svelte'
  import RoundTable from '$lib/components/RoundTable.svelte'
  import { games } from '$lib/stores/games'
  import type { Game, Round, RoundWithoutId } from '$lib/types'
  import { dateTimeOptions } from '$lib/constants'

  const { gameid } = $page.params

  let game: Game | undefined
  $: game = $games.find((g) => g.id === gameid)

  let roundToEdit: Round | undefined

  const handleNewRoundSubmit = (round: RoundWithoutId) => {
    if (game) {
      game.rounds.push({ ...round, id: v4() })
      games.updateGame(game)
    }
    isNewRoundModalOpen = false
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

  let createdAt: Date | undefined
  $: createdAt = game ? new Date(game.createdAt) : undefined

  let gameName: string
  $: gameName = createdAt ? $date(createdAt, dateTimeOptions) : ''
</script>

{#if !game}
  <p>{$_(messages.noGame.id)}</p>
{:else}
  <h1 class="title">
    <a class="button is-white" href={`${base}/`}>
      <span class="icon">
        <i class="fas fa-arrow-left" />
      </span>
    </a>
    {gameName}
  </h1>

  <button class="button" on:click={() => (isNewRoundModalOpen = true)}>
    {$_(messages.newRound.id)}
  </button>

  <div class="block" />

  <RoundTable {game} onRowClick={handleRoundClick} />

  {#if isNewRoundModalOpen === true}
    <Modal onCloseClick={() => (isNewRoundModalOpen = false)} title={$_(messages.newRound.id)}>
      <RoundForm
        {game}
        onCloseClick={() => (isNewRoundModalOpen = false)}
        onSubmit={handleNewRoundSubmit}
      />
    </Modal>
  {/if}

  {#if isEditRoundModalOpen === true}
    <Modal onCloseClick={() => (isEditRoundModalOpen = false)} title={$_(messages.editRound.id)}>
      <RoundForm
        {game}
        round={roundToEdit}
        onCloseClick={() => (isEditRoundModalOpen = false)}
        onSubmit={handleEditRoundSubmit}
      />
    </Modal>
  {/if}
{/if}
