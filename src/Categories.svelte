<script>
  import { createEventDispatcher } from 'svelte'
  import {extractCategories} from './data'

  export let items

	const dispatch = createEventDispatcher()
  const categories = extractCategories(items)

  const select = cat => dispatch('select', { value: `Catégorie:${cat}` })

</script>

<h2>Catégories</h2>

<ul>
  {#each categories as category}
    <li>
      <button on:click="{() => select(category)}">{category}</button>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    border: 1px solid lightblue;
    border-radius: var(--radius);
    margin: 0.25em;
    flex: 0 calc(50% - 1.2em);
    padding: 0.25em;
  }
  button {
    border: none;
    background: none;
    display: inline;
    margin: 0;
    padding: 0;
  }
  h2 {
    margin: 0.25em 0;
    padding: 0.25em 0;
    border-bottom: 1px dotted orange;
    text-align: center;
    font-size: 1.2rem;
  }
</style>

