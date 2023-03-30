<template>
  <div class="container">
    <h2>Practitioner</h2>
    <form>
      <div>
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" type="text" placeholder="Name practitioner" />
        </div>
      </div>
      <div>
        <label class="label">Discipline</label>
        <div class="control">
          <input v-model="discipline" type="text" placeholder="Name practitioner"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 20%;
}
.form {
  position: relative;
  width: 50%;
  margin: 25%;
}
h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
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
