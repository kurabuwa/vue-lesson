<template>
  <input type="text" v-model="computedValue">
</template>

<script>
export default {
  props: {
    value: String,
  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
}
</script>
