<script context="module">
  import { defineMessages } from 'svelte-i18n'

  export const messages = defineMessages({
    playerTitle: {
      id: 'gameForm.playerTitle',
      default: 'Player {number}',
    },
    playerNamePlaceHolder: {
      id: 'gameForm.playerNamePlaceHolder',
      default: "Player {number}'s name",
    },
    colourPointsLabel: {
      id: 'gameForm.colourPointsLabel',
      default: 'Colour points',
    },
    indicatorPointLabel: {
      id: 'gameForm.indicatorPointLabel',
      default: 'Indicator points',
    },
  })
</script>
