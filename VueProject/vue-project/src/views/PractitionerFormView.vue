<template>
  <section class="form">
    <div>Practitioner</div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          v-model="name"
          class="input"
          type="text"
          placeholder="Text input"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
