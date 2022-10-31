<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { match, NAME, ROOM } from './data'

  export let items

	const dispatch = createEventDispatcher()
  const select = item => dispatch('select', { item })
</script>

<div class="container">
  {#each items as item}
    <button on:click="{() => select(item)}">
      <span class=name>{item[NAME]}</span>
      <span class=location>{item[ROOM]}</span>
    </button>
  {/each}
</div>

<style>
  .container {
    margin: 0 0.25em;
    padding: 0;
  }
  button {
    display: flex;
    border: 1px solid #ddd;
    border-radius: var(--radius);
    margin: 0.5em 0;
    padding: 0;
    align-items: center;
    width: 100%;
  }
  .name, .location {
    padding: 0.25em;
  }
  .name {
    flex: 1
  }
  .location {
    display: inline-block;
    text-align: center;
  }
  .location {
    width: 3em;
    background: var(--blue);
    color: var(--light);
  }
</style>

