
<template>
  <div class="field-display-container">
    <NewVisualizer :level="1" v-model="file" :v-on:input="emittedFileUpdate" v-if="file != null"/>
  </div>
</template>

<script>
// import FieldVisualizer from "./FieldVisualizer"
import NewVisualizer from "./NewVisualizer"
export default {
  name: "DisplayFile",
  data () {
    return {
      file: null
    }
  },
  mounted () {
    this.updateFile()
  },
  computed: {
    openFile: {
      get () {
        console.log('getOpen File from display')
        console.log(this.$store.getters.openFile);
        return this.$store.getters.openFile
    },
      set (value) {
        this.$store.commit('updateOpenFile', { openFile: value })
      }
    }
  },
  methods: {
    updateFile () {
      this.file = this.openFile
    },
    emittedFileUpdate (value) {
      console.log("emitted value", value)
      this.file = value
    }
  },
  watch: {
    openFile: function () {
      this.updateFile()
    }
  },
  components: {
   NewVisualizer
  // FieldVisualizer
  }
}
</script>

<style>
  .field-display-container {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    overflow: auto;
  }
</style>
