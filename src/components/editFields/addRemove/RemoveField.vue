<template>
  <div>
    <button @click="removeField"><img src="@/assets/trash.svg" alt="delete" width="12px"></button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "RemoveField",
  props: {
    field: Object
  },
  methods: {
    removeField() {
      this.$store.dispatch('removeField', this.field),
      this.updateUnsavedEdits();
    },
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: true});
    }
  },
  computed: {
    ...mapGetters(['unsavedEdits'])
  }
}
</script>
<style scoped>
  button {
    vertical-align: middle;
    display: block;
  }
</style>
