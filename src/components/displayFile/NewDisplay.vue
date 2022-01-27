<template>
  <div
    class="field-display-wrapper"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
    v-if="openFile"
  >
    <div class="field-display-container">
      <ThirdVisualizer :level="1" v-model="workingFile"  v-if="workingFile" :key="componentKey" />
    </div>
  </div>
</template>

<script>
import ThirdVisualizer from "./ThirdVisualizer"
export default {
  name: "NewDisplay",
  props: {
    componentKey: Number
  },
  data () {
    return {
      navHeight: null,
      workingFile: null
    }
  },
  methods: {
    calcHeight: function () {
      var navBar = document.querySelector('.nav-bar');
      return navBar.offsetHeight;
    }
  },
  watch: {
    openFile: function(newData, oldData) {
      this.workingFile = newData;
    },
    workingFile:{
      deep:true,
      handler: function(newData, oldData) {
        this.$store.commit('updateOpenFile', { openFile: newData })
      }
    }
  },
  computed: {
    openFile: function() {
        return this.$store.getters.openFile
    },
    currentField: function () {
      return this.$store.getters.currentField
    }
  },
  mounted () {
    this.navHeight = this.calcHeight();
    this.workingFile = this.$store.getters.openFile
  },
   components: {
    ThirdVisualizer
  }
}
</script>

<style>
  .field-display-wrapper {
    flex: 1 1 auto;
    overflow: auto;
    padding: 50px 0;
  }
  .field-display-container {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    overflow: auto;
  }
</style>
