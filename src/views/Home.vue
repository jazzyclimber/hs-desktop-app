<template>
  <div class="home">
  <multipane class="custom-resizer" layout="vertical">
  <div class="pane sidebar" :style="{ flexGrow:0}">
    <UploadFile  />
    <MenuTreeFilter v-if="workingTree[0] != null"  />
    <UnsavedEditsModal v-if="showUnsavedModal" v-on:close-unsaved-edits-modal="handleCloseUnsavedEditsModal" />
    <MenuTree v-if="workingTree[0] != null" :localTree="workingTree" :level="1" v-on:unsaved-edits="handleUnsavedEdits" />
  </div>
  <multipane-resizer></multipane-resizer>
  <div class="pane field-display-wrapper" :style="{ flexGrow: 0 }">
    <NewDisplay  />
  </div>
  <multipane-resizer></multipane-resizer>
  <div class="pane field-editor-wrapper" :style="{ flexGrow: 1 }">
    <FieldEditor  />
  </div>
</multipane>
</Multipane>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import { Multipane, MultipaneResizer } from 'vue-multipane';
import UploadFile from '@/components/UploadFile.vue'
import MenuTree from "@/components/MenuTree"
import MenuTreeFilter from "@/components/MenuTreeFilter"
import UnsavedEditsModal from "@/components/editFields/save/UnsavedEditsModal"

import NewDisplay from "@/components/displayFile/NewDisplay"
import FieldEditor from "@/components/editFields/FieldEditor"
export default {
  name: 'Home',
  data() {
    return {
      showUnsavedModal: false
    }
  },
  components: {
    UploadFile,
    MenuTree,
    MenuTreeFilter,
    NewDisplay,
    FieldEditor,
    Multipane,
    MultipaneResizer,
    UnsavedEditsModal
  },
  methods: {
    handleUnsavedEdits(data) {
      this.showUnsavedModal = true;
    },
    handleCloseUnsavedEditsModal() {
      this.showUnsavedModal = false;
    }
  },
  watch: {
    unsavedEdits: function(unsaved) {
      unsaved ? null : this.showUnsavedModal = false;
    }
  },
   computed: {
     ...mapGetters(["tree", "unsavedEdits"]),
     workingTree(){
       return [this.tree]
     }
  }
}
</script>

<style >
  *,*:before,*:after {
    box-sizing: border-box;
  }

  .sidebar {
    background-color: #f2f2f2;
    padding-right: 10px;
  }
  .field-editor-wrapper {
    background-color: #f2f2f2;
  }
  main {
    max-height: 100vh;
    overflow: auto;
    flex: 1 1 auto;
  }
  .home {
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
  }
  .field-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  }
  .field-container > .field-editor {
    flex: 0 1 300px;
    max-width: 500px;
    background-color: #f7f7f7;
    max-height: 100vh;
    padding: 50px 30px 100px;
    overflow: auto;
    min-height: 100%;
  }
  .custom-resizer > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;
  }
.custom-resizer > .multipane-resizer:before {
  display: block;
  content: "";
  width: 3px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -1.5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.custom-resizer > .multipane-resizer:hover:before {
  border-color: #999;
}
.custom-resizer {
  width: 100%;
  height: 100%;
}
.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: auto;
  border: 1px solid #ccc;
  height: 100vh;
}
.multipane > div {
    z-index: initial;
}
.pane::-webkit-scrollbar {
  background: transparent;        /* color of the tracking area */
  width: 5px;
  height: 5px;
}
.pane::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,.3);    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
}
</style>
