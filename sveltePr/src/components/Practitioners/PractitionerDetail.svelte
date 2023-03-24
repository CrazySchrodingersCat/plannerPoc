<script lang="ts">
  import { push, pop, replace } from "svelte-spa-router";
  export let params = {};
  const url = "https://localhost:7034/api";

  let id = 'dc9f3012-9826-4bdb-90ef-38cf8366235a';
  let practitioner = { id: id, displayName: "", discipline: "" };

  fetch(url + "/Practitioner/" + id)
    .then((response) => response.json())
    .then((data) => (practitioner = data))
    .then(() => console.log(practitioner));

  const to_overview = () => {
    push("/practitioners");
  };

  const save = () => {};
  const deleteById = () => {};

  console.log(params);
</script>

<div class="container">
  <div class="card">
    <h1>Practitioner</h1>
    <!-- <h1>ID: {params.id}</h1> -->

    <form>
      <div>
        <label for="displayName">Name</label>
        <input type="text" id="displayName" name="displayName" value={practitioner.displayName} />
      </div>
      <div>
        <label for="discipline">Discipline</label>
        <input type="text" id="discipline" name="discipline" value={practitioner.discipline} />
      </div>
      <div>
        <button on:click={to_overview}>Save</button>
        <button on:click={to_overview}>Delete</button>
        <span class="menu-spacer" />

        <button on:click={to_overview}>Back to list</button>
      </div>
    </form>
  </div>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  form > div {
    display: flex;
     justify-content: space-between; 
  }

  form > div + * {
    margin-top: 10px;
  }
  .container {
    position: relative;
    display: flex;
    height: 400px;
    width: 100%;
    align-items: center;
    justify-items: center;
  }
  .card {
    position: absolute;
    background-color: white;
    width: 50%;
    top: 30%;
    bottom: auto;
    left: 25%;
    right: auto;
    margin: auto;
    padding: 14px;
  }

  .menu-spacer {
    flex: 1 1 auto;
  }
  button {
    border-radius: 24px;
    padding-left: 20px;
    padding-right: 20px;
    width: auto;
    max-width: 100%;
    height: 48px;
    line-height: normal;
   
  }
</style>
