<script>
  import { createEventDispatcher } from 'svelte'
  import { match, NAME, ROOM } from './data'

  export let items
  export let search

	const dispatch = createEventDispatcher()
  const MAX = 40
  const select = item => dispatch('select', { item })

  $: filtered = (search == '') ? [] : match(search, items, MAX)
</script>

<ul>
  {#each filtered as item}
    <li on:click="{() => select(item)}">
      <span class=name>{item[NAME]}</span>
      <span class=location>{item[ROOM]}</span>
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

