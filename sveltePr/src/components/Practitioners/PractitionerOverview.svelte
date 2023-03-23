<script>
  import SvelteTable from "svelte-table";

  const url = "https://localhost:7034/api";

  let practitioners = [];
  let rows = [];

  fetch(url + "/Practitioner")
    .then((response) => response.json())
    .then((data) => (practitioners = data))  
    .then(() => console.log(practitioners)); 


  const columns = [
    { key: "displayName", title: "name", value: (v) => v.displayName },
    { key: "discipline", title: "discipline", value: (v) => v.discipline },
  ];
  // import PractitionerService from "../../services/PractitionerService";
</script>

<div>
  <nav>Practitoners:</nav>


  <SvelteTable columns="{columns}" rows="{practitioners}" />

  <!-- <hr />

  {#each practitioners as pr (pr.id)}
    <p>{pr.displayName}, <span>{pr.discipline}</span></p>
  {:else}
    <p>Loading....</p>
  {/each} -->
</div>
