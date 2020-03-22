<script>
  import List from './List.svelte'
  import CSV from 'csv.js'

  let items
  async function loadData() {
    let response = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQbUP2MhLu5P34MJvOq1OqlLRAmQKMCjfILzEF-Ldcu7eF7UY-7f0Z2okTe-iIVUYUalpYhSK-KeM05/pub?output=csv`)
    const data = await response.text()
    items = CSV.decode(data)
  }
  loadData()

</script>

<h1>Inventaire</h1>
{#if items===undefined}
  <p>toto</p>
{:else}
  {#await items}
    <p>Loading...</p>
  {:then value}
    <List {items}></List>
  {:catch error}
    <p>
      Erreur de chargement du Google Sheet: «{error.message}»
    </p>
  {/await}
{/if}


