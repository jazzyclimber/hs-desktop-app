<template>
  <div class="btn-save-container">
  <button class="btn-save bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 text-xs font-bold font-sans" :class="{'hide': !unsavedEdits}" @click="saveFile()">Save File</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import path from 'path'
export default {
  name: "SaveFile",
  computed: {
    ...mapGetters(['openFile', 'currentFilePath', "unsavedEdits", "displayMode", "globalPartialsDir", "cwd", "tree", "openFileUnedited" ])
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

      if (this.displayMode == "global-partials") {
        const relPath = this.currentFilePath.replace(this.globalPartialsDir, "");
        window.ipc.send('helperTask', {
          editedFile: this.openFile,
          originalFile: this.openFileUnedited,
          relPath: relPath,
          cwd: this.cwd,
          tree: this.tree,
          usage: "updateGlobalDependants"
        })
      }
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
