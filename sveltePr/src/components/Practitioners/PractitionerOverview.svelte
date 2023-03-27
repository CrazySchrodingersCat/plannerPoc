<script>
  // import PractitionerService from "../../services/PractitionerService";

  import SvelteTable from "svelte-table";
  import { push, pop, replace } from "svelte-spa-router";

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

  function goToDetail(event) {
    push("/practitioners/" + event.detail.row.id);
  }

  function goToAddNew(event) {
    push("/practitioners/" + "0");
  }
</script>

<div>
  <div class="dashbord">
    <h2>Practitoners:</h2>
    <span class="menu-spacer" />
    <button on:click={goToAddNew}>New</button>

    <!-- <button on:click={add_new}>
      <Icon class="material-icons">favorite</Icon>
    </button> -->
  </div>

  <SvelteTable class='table' {columns} rows={practitioners} rowKey="id" on:clickRow={goToDetail} />

  <!-- <hr />

  {#each practitioners as pr (pr.id)}
    <p>{pr.displayName}, <span>{pr.discipline}</span></p>
  {:else}
    <p>Loading....</p>
  {/each} -->
</div>

<style>
  SvelteTable{
    border: 1px solid;
    border-collapse: collapse;
    margin-bottom: 10px;
    background-color: white;;
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
    margin-top: 20px;
    position: absolute;
  }

  button {
    margin-top: 20px;
    margin-right: 14px;
    float: right;
    background-color: #ffd740;
    border-radius: 24px;
    padding-left: 20px;
    padding-right: 20px;
    width: 100px;
    max-width: 100%;
    height: 48px;
  }
</style>
