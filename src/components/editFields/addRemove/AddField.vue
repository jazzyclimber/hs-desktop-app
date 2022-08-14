<template>
  <div class="field-options-bar">
    <button @click="modalActive = true">Add Field</button>
    <div v-if="modalActive" class="modal field-modal" @click="modalActive = false"></div>
      <div class="modal-inner" v-if="modalActive">
        <label for="field-search" class="field-search-text">Search</label>
        <input type="text" name="field-search" v-model="searchTerm">
        <div class="field-choice-container" >
          <article class="field-type" @click="emitter(item)" v-for="item in filteredFields">
            <h3 class="field-name">{{item | formatText}}</h3>
          </article>
        </div>
        <button @click="modalActive = false">Cancel</button>
      </div>

  </div>
</template>
<script>
import {fieldTypes} from "../helpers/fieldTypes"
import _ from "lodash"

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
    emitter(field) {
      const newField = _.cloneDeep(fieldTypes[field]);

      this.$store.commit('addFieldToOpenFile', newField);
      this.updateCurrentField(newField);
      this.modalActive = false
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
