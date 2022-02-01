<template>
  <div>
    <button @click="removeField"><img src="@/assets/trash.svg" alt="delete" width="12px"></button>
  </div>
</template>
<script>
export default {
  name: "RemoveField",
  props: {
    field: Object
  },
  methods: {
    removeField() {
      this.$store.commit('removeFieldFromOpenFile', this.field)
    }
  }
}
</script>
<style scoped>
  button {
    vertical-align: middle;
    display: block;
  }
</style>
