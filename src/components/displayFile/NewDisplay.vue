<template>
  <div class="field-display-container">
    <ThirdVisualizer :level="1" :list="file"  v-if="file != null"/>
  </div>
</template>

<script>
import ThirdVisualizer from "./ThirdVisualizer"
export default {
  name: "NewDisplay",
  data () {
    return {
      file: null
    }
  },
  computed: {
    openFile: function () {
      return this.$store.getters.openFile
    }
  },
  watch: {
    openFile: function () {
      this.file = this.openFile
    }
  },
   components: {
    ThirdVisualizer
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
