<script>
  import { createEventDispatcher } from 'svelte'
  import { extract, SLUGS } from './data'

  export let type
  export let items=[]

	const dispatch = createEventDispatcher()
  const values = extract(items, type)
  const select = cat => dispatch('select', { value: `${type}:${cat}` })
</script>

<h2>{type}</h2>

<div class="list {SLUGS[type]}">
  {#each values as category}
    <button on:click="{() => select(category)}">{category}</button>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  button {
    border: 1px solid var(--blue);
    border-radius: var(--radius);
    margin: 0.25em;
    padding: 0.25em;
    background: none;
    text-align: center;
  }
  .cat button {
    flex: 0 calc(50% - 0.5em);
  }
  .room button {
    border-color: var(--orange);
    flex: 0 calc(25% - 0.5em);
  }
  h2 {
    margin: 0.25em 0;
    padding: 0.25em 0;
    border-bottom: 1px dotted var(--gray);
    text-align: center;
    font-size: 1rem;
  }
</style>

