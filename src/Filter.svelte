<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { CAT, ROOM } from './data'
  const SLUGS = {
    [CAT]: "cat",
    [ROOM]: "room"
  }

  export let type: string
  export let values: string[]

	const dispatch = createEventDispatcher()
  const select = (cat: string) => dispatch('select', { value: `${type}:${cat}` })
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

