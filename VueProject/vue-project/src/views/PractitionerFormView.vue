<template>
  <div class="container">
    <h2>Practitioner</h2>
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
        <button type="button" v-if="this.id == 0" @click="addPractitioner">Add</button>
        <div v-if="this.id != 0">
          <button type="button">Save</button>
          <button class="danger" type="button">Delete</button>
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

export default {
  data() {
    return {
      v$: useValidate(),
      id: this.$route.params,
      practitioner: {
        displayName: "",
        discipline: "",
      },
      selected: null,
      disciplines: ["Fysiotherapeut", "Regiebehandelaar", "Psycholoog(LV)", "Psycholoog (CGT)", "Psycholoog (PS)"],
    };
  },
  methods: {
    goToList() {
      this.$router.push("/practitioners");
    },
    addPractitioner() {
      try {
        const url = "https://localhost:7034/api/Practitioner";
        const data = { displayName: this.practitioner.displayName, discipline: this.practitioner.discipline };
        const config = { "content-type": "application/json" };
        axios.post(url, data, config);

        this.goToList();
      } catch (error) {
        console.error(error);
      }
    },
    getPractitioner(id) {
      try {
        // this.id="1E069300-3D27-1617-0B9A-B31173FF3F9F";
        const url = "https://localhost:7034/api/Practitioner/";
        const config = { "content-type": "application/json" };
        axios.get(url + id, config).then((response)=>this.practitioner=response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    console.log("+++");
    console.log(this.id.id);
    this.getPractitioner(this.id.id);
    console.log(this.practitioner);
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
