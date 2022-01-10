
<template>
  <div class="field-display-container">
    <FieldVisualizer :level="1" :tree="openFile" v-if="openFile != null"/>
  </div>
</template>

<script>
import FieldVisualizer from "./FieldVisualizer"
export default {
  name: "DisplayFile",
  computed: {
    openFile: function () {
      return this.$store.getters.openFile
    }
  },
  components: {
    FieldVisualizer
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
