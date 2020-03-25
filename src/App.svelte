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
  :global(body) {
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --radius: 0.25em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
</style>

