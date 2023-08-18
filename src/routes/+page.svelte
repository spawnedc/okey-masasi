<script lang="ts">
  import { v4 } from 'uuid'
  import GameList from '$lib/components/GameList.svelte'
  import { games } from '$lib/stores/games'
  import type { Game } from '$lib/types'
</script>

<main class="container">
  <h1 class="title">Okey Masasi</h1>

  <GameList />
</main>
