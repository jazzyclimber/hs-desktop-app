<template>
  <div>
    <button @click="modalActive = true">Add Field</button>
    <div v-if="modalActive" class="modal field-modal" @click="modalActive = false"></div>
      <div class="modal-inner" v-if="modalActive">
        <label for="field-search">Search</label>
        <input type="text" name="field-search" v-model="searchTerm">
        <div class="field-choice-container" >
          <article class="field-type" @click="emitter(item)" v-for="item in filteredFields">
            <h3 class="field-name">{{item}}</h3>
          </article>
        </div>
        <button @click="modalActive = false">Cancel</button>
      </div>

  </div>
</template>
<script>
import {fieldTypes} from "../helpers/fieldTypes"
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
    emitter(field) {
      this.$store.commit('addFieldToOpenFile', this.fieldTypes[field]);
      this.modalActive = false
      this.resetSearch()
    }
  },
  computed: {
    filteredFields() {
      var fields;
      if (this.searchTerm !== null && this.searchTerm !== "") {
        fields = Object.keys(this.fieldTypes).filter(item => {
          return item.includes(this.searchTerm);
        })
      } else {
        console.log(this.fieldTypes)
        fields = Object.keys(this.fieldTypes)
      }
      return fields
    }
  },
  created() {
    this.fieldTypes = fieldTypes
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
  .modal-inner {
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    max-width: 900px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 150;
  }
  .field-choice-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
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