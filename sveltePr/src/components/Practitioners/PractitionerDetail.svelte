<script>
  import { push } from "svelte-spa-router";
  export let params = {};
  console.log("params:");
  console.log(params);
  const url = "https://localhost:7034/api";

  let id = params.id;
  let practitioner = { id: id, displayName: "", discipline: "" };

  
  if (id != "0") {
    fetch(url + "/Practitioner/" + id)
      .then((response) => response.json())
      .then((data) => (practitioner = data))
      .then(() => console.log(practitioner.displayName));
  } else if (id == "0") {                              //set empty form if id was 0
    practitioner = { displayName: "", discipline: "" };
  }

  let disciplines = ["Fysiotherapeut", "Regiebehandelaar", "Psycholoog(LV)", "Psycholoog (CGT)", "Psycholoog (PS)"];

  let discipline = "";

  const to_overview = () => {
    getData();
  };

  const create_user = (e) => {
    e.preventDefault();
    const user = {
      displayName: practitioner.displayName,
      discipline: practitioner.discipline,
    };
    fetch(url + "/Practitioner/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getData();
  };

  const delete_user_byId = (e) => {
    e.preventDefault();
    fetch(url + "/Practitioner/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
    getData();
  };
  const getData = (e) => {
    push("/practitioners").then(() => {
      fetch(url + "/Practitioner").then((response) => response.json());
    });
  };
  const edit_user = (e) => {
    // fetch(url + "/Practitioner/", newPractitioner);
    e.preventDefault();
    const user = {
      displayName: practitioner.displayName,
      discipline: practitioner.discipline,
    };
    console.log(user);

    fetch(url + "/Practitioner/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getData();
    // push("/practitioners").then(() => {
    //     fetch(url + "/Practitioner").then((response) => response.json());
    // });
  };
</script>

<div class="container">
  <div class="card">
    <h1>Practitioner</h1>
    <form>
      <div>
        <label for="displayName">Name</label>
        <input type="text" id="displayName" name="displayName" bind:value={practitioner.displayName} />
      </div>
      <div>
        <label for="discipline">Discipline</label>
        <select type="text" bind:value={practitioner.discipline} on:change={() => (discipline = "")}>
          {#each disciplines as disc}
            <option value={disc}>
              {disc}
            </option>
          {/each}
        </select>
      </div>

      <div>
        {#if id == "0"}
          <button disabled={!practitioner.displayName || !practitioner.discipline} on:click={create_user}>Add</button>
        {/if}
        {#if id != "0"}
          <button disabled={!practitioner.displayName} on:click={edit_user}>Save</button>
          <button class="warn" on:click={delete_user_byId}>Delete</button>
        {/if}

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
    max-width: 100%;
    height: 48px;
    line-height: normal;
  }
  .warn {
    background-color: #f44336;
    color: white;
  }
</style>
