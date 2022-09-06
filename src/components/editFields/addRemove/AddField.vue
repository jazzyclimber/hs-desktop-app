<template>
  <div class="field-options-bar">
    <button class="btn-primary" @click="modalActive = true">Add Field</button>
    <div v-if="modalActive" class="modal field-modal" @click="modalActive = false"></div>
      <div class="modal-inner" v-if="modalActive">
        <label for="field-search" class="field-search-text">Search</label>
        <input class="border-2 border-indigo-500 rounded" type="text" name="field-search" v-model="searchTerm">
        <div class="field-choice-container" >
          <article class="field-type border-2 bg-white border-indigo-200 rounded py-3 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-200" @click="emitter(item)" v-for="item in filteredFields">
            <h3 class="field-name">{{item | formatText}}</h3>
          </article>
        </div>
        <button class="btn-primary" @click="modalActive = false">Cancel</button>
      </div>

  </div>
</template>
<script>
import {fieldTypes} from "../helpers/fieldTypes"
import _ from "lodash"
import {mapGetters} from 'vuex'
export default {
  name: "AddField",
  data(){
    return {
      modalActive: false,
      fieldTypes: null,
      searchTerm: null,
    }
  },
  methods: {
    resetSearch() {
      this.searchTerm = null
    },
    updateCurrentField(currentField) {
      this.$store.commit('updateCurrentField', currentField);
    },
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: true});
    },
    emitter(field) {
      const newField = _.cloneDeep(fieldTypes[field]);

      this.$store.commit('addFieldToOpenFile', newField);
      this.updateCurrentField(newField);
      this.modalActive = false;
      this.updateUnsavedEdits();
      this.resetSearch()
    }
  },
  filters: {
    formatText(text) {
      text = text.split("_");
      text.map(item =>{
        item.capitalize;
      });
      text = text.join(" ");
      return text;
    }
  },
  computed: {
    ...mapGetters(['unsavedEdits']),
    filteredFields() {
      let fields;
      if (this.searchTerm !== null && this.searchTerm !== "") {
        // If using search
        fields = Object.keys(this.fieldTypes).filter(item => {
          return item.includes(this.searchTerm);
        })
      } else {
        // If not using search
        fields = Object.keys(this.fieldTypes)
      }

      return fields
    }
  },
  created() {
    this.fieldTypes = _.cloneDeep(fieldTypes);
  }
}
</script>
<style lang="postcss" scoped>
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
  .field-choice-container:hover .field-name {
    @apply transition-all hover:text-white;
  }
  .field-name {
    text-transform: capitalize;
    color: inherit;
  }
  .field-search-text {
    @apply inline-block uppercase font-bold;
    margin-right: 15px;
    font-size: 11px;
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
    @apply flex flex-row items-center justify-center flex-wrap gap-5 my-5;
  }
  .field-type {
    flex: 0 0 calc(25% - 15px);
    cursor: pointer;
    transition: background-color .2s ease;
  }
</style>
