<script>
  import 'bulma/css/bulma.css'
  import { _, waitLocale } from 'svelte-i18n'
  import '@fortawesome/fontawesome-free/css/all.css'
  import '$lib/i18n'
  import { messages } from '$lib/app.messages.svelte'
  import '../styles.css'

  export async function preload() {
    // awaits for the loading of the 'en-US' and 'en' dictionaries
    return waitLocale()
  }
</script>

<svelte:head>
  <title>{$_(messages.appTitle.id)}</title>
</svelte:head>

<slot />
