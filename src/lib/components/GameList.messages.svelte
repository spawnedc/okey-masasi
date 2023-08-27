<script context="module">
  import { defineMessages } from 'svelte-i18n'

  export const messages = defineMessages({
    noGamesFound: {
      id: 'gameList.noGamesFound',
      default: 'No games found',
    },
    deletePrompt: {
      id: 'gameList.deletePrompt',
      default: 'Are you sure you want to delete this game?',
    },
  })
</script>
