<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="goToDetails(item.id)" v-for="item in this.$store.state.practitioners" :key="item.id">
          <td v-for="field in fields" :key="field">{{ item[field] }}</td>
        </tr>
      </tbody>
    </table>
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
    async getPractitioners() {
      await axios
        .get("https://localhost:7034/api/Practitioner")
        .then((resp) => {
          this.$store.state.practitioners = resp.data;
          console.log(this.$store.state.practitioners);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToDetails: function (id) {
      this.$router.push("/practitioners/" + id);
    },
  },
  mounted() {
    this.getPractitioners();
  },
};
</script>
