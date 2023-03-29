<script>
  // import PractitionerService from "../../services/PractitionerService";
  import { onMount } from "svelte";
  import SvelteTable from "svelte-table";
  import { push } from "svelte-spa-router";


  const url = "https://localhost:7034/api";

  let practitioners = [];

  onMount(async () => {
    fetch(url + "/Practitioner")
      .then((response) => response.json())
      .then((data) => (practitioners = data))
      .then(() => console.log(practitioners));
  });

  const columns = [
    { key: "displayName", title: "Name", value: (v) => v.displayName },
    { key: "discipline", title: "Discipline", value: (v) => v.discipline },
  ];

  function goToDetail(event) {
    push("/practitioners/" + event.detail.row.id);
  }

  function goToAddNew(event) {
    push("/practitioners/" + "0");
  }
</script>

<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
  integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
  crossorigin="anonymous"
/>
<div class="container">
  <div class="dashboard">
    <h2>Practitoners:</h2>
    <span class="menu-spacer" />
    <button on:click={goToAddNew}>New </button>
  </div>
  <div class="row">
    <SvelteTable {columns} rows={practitioners} rowKey="id" on:clickRow={goToDetail} 
    classNameTable={["table table-striped"]}  
    classNameSelect={['custom-select']}/>
  </div>
</div>

<style>
  .menu-spacer {
    flex: 1 1 auto;
  }
  .container {
    /* position: absolute; */

    margin-top: 0rem;
  }
  .dashboard {
    position: relative;
    background-color: #b1afafa3;
    height: 4rem;
    padding: 14px;
  }

  button {
    float: right;
    background-color: #ffd740;
    border-radius: 24px;
    width: 100px;
    max-width: 100%;
    height: 48px;
  }
 
</style>
