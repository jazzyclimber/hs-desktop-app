<template>
  <button class="create-file btn-primary text-sm py-1.5 px-4" @click="handleClick">+</button>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "CreateJSONFile",
  methods: {
    handleClick(evt) {
      console.log('click')
      const config = {
        usage: "createGlobalParital",
        defaultPath: this.globalPartialsDir,
      }
      window.ipc.send('openSaveDialog', config)
    }
  },
  computed: {
    ...mapGetters(["globalPartialsDir"])
  }
}
</script>
