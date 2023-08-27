<script lang="ts">
  export let onCloseClick: () => void
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={onCloseClick} />
  <div class="modal-content">
    <div class="box p-2">
      <slot />
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close" on:click={onCloseClick} />
</div>
