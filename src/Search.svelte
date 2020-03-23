<script>
  import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

  let value = ''
  const clear = () => { value = '' }
  $: dispatch('change', { value })
</script>

<div class="container">
  <button class="clear" on:click="{clear}">&times;</button>
  <input type="text" bind:value>
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
    width: 2em;
  }
  .clear:hover {
    cursor: pointer;
  }
</style>



