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
      console.log('RemoveField', this.field);
      this.$store.dispatch('removeField', this.field),
      this.updateUnsavedEdits();
      if (this.field.type == 'globalPartial') {

         const config = {
          path: this.field.filePath,
          name: this.field.relativePath,
          cwd: this.cwd,
          openFileName: this.openFileName,
          usage: 'createModifySrcMap',
          action: 'remove'
        }

        window.ipc.send('helperTask', config);
      }
    },
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: true});
    }
  },
  computed: {
    ...mapGetters(['unsavedEdits', 'openFileName', 'cwd'])
  }
}
</script>
<style scoped>
  button {
    vertical-align: middle;
    display: block;
  }
</style>
