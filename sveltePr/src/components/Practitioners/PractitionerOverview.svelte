<script>
  // import PractitionerService from "../../services/PractitionerService";

  import SvelteTable from "svelte-table";

  const url = "https://localhost:7034/api";

  let practitioners = [];

  fetch(url + "/Practitioner")
    .then((response) => response.json())
    .then((data) => (practitioners = data))
    .then(() => console.log(practitioners));

  const columns = [
    { key: "displayName", title: "name", value: (v) => v.displayName },
    { key: "discipline", title: "discipline", value: (v) => v.discipline },
  ];

  const add_new = () => {};
</script>

<div>
  <div class="dashbord">
    <h2>Practitoners:</h2>
    <span class="menu-spacer" />
    <button   on:click={add_new}>New</button>

     <!-- <button on:click={add_new}>
      <Icon class="material-icons">favorite</Icon>
    </button> -->
  </div>

  <SvelteTable {columns} rows={practitioners} />

  <!-- <hr />

  {#each practitioners as pr (pr.id)}
    <p>{pr.displayName}, <span>{pr.discipline}</span></p>
  {:else}
    <p>Loading....</p>
  {/each} -->
</div>

<style>
  table,
  th,
  td {
    border: 1px solid;
    border-collapse: collapse;
    margin-bottom: 10px;
  }

  .menu-spacer {
    flex: 1 1 auto;
  }
  .dashbord {
    position: relative;
    height: 70px;
  }

  h2 {
    padding: 14px;
    margin-top: 10px;
    position: absolute;
  }

  button {
    margin-top: 10px;
    margin-right: 14px;
    float: right;
  }
</style>
