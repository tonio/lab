<script>
  import { createEventDispatcher } from 'svelte'
  import { onMount } from 'svelte'
	const dispatch = createEventDispatcher()

  let value = ''
  let input
  const clear = () => { value = '' }
  $: dispatch('change', { value })

  onMount(() => input.focus())
</script>

<div class="container">
  <button class:value class="clear" on:click="{clear}">&times;</button>
  <input bind:this={input} type="text" bind:value>
</div>

<style>
  input {
    border-radius: var(--radius);
    width: 100%;
    padding: var(--radius);
  }
  .container {
    position: relative;
  }
  .clear {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    width: 1.5em;
    font-size: 1.5em;
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



