<script>
  import List from './List.svelte'
  import Filter from './Filter.svelte'
  import Search from './Search.svelte'
  import { loadData, CAT, ROOM } from './data'

  let search = ''
  const loading = loadData()
  const setFilter = e => { search = e.detail.value }
</script>

<Search value={search} on:change={setFilter}></Search>
{#await loading}
  <p>Loading...</p>
{:then items}
  <List {items} {search}></List>
  <Filter type="{CAT}" {items} on:select={setFilter}></Filter>
  <Filter type="{ROOM}" {items} on:select={setFilter}></Filter>
{:catch error}
  <p>
    Erreur de chargement du Google Sheet: «{error.message}»
  </p>
{/await}

<style>
</style>

