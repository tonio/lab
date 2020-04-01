<script>
  import Map from './Map.svelte'
  import { NAME, ROOM, CAT, CM, PL, NB, OO } from './data'
  export let item
  let location
  const close = () => (item = undefined)
  $: location = item
    ? (`Salle ${item[ROOM]}` + (item[PL] ? (', placard '+item[PL]) : ''))
    : ''
</script>

<div class="detail" class:item>
  {#if item}
  <h1>
    <span>
      {item[NAME]}
      <br>
      <small>{item[CAT]}</small>
    </span>
    <button class="clear" on:click={close}>&times;</button>
  </h1>
  {#if item[CM]}
  <p>{item[CM]}</p>
  {/if}
  <Map {location}></Map>
  <div class="pill">
    <span class=nb>Quantité: {item[NB] || 0}</span><span class=oo>Rebut: {item[OO] || 0}</span>
  </div>
  {/if}
</div>

<style>
  h1 {
    font-size: 1.1rem;
    margin: 0;
    padding: 0.25em 0;
    display: flex;
  }
  h1 small {
    color: var(--blue);
  }
  h1 span {
    flex: 1;
  }
  .clear {
    background: var(--gray);
    color: var(--light);
    border: none;
    padding: 0 0.25em;
    font-size: 1.8em;
    height: 1.25em;
  }
  .detail {
    position: fixed;
    background: rgba(255, 255, 255, 0.75);
    height: 20em;
    left: 0;
    right: 0;
    bottom: -31em;
    padding: 0.5em;
    border-top: 1px solid var(--dark);
    backdrop-filter: blur(4px);
    transition: bottom ease 0.2s;
    display: flex;
    flex-direction: column;
  }
  :global(.map) {
    flex: 1;
  }
  .detail.item {
    bottom: 0;
  }
  p {
    margin: 0 0 0.5em;
  }
  .pill {
    display: flex;
    border-top: 1px solid var(--dark);
  }
  .pill span {
    display: inline-block;
    flex: 1;
    text-align: center;
    line-height: 3em;
  }
  .nb {
    background: var(--light);
  }
  .oo {
    background: var(--red);
    color: var(--light);
  }
</style>
