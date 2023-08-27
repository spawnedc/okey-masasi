<script lang="ts">
  import { _, locale } from 'svelte-i18n'
  import type { Locale } from '$lib/i18n'
  import { messages as appMessages } from '$lib/app.messages.svelte'
  import Exporter from './Exporter.svelte'
  import LanguageSwitcher from './LanguageSwitcher.svelte'
  import Importer from './Importer.svelte'

  export let isOpen = false
  export let onClose: () => void

  const handleLocaleChange = (newLocale: Locale) => {
    locale.set(newLocale)
  }
</script>

<div class="app-menu is-overlay is-flex is-flex-direction-column" class:open={isOpen}>
  <div class="card is-flex-grow-1">
    <header class="card-header">
      <p class="card-header-title">{$_(appMessages.appTitle)}</p>
      <button class="card-header-icon" aria-label="close" on:click={onClose}>
        <span class="icon">
          <i class="fas fa-close" aria-hidden="true" />
        </span>
      </button>
    </header>
    <div class="card-content">
      <div class="block">
        <LanguageSwitcher onChange={handleLocaleChange} value={$locale} />
      </div>
      <div class="block">
        <Exporter />
      </div>
      <div class="block">
        <Importer />
      </div>
    </div>
  </div>
</div>

<style>
  .app-menu {
    transition: 0.3s transform ease-in-out;
    transform: translateX(100%);
    z-index: 99;
  }

  .app-menu.open {
    transform: translateX(0);
  }
</style>
