<script>
  import { match } from './data'

  export let items
  export let search

  const MAX = 15

  $: filtered = (search == '') ? [] : match(search, items, MAX)
</script>

<ul>
  {#each filtered as item}
    <li>
      <span class=name>{item.Nom}</span>
      <span class=count>{item['Quantité']}</span>
      <span class=location>{item.Salle}</span>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 0.25em;
    padding: 0;
  }
  li {
    display: flex;
    border: 1px solid #ddd;
    border-radius: var(--radius);
    margin: 0.5em 0;
    padding: 0;
    align-items: center;
  }
  .name, .count, .location {
    padding: 0.25em;
  }
  .name {
    flex: 1
  }
  .count, .location {
    display: inline-block;
    text-align: center;
  }
  .count {
    width: 2em;
  }
  .location {
    width: 3em;
    background: var(--blue);
    color: var(--light);
  }
</style>

