<template>
  <div
    class="field-display-wrapper"
    v-if="openFile"
  >
  <h2 class="font-bold text-center text-3xl mb-3">{{openFileName}}</h2>
  <div class="button-container">
    <SaveFile />
    <FilterDisplay />
    <div class="btn-group--right">
      <AddField />
      <AddGlobalPartial />
    </div>
  </div>
  <div class="field-display-container shadow-xl">
    <ThirdVisualizer :level="1" :list="workingFile"  v-if="workingFile" :key="componentKey" />
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AddField from "../editFields/addRemove/AddField.vue"
import AddGlobalPartial from "@/components/editFields/addRemove/AddGlobalPartial.vue"
import SaveFile from "../editFields/save/Save.vue"
import ThirdVisualizer from "./ThirdVisualizer"
import FilterDisplay from "./FilterDisplay"
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
    AddGlobalPartial,
    SaveFile,
    FilterDisplay
  }
}
</script>

<style lang="postcss" >
  .field-display-wrapper {
    @apply flex-auto py-6
  }

  .button-container {
    max-width: 500px;
    min-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
  }

  .button-container .btn-group--right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
  .field-display-container {
    max-width: 500px;
    min-width: 400px;
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
