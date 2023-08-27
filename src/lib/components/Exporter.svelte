<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { messages } from './Exporter.messages.svelte'

  const exportData = () => {
    const rawData = localStorage.getItem('games') || ''

    const blob = new Blob([rawData])
    const a = document.createElement('a')
    document.body.append(a)

    const now = new Date().toISOString()
    a.download = `games-${now}.json`
    a.href = URL.createObjectURL(blob)
    a.click()
    a.remove()
  }
</script>

<button class="button is-info" on:click={() => exportData()}>
  <span class="icon">
    <i class="fas fa-file-export" />
  </span>
  <span>{$_(messages.exportLabel)}</span>
</button>
