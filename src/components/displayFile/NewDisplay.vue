<template>
  <div
    class="field-display-wrapper"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
  >
    <div class="field-display-container">
      <ThirdVisualizer :level="1" v-model="openFile" v-if="openFile"  />
    </div>
  </div>
</template>

<script>
import ThirdVisualizer from "./ThirdVisualizer"
export default {
  name: "NewDisplay",
  data () {
    return {
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
  updated() {
    console.log('newDisplay has been updated' )
  },
  watch: {
    openFile: function() {
      console.log('openFile Changed')

      this.$forceUpdate()
    }
  },
  computed: {
    openFile: {
      get () {
        return this.$store.getters.openFile
      },
      set(value) {
        console.log('setting')
        this.$store.commit('updateOpenFile', { openFile: value })
      }
    },
    currentField: function () {
      return this.$store.getters.currentField
    }
  },
  mounted () {
    this.navHeight = this.calcHeight();
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
