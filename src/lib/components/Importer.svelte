<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { games } from '$lib/stores/games'
  import { messages } from './Importer.messages.svelte'

  enum status {
    IDLE,
    LOADING,
    ERROR,
    SUCCESS,
  }

  let importStatus = status.IDLE

  let isIdle: boolean
  let isLoading: boolean
  let isError: boolean
  let isSuccess: boolean

  $: {
    isIdle = importStatus === status.IDLE
    isLoading = importStatus === status.LOADING
    isError = importStatus === status.ERROR
    isSuccess = importStatus === status.SUCCESS
  }

  const switchToIdle = () => {
    // Hehe.
    setTimeout(() => {
      importStatus = status.IDLE
    }, 3000)
  }

  const importFile = (file: File) => {
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      if (typeof event.target?.result === 'string') {
        try {
          const parsed = JSON.parse(event.target.result)
          games.set(parsed)
          importStatus = status.SUCCESS
        } catch {
          importStatus = status.ERROR
        } finally {
          switchToIdle()
        }
      }
    })
    setTimeout(() => {
      reader.readAsText(file)
    }, 1000)
  }

  const openFileDialog = () => {
    importStatus = status.IDLE
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => {
      // you can use this method to get file and perform respective operations
      if (input.files) {
        importStatus = status.LOADING
        const [file] = Array.from(input.files)
        importFile(file)
      }
    }
    input.click()
  }
</script>

<button
  class="button"
  on:click={() => openFileDialog()}
  class:is-info={isIdle || isLoading}
  class:is-loading={isLoading}
  class:is-danger={isError}
  class:is-success={isSuccess}
>
  <span class="icon">
    <i
      class="fas"
      class:fa-file-import={isIdle}
      class:fa-check={isSuccess}
      class:fa-circle-exclamation={isError}
    />
  </span>
  {#if isIdle}
    <span>{$_(messages.importLabel)}</span>
  {:else if isError}
    <span>{$_(messages.importErrorMessage)}</span>
  {:else if isSuccess}
    <span>{$_(messages.successMessage)}</span>
  {/if}
</button>
