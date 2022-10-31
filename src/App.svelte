<script lang="ts">
  import { onMount } from 'svelte'

  import List from './List.svelte'
  import Filter from './Filter.svelte'
  import Search from './Search.svelte'
  import Detail from './Detail.svelte'
  import { load, STORES, CAT, ROOM } from './data'

  const { search, loading, results, categories, rooms, error } = STORES
  let focused

  onMount(load)

  const setFilter = e => search.set(e.detail.value)
  const show = e => (focused = e.detail.item)

</script>

<Search value={$search} on:change={setFilter}></Search>
{#if $loading}
  <p>Loading...</p>
{:else if $error}
  <p>
    Erreur de chargement du Google Sheet: «{$error.message}»
  </p>
{:else}
  <List items="{$results}" on:select="{show}"></List>
  <Filter type="{CAT}" values="{$categories}" on:select={setFilter}></Filter>
  <Filter type="{ROOM}" values="{$rooms}" on:select={setFilter}></Filter>
{/if}

<Detail item="{focused}"></Detail>

<style>
</style>

