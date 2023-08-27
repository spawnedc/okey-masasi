<script lang="ts">
  import { initialLocale, supportedLanguages, type Locale } from '$lib/i18n'
  import type { ChangeEventHandler } from 'svelte/elements'

  export let value: string | undefined | null = initialLocale
  export let onChange: (locale: Locale) => void

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault()
    onChange(event.currentTarget.value as Locale)
  }
</script>

<div class="choose-locale">
  <div class="select">
    <select {value} on:change={handleChange}>
      {#each supportedLanguages as locale}
        <option value={locale}>
          {new Intl.DisplayNames([locale], { type: 'language' }).of(locale)}
        </option>
      {/each}
    </select>
  </div>
</div>
