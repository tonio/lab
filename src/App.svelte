<script>
  import List from './List.svelte'
  import Categories from './Categories.svelte'
  import Search from './Search.svelte'
  import { loadData } from './data'

  let search = ''
  let loading = loadData()
  function setFilter(e) {
    search = e.detail.value
  }

</script>

<Search value={search} on:change={setFilter}></Search>
{#await loading}
  <p>Loading...</p>
{:then items}
  <List {items} {search}></List>
  <Categories {items} on:select={setFilter}></Categories>
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

