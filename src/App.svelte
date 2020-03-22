<script>
  import List from './List.svelte'
  import Search from './Search.svelte'
  import { loadData } from './data'

  let loading = loadData()

</script>

<Search></Search>
{#await loading}
  <p>Loading...</p>
{:then items}
  <List {items}></List>
{:catch error}
  <p>
    Erreur de chargement du Google Sheet: «{error.message}»
  </p>
{/await}

<style>
  :global(body) {
    --blue: lightblue;
    --radius: 0.25em;
  }
</style>

