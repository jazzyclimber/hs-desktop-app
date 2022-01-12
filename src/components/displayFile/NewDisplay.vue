<template>
  <div
    class="field-display-wrapper"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
  >
    <div class="field-display-container">
      <ThirdVisualizer :level="1" :list="file"  v-if="file != null"/>
    </div>
  </div>
</template>

<script>
import ThirdVisualizer from "./ThirdVisualizer"
export default {
  name: "NewDisplay",
  data () {
    return {
      file: null,
      navHeight: null
    }
  },
  methods: {
    calcHeight: function () {
      var navBar = document.querySelector('.nav-bar');
      console.log(navBar.offsetHeight)
      return navBar.offsetHeight;
    }
  },
  computed: {
    openFile: function () {
      return this.$store.getters.openFile
    }
  },
  mounted () {
    this.navHeight = this.calcHeight();
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
