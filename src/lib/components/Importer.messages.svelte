<script context="module">
  import { defineMessages } from 'svelte-i18n'

  export const messages = defineMessages({
    importLabel: {
      id: 'importer.importLabel',
      default: 'Import data',
    },
    importErrorMessage: {
      id: 'importer.importErrorMessage',
      default: 'Failed to import',
    },
    successMessage: {
      id: 'importer.successMessage',
      default: 'Successful!',
    },
  })
</script>
