<template>
  <div class="btn-save-container">
  <button class="btn-save" :class="{'hide': !unsavedEdits}" @click="saveFile()">Save File</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "SaveFile",
  computed: {
    ...mapGetters(['openFile', 'currentFilePath', "unsavedEdits" ])
  },
  methods: {
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: false});
    },
    saveFile() {
      window.ipc.send('saveFile', {
        file: this.openFile,
        path: this.currentFilePath
        });

      // In its current state this isnt quite right.
      // It is possible that the save fails and this still is updated
      // Must change the window.ipc.send to use handle(), invoke(), and promises.
      // Reference
      // https://stackoverflow.com/questions/45148110/how-to-add-a-callback-to-ipc-renderer-send
      this.updateUnsavedEdits();
    }
  }
}
</script>

<style>
  .btn-save.hide {
    visibility: hidden;
  }
</style>
