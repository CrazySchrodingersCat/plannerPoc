<template>
  <div class="container">
    <h2>Practitioner</h2>
    <h1>{{ this.$store.state.message }}</h1>
    <form>
      <p>
        <label>Name</label>

        <input v-model="practitioner.displayName" type="text" />
      </p>
      <p>
        <label>Discipline</label>
        <select v-model="practitioner.discipline">
          <option v-for="discipline in disciplines" :value="discipline" :key="discipline">{{ discipline }}</option>
        </select>
      </p>
      <div>
        <button type="button" v-if="this.id.id == 0" @click="addPractitioner">Add</button>
        <div v-if="this.id.id != 0">
          <button class="danger" type="button" @click="deletePractitioner">Delete</button>
          <button type="button" @click="editPractitioner">Save</button>
        </div>
        <span class="menu-spacer" />
        <button type="button" class="white" @click="goToList">To list</button>
      </div>
    </form>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { store } from "../store/index.ts";

export default {
  data() {
    return {
      v$: useValidate(),
      url: "https://localhost:7034/api/Practitioner/",
      config: { "content-type": "application/json" },
      id: this.$route.params,
      practitioner: {
        displayName: "",
        discipline: "",
      },
      disciplines: ["Fysiotherapeut", "Regiebehandelaar", "Psycholoog(LV)", "Psycholoog (CGT)", "Psycholoog (PS)"],
    };
  },
  methods: {
    goToList() {
      axios.get(this.url).then((resp) => {
        this.$store.state.practitioners = resp.data;
      });
      this.$router.push("/practitioners");
      // .then( axios.get(this.url).then((resp) => {
      //   this.$store.state.practitioners = resp.data;
      // }));
    },
    addPractitioner() {
      try {
        axios.post(this.url, this.practitioner, this.config);

        this.goToList();
      } catch (error) {
        console.error(error);
      }
    },
    getPractitioner(id) {
      try {
        axios.get(this.url + id, this.config).then((response) => (this.practitioner = response.data));
      } catch (error) {
        console.error(error);
      }
    },
    deletePractitioner() {
      console.log(this.id.id);
      axios.delete(this.url + this.id.id).then((response) => console.log(response));
      console.log("user " + this.practitioner.displayName + " deleted");
      alert("user " + this.practitioner.displayName);
      this.goToList();
    },
    editPractitioner() {
      try {
        axios.put(this.url + this.id.id, this.practitioner, this.config).then((response) => console.log(response));
        this.goToList();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    if (this.id.id != 0) {
      this.getPractitioner(this.id.id);
    }
  },
  validations() {
    return {
      practitioner: {
        displayName: { required },
        discipline: { required },
      },
    };
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 20%;
  width: 50%;
  margin: 20px 25% auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
}
.form {
  width: 50%;
  margin: 25%;
  display: flex;
  justify-content: space-between;
}

form > div {
  display: flex;
  justify-content: space-between;
}
form > div + * {
  margin-top: 10px;
}
p,
select,
input {
  background-color: #f5f5f5;
  padding: 14px;
}
label {
  color: #0009;
}
input,
select {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  padding: 5px 0;
  margin: 10px 0 5px 0;
  width: 100%;
}
button {
  margin-top: 20px;
  margin-right: 14px;
  background-color: #ffd740;
  border-radius: 24px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100px;
  max-width: 100%;
  height: 48px;
}
.menu-spacer {
  flex: 1 1 auto;
}
.danger {
  background-color: #f44336;
  color: white;
}
.white {
  background-color: white;
}
</style>
