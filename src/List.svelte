<script>
  export let items
</script>

<ul>
  {#each items as item}
    <li>
      <span class=name>{item.Nom}</span>
      <span class=location>{item.Salle}</span>
    </li>
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 0.25em;
    margin: 0.5em 0;
    padding: 0.25em;
  }
  .name {
    flex: 1
  }
</style>

