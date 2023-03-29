<template>
  <div class="container">
    <nav class="dashboard">
      <h1>Practitioners:</h1>
      <span class="menu-spacer" />
      <button>Add</button>
    </nav>
    <PractitionersTable />
  </div>
</template>
<script>
import PractitionersTable from "@/components/PractitionersTable.vue"; // @ is an alias to /src
//import PractitionersTable from '../components/PractitionersTable.vue';
export default {
  components: { PractitionersTable },
  data() {
    return {
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};

// @Options({
//   components: {
//      PractitionersTable
//   },
// })
</script>
<style>
.menu-spacer {
  flex: 1 1 auto;
}

a,
span {
  color: #3b5736;
  padding: 14px 18px 5px;
}

nav {
  position: relative;
  height: 4rem;
}
.dashboard {
  background-color: rgb(224, 222, 222);
  padding-left: 14px;
}
button {
  margin-top: 20px;
  margin-right: 14px;
  float: right;
  background-color: #ffd740;
  border-radius: 24px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100px;
  max-width: 100%;
  height: 48px;
}
</style>
