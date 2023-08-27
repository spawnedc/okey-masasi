<script lang="ts">
  export let onCloseClick: () => void
  export let title: string | undefined = undefined
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={onCloseClick} />
  <div class="modal-content">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title pl-2">
          {#if title}
            {title}
          {/if}
        </p>
        <button class="card-header-icon pr-2" aria-label="close" on:click={onCloseClick}>
          <span class="icon">
            <i class="fas fa-close" aria-hidden="true" />
          </span>
        </button>
      </header>
      <div class="card-content p-2">
        <slot />
      </div>
    </div>
  </div>
</div>
