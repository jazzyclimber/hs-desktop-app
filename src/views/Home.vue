<template>
  <div class="home">
  <multipane class="custom-resizer" layout="vertical">
  <div class="pane sidebar" :style="{ flexGrow:0}">
    <div class="btn-container">
      <UploadFile btn-text="Open Modules Directory" directory-usage="changeCurrentDirectory" />
      <UploadFile btn-text="Set Global Partials" directory-usage="changeGlobalPartialsDirectory" />
    </div>
    <div class="row-wrapper">
      <Select :options="selectOptions" v-if="globalPartialsTree && tree" v-on:select-change="handleSelectChange" orientation="horizontal" label="Mode"/>
      <CreateJSONFile v-if="globalPartialsTree && displayMode == 'global-partials'"/>
    </div>
    <MenuTreeFilter v-if="workingTree[0] != null"  />
    <UnsavedEditsModal v-if="showUnsavedModal" v-on:close-unsaved-edits-modal="handleCloseUnsavedEditsModal" />
    <MenuTree v-if="workingTree[0] != null" :localTree="workingTree" :type="treeType" :level="1" v-on:unsaved-edits="handleUnsavedEdits" />
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
import Select from "@/components/inputs/Select"
import NewDisplay from "@/components/displayFile/NewDisplay"
import _ from "lodash"
import FieldEditor from "@/components/editFields/FieldEditor"
import CreateJSONFile from "@/components/addJSONFile"
export default {
  name: 'Home',
  data() {
    return {
      showUnsavedModal: false,
      workingTree: [],
      treeType: 'modules',
      selectOptions: [
        {
          label: "Modules",
          value: "modules"
        },
        {
          label: "Global Partials",
          value: "global-partials"
        },

      ]
    }
  },
  components: {
    UploadFile,
    MenuTree,
    MenuTreeFilter,
    NewDisplay,
    Select,
    FieldEditor,
    Multipane,
    MultipaneResizer,
    CreateJSONFile,
    UnsavedEditsModal
  },
  methods: {
    handleUnsavedEdits(data) {
      this.showUnsavedModal = true;
    },
    handleCloseUnsavedEditsModal() {
      this.showUnsavedModal = false;
    },
    handleSelectChange(data) {
      const target = data.target.value;
      this.treeType = target;
      this.$store.commit('updateDisplayMode', target)
      if (target == 'modules') {
        console.log([this.moduleTree[0]])
        this.workingTree = [this.moduleTree[0]];
      } else if (target == 'global-partials') {
        console.log('hit')
        this.workingTree = _.cloneDeep([this.GPTree[0]]);
      }
    }
  },
  watch: {
    unsavedEdits: function(unsaved) {
      unsaved ? null : this.showUnsavedModal = false;
    },
    moduleTree: {
      deep: true,
      handler: function(newData, oldData) {
        console.log('fired', newData);
        this.workingTree.push(newData[0]);
      }
    },
    GPTree: {
      deep: true,
      handler: function(newData, oldData) {
        console.log('fired', newData);
        this.displayMode == "global-partials" ? this.workingTree = newData : null;
      }
    }
  },
   computed: {
     ...mapGetters(["tree", "unsavedEdits", "globalPartialsTree", "displayMode"]),
     moduleTree(){
       return [this.tree]
     },
     GPTree() {
      return [this.globalPartialsTree]
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
  .row-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
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
