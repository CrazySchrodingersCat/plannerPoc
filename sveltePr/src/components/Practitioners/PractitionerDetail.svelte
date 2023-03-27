<script>
  import { push } from "svelte-spa-router";
  export let params = {};
  console.log("params:");
  console.log(params);
  const url = "https://localhost:7034/api";

  let id = params.id;
  let practitioner = { id: id, displayName: "", discipline: "" };

  if (id != "0") {
    //  try{
    fetch(url + "/Practitioner/" + id)
      .then((response) => response.json())
      .then((data) => (practitioner = data))
      .then(() => console.log(practitioner.displayName));
  }
  // } catch(e) {
  //     console.log('There was an error', e);
  // }
  else if (id == "0") {
    practitioner = { displayName: "", discipline: "" };
  }

  const to_overview = () => {
    push("/practitioners");
  };

  const create_user = (e) => {
    e.preventDefault();
    const user = {
      displayName: practitioner.displayName,
      discipline: practitioner.discipline,
    };
  };

  const save = () => {
    // fetch(url + "/Practitioner/", newPractitioner);
  };
  function deleteById(event, id) {
    alert(event.detail.text);
  }

  console.log(params);
</script>

<!-- svelte-ignore missing-declaration -->
<div class="container">
  <div class="card">
    <h1>Practitioner</h1>
    <!-- <h1>ID: {params.id}</h1> -->

    <form>
      <div>
        <label for="displayName">Name</label>
        <input type="text" id="displayName" name="displayName" bind:value={practitioner.displayName} />
      </div>
      <div>
        <label for="discipline">Discipline</label>
        <input type="text" id="discipline" name="discipline" bind:value={practitioner.discipline} />
      </div>
      <div>
        <button on:click={save}>Save</button>
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
