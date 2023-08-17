<script lang="ts">
  import { page } from '$app/stores'
  import { games } from '$lib/stores/games'
  const { gameid } = $page.params
  const game = games.getGame(gameid)
</script>

<pre style="text-align: left;">{JSON.stringify(game, undefined, 2)}</pre>
