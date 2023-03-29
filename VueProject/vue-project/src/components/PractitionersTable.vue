<template>
  <div>table</div>
  <button @click="getPractitioners">Get</button>
</template>

<script>
import axios from "axios";
export default {
  name: "PractitionerList",
  data() {
    return {
      practitioners: [],
    };
  },
  methods: {
    getPractitioners() {
      axios
        .get("https://localhost:7034/api/Practitioner")
        .then((resp) => {
          this.practitioners = resp.data;
          console.log(this.practitioners[0].displayName);
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

<style lang="scss" scoped></style>
