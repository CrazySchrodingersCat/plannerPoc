<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th v-for="field in fields" :key="field">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through the list get the each student data -->
        <tr v-for="item in practitioners" :key="item">
          <td v-for="field in fields" :key="field">{{ item[field] }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <b-table striped hover :items="items"></b-table> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PractitionerList",
  data() {
    return {
      practitioners: [],
      fields: ["displayName", "discipline"],
    };
  },
  methods: {
    getPractitioners() {
      axios
        .get("https://localhost:7034/api/Practitioner")
        .then((resp) => {
          this.practitioners = resp.data;
            console.log(this.practitioners);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getPractitioners();
  },
};
</script>

<style scoped>
/* table {
  height: 500px;
  display: -moz-groupbox;
  padding-left: 0;
} */
</style>
