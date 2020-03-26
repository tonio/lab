<script>
  import { NAME, ROOM, CAT, CM, PL, NB, OO } from './data'
  export let item
  const close = () => (item = undefined)
</script>

<div class="detail" class:item>
  <button class="clear" on:click={close}>&times;</button>
  {#if item}
  <h1>
    {item[NAME]}
    <br>
    <small>{item[CAT]}</small>
  </h1>
  <div class="pill">
    <span class=nb>Quantité: {item[NB] || 0}</span><span class=oo>Rebut: {item[OO] || 0}</span>
  </div>
  <p>Salle {item[ROOM]}{item[PL] ? `, placard ${item[PL]}` : ''}</p>
  {#if item[CM]}
  <p>{item[CM]}</p>
  {/if}
  {/if}
</div>

<style>
  h1 {
    font-size: 1.2rem;
    margin: 0;
    padding: 0.25em 0;
  }
  .detail {
    position: fixed;
    background: rgba(255, 255, 255, 0.75);
    top: 100vh;
    left: 0;
    right: 0;
    bottom: -50vh;
    padding: 0.5em;
    border-top: 1px solid var(--dark);
    backdrop-filter: blur(4px);
    transition: all ease 0.2s;
  }
  .detail.item {
    top: 50vh;
    bottom: -1px;
  }
  .pill {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    border-top: 1px solid var(--dark);
  }
  .pill span {
    display: inline-block;
    flex: 1;
    text-align: center;
    line-height: 2em;
  }
  .nb {
    background: var(--light);
  }
  .oo {
    background: var(--red);
    color: var(--light);
  }
  .clear {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    font-size: 1.2em;
    width: 2em;
  }
</style>
