<script lang="ts">
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import GameForm from '$lib/components/GameForm.svelte'
  import GameList from '$lib/components/GameList.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { games } from '$lib/stores/games'
  import type { CreateNewGameProps, Game } from '$lib/types'

  let isNewGameModalVisible = false
  let isEditGameModalVisible = false
  let gameToEdit: Game | undefined

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
    isEditGameModalVisible = false
    gameToEdit = undefined
  }
</script>

<main class="container">
  <h1 class="title">Okey Masasi</h1>

  <button type="button" class="button is-info" on:click={() => (isNewGameModalVisible = true)}>
    <span class="icon">
      <i class="fab fa-plus" />
    </span>
    <span>New game</span>
  </button>

  <div class="block" />

  <GameList
    onEditGameClick={(game) => {
      gameToEdit = game
      isEditGameModalVisible = true
    }}
  />

  {#if isNewGameModalVisible}
    <Modal onCloseClick={() => (isNewGameModalVisible = false)}>
      <GameForm
        onCancelClick={() => (isNewGameModalVisible = false)}
        onSubmit={handleNewGameSubmit}
      />
    </Modal>
  {/if}

  {#if isEditGameModalVisible}
    <Modal onCloseClick={() => (isEditGameModalVisible = false)}>
      <GameForm
        game={gameToEdit}
        onCancelClick={() => (isEditGameModalVisible = false)}
        onSubmit={handleEditGameSubmit}
      />
    </Modal>
  {/if}
</main>
