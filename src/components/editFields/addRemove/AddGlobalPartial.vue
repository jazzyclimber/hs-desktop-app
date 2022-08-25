<template>
  <div class="field-options-bar">
    <button @click="modalActive = true"><img src="@/assets/hsglobe.svg" alt="Add Global Partial" width="15"></button>
    <div v-if="modalActive" class="modal field-modal" @click="modalActive = false"></div>
      <div class="modal-inner" v-if="modalActive">
        <!--<label for="field-search" class="field-search-text">Search</label>
        <input type="text" name="field-search" v-model="searchTerm"> -->
        <div class="field-choice-container" >
          <article class="field-type" @click="emitter(item)" v-for="item in fileTree">
            <h3 class="field-name">{{item.name | formatText}}</h3>
          </article>
        </div>
        <button @click="modalActive = false">Cancel</button>
      </div>

  </div>
</template>
<script>
import _ from "lodash"
import {partials} from "@/components/editFields/helpers/fieldTypes"
import {mapGetters} from 'vuex'
export default {
  name: "addGlobalPartial",
  data(){
    return {
      modalActive: false,
      fieldTypes: null,
      searchTerm: null,
      fileTree: null
    }
  },
  watch: {
    globalPartialsTree: {
      deep: true,
      immediate: true,
      handler: function(newData, oldData) {
        let flattenedTree = [];

        // flatten the tree
        function flatten(array) {
          array.forEach(item => {
            item.children ? flatten(item.children) :  item.path.includes('.json')? flattenedTree.push(item): null;
          } );
        }

        flatten(newData.children);
        this.fileTree = flattenedTree;
      }
    }
  },
  filters: {
      formatText(text) {
        text = text.replace('.json', "")
        return text;
      }
    },
  methods: {
    resetSearch() {
      this.searchTerm = null
    },
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: true});
    },
    emitter(fileMeta) {
      const partial = _.cloneDeep(partials.globalPartial);

      partial.filePath = fileMeta.path;
      partial.fileName = fileMeta.name;
      partial.label = fileMeta.name;

      this.$store.commit('addFieldToOpenFile', partial);
      this.updateUnsavedEdits();
      this.modalActive = false


      const config = {
        path: fileMeta.path,
        name: fileMeta.name,
        cwd: this.cwd,
        openFileName: this.openFileName,
        usage: 'createModifySrcMap',
        action: 'add'
      }
      window.ipc.send('helperTask', config);
    }

  },
  computed: {
    ...mapGetters(['globalPartialsTree','unsavedEdits', 'cwd', 'openFileName']),
   }
}
</script>
<style scoped>
  .modal {
    display: flex;
    background-color: rgba(0,0,0,.7);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    z-index: 100;
  }
  .field-name {
    text-transform: capitalize;
  }
  .field-search-text {
    margin-right: 15px;
  }
  .field-options-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .modal-inner {
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    max-width: 900px;
    max-height: 400px;
    height: 400px;
    overflow: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    z-index: 9999999;
  }
  .field-choice-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin: 15px 0;
  }
  .field-type {
    flex: 0 0 calc(25% - 15px);
    cursor: pointer;
    transition: background-color .2s ease;
  }
  .field-type:hover {
    background-color: rgb(245,245,245)
  }
</style>
