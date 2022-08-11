<template>
  <div
    class="field-display-wrapper"
    v-if="openFile"
  >
  <h2 class="open-file-heading">{{openFileName}}</h2>
  <div class="button-container">
    <SaveFile />
    <AddField />
  </div>
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
        this.$store.commit('updateOpenFile', { openFile: newData })
      }
    }
  },
  computed: {
    ...mapGetters(['openFile', 'currentField', "openFileName"])
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
    padding: 25px 0;
  }
  .button-container {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .field-display-container {
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    width: 100%;
    overflow: auto;
  }
  .field-display-wrapper .open-file-heading {
    margin: 0 auto 15px;
    width: 100%;
    text-align: center;

  }
</style>
