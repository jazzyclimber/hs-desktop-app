<template>
  <div class="btn-save-container">
  <button class="btn-save" @click="saveFile()">Save File</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "SaveFile",
  computed: {
    ...mapGetters(['openFile', 'currentFilePath' ])
  },
  methods: {
    saveFile() {
      window.ipc.send('saveFile', {
        file: this.openFile,
        path: this.currentFilePath
        } );
    }
  }
}
</script>
