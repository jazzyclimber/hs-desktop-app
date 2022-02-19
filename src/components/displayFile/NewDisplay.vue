<template>
  <div
    class="field-display-wrapper"
    v-if="openFile"
  >
  <SaveFile />
  <AddField />
  <div class="field-display-container">
    <ThirdVisualizer :level="1" :list="workingFile"  v-if="workingFile" :key="componentKey" />
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AddField from "../editFields/addRemove/AddField.vue"
import SaveFile from "../editFields/save/Save.vue"
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
   components: {
    ThirdVisualizer,
    AddField,
    SaveFile
  }
}
</script>

<style>
  .field-display-wrapper {
    flex: 1 1 auto;
    padding: 50px 0;
  }
  .field-display-container {
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    width: 100%;
    overflow: auto;
  }
</style>
