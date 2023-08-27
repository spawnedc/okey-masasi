<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import GameForm from '$lib/components/GameForm.svelte'
  import GameList from '$lib/components/GameList.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { games } from '$lib/stores/games'
  import type { CreateNewGameProps, Game } from '$lib/types'
  import { messages } from '$lib/app.messages.svelte'
  import AppMenu from '$lib/components/AppMenu.svelte'

  let isGameModalVisible = false
  let gameToEdit: Game | undefined

  let isAppMenuOpen = false

  const handleModalClose = () => {
    isGameModalVisible = false
    gameToEdit = undefined
  }

  const handleNewGameSubmit = (gameParams: CreateNewGameProps) => {
    const newGame = games.createNewGame(gameParams)
    goto(`${base}/games/${newGame.id}`)
  }

  const handleEditGameSubmit = (gameParams: CreateNewGameProps) => {
    gameParams.playerNames.forEach((name, index) => {
      if (gameToEdit) {
        gameToEdit.players[index].name = name
      }
    })
    if (gameToEdit) {
      gameToEdit.points = gameParams.colourPoints
      gameToEdit.gostergePoint = gameParams.gostergePoint
      games.updateGame(gameToEdit)
    }
    handleModalClose()
  }
</script>

<div class="level is-mobile">
  <div class="level-left">
    <div class="level-item">
      <h1 class="title">{$_(messages.appTitle)}</h1>
    </div>
  </div>
  <div class="level-right">
    <div class="level-item">
      <button class="button" on:click={() => (isAppMenuOpen = true)}>
        <span class="icon is-small">
          <i class="fas fa-bars" />
        </span>
      </button>
    </div>
  </div>
</div>

<button type="button" class="button is-info" on:click={() => (isGameModalVisible = true)}>
  <span class="icon">
    <i class="fab fa-plus" />
  </span>
  <span>{$_(messages.newGame)}</span>
</button>

<div class="block" />

<GameList
  onEditGameClick={(game) => {
    gameToEdit = game
    isGameModalVisible = true
  }}
/>

{#if isGameModalVisible}
  <Modal
    onCloseClick={handleModalClose}
    title={$_(gameToEdit ? messages.editGame : messages.newGame)}
  >
    <GameForm
      game={gameToEdit}
      onCancelClick={handleModalClose}
      onSubmit={gameToEdit ? handleEditGameSubmit : handleNewGameSubmit}
    />
  </Modal>
{/if}

<AppMenu isOpen={isAppMenuOpen} onClose={() => (isAppMenuOpen = false)} />
