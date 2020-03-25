<script>
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'

  export let value = ''

	const dispatch = createEventDispatcher()
  let input
  const clear = () => { value = '' }
  $: dispatch('change', { value })

  onMount(() => input.focus())
</script>

<div class="container">
  <button class:value class="clear" on:click="{clear}">&times;</button>
  <input bind:this={input} type="text" bind:value placeholder="Rechercher">
</div>

<style>
  input {
    border-radius: var(--radius);
    border-color: var(--primary);
    width: 100%;
    padding: var(--radius);
    margin: 0;
  }
  .container {
    position: sticky;
    top: 0;
    background: var(--dark);
    padding: 0.5em;
  }
  .clear {
    position: absolute;
    top: 0.6em;
    right: 0.6em;
    border: none;
    background: var(--dark);
    color: var(--light);
    width: 1.5em;
    font-size: 1.19em;
    padding: 0px;
    display: none;
  }
  .clear:hover {
    cursor: pointer;
  }
  .value {
    display: inline-block;
  }
</style>



