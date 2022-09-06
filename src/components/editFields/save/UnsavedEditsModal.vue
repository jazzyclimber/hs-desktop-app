<template>
  <div class="unsaved-edits-modal">
  <div class="modal" @click="emitCloseModal"></div>
  <div class="inner">
    <h2 class="font-bold">Warning</h2>
    <p>You have unsaved edits to <strong>{{openFileName}}</strong>.</p>
    <ul class="text-lg">
      <li>Save File</li>
      <li>Discard Changes</li>
      <li>Click out of modal to go back and edit</li>
    </ul>
      <div class="btn-container mt-5">
        <SaveFile />
        <DiscardEdits />
      </div>
  </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import SaveFile from './Save';
import DiscardEdits from "@/components/editFields/save/DiscardEdits"
export default {
  name: "UnsavedEditsModal",
  components: {
    SaveFile,
    DiscardEdits
  },
  computed: {
    ...mapGetters(['openFile', 'currentFilePath', "unsavedEdits", "openFileName" ])
  },
  methods: {
    emitCloseModal() {
      this.$emit('close-unsaved-edits-modal');
    }
  }
}
</script>

<style>
  .unsaved-edits-modal {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .unsaved-edits-modal .btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .unsaved-edits-modal ul {
    list-style-type: disc;
    list-style-position: inside;
    font-size: 20px;
    padding-left: 20px;
  }
  .unsaved-edits-modal li:hover {
    color: black;
  }
  .unsaved-edits-modal h2 {
    color: red;
    font-size: 31px;
    margin-bottom: 15px;
    margin-top: 0;
  }
  .unsaved-edits-modal .modal {
    width: 100%;
    height: 100%;
    background-color: rgba(250,250,250,.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }
  .unsaved-edits-modal .inner {
    max-width: 800px;
    font-size: 21px;
    background-color: rgba(250,250,250,1);
    box-shadow: 3px 6px 10px rgba(0,0,0,.2);
    padding: 30px;
    border-radius: 20px;
    position: relative;
    z-index: 20;
  }
</style>
