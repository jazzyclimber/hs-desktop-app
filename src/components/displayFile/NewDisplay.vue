<template>
  <div
    class="field-display-wrapper"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
    v-if="openFile"
  >
  <AddField />
    <div class="field-display-container">
      <ThirdVisualizer :level="1" :list="workingFile"  v-if="workingFile" :key="componentKey" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AddField from "../editFields/addRemove/AddField.vue"
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
    openFile: {
      deep: true,
      handler: function(newData, oldData) {
        this.workingFile = newData;
      }
    },
    workingFile:{
      deep:true,
      handler: function(newData, oldData) {
        console.log('workingFile UPdate')
        this.$store.commit('updateOpenFile', { openFile: newData })
      }
    }
  },
  computed: {
    ...mapGetters(['openFile', 'currentField'])
  },
  mounted () {
    this.navHeight = this.calcHeight();
    this.workingFile = this.$store.getters.openFile
  },
   components: {
    ThirdVisualizer,
    AddField
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
