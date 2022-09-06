<template>
  <div class="home">
  <multipane class="custom-resizer" layout="vertical">
  <div class="pane sidebar bg-gradient-to-b from-white to-indigo-50 p-0" style="flexGrow:0">
    <div class="pt-3 px-3 pb-1 bg-indigo-50">
      <div class="btn-container flex justify-start flex-wrap gap-1">
        <UploadFile btn-text="Set Theme Directory" directory-usage="changeCurrentDirectory" />
        <UploadFile btn-text="Set Global Partials" directory-usage="changeGlobalPartialsDirectory" />
      </div>
      <div class="row-wrapper mr-0 w-full">
        <Select :options="selectOptions" v-if="globalPartialsTree && tree" v-on:select-change="handleSelectChange"
        Orientation="horizontal"
        label="Mode"
        selectClass="width-full"
        labelClass="pr-2"
        />
        <CreateJSONFile v-if="globalPartialsTree && displayMode == 'global-partials'"/>
      </div>
    </div>
    <div class="p-3 pt-1">
      <MenuTreeFilter v-if="workingTree[0] != null"  />
      <UnsavedEditsModal v-if="showUnsavedModal" v-on:close-unsaved-edits-modal="handleCloseUnsavedEditsModal" />
      <MenuTree v-if="workingTree[0] != null" :localTree="workingTree" :type="treeType" :level="1" v-on:unsaved-edits="handleUnsavedEdits" />
    </div>
  </div>
  <multipane-resizer></multipane-resizer>
  <div class="pane field-display-wrapper bg-gradient-to-b from-white to-indigo-50" style="flexGrow: 0">
    <NewDisplay  />
  </div>
  <multipane-resizer></multipane-resizer>
  <div class="pane field-editor-wrapper bg-gradient-to-b from-white to-indigo-50" style="flexGrow: 1">
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

<style lang="postcss">
  *,*:before,*:after {
    box-sizing: border-box;
  }
  .row-wrapper {
    @apply flex flex-row my-2 items-center justify-start gap-2;
    max-width: 316px;
  }
  main {
    @apply min-h-screen overflow-auto flex-auto;
  }
  .home {
    @apply flex flex-row flex-nowrap items-start justify-start h-full;
  }
  .field-container {
    @apply flex flex-row items-stretch justify-start
  }
  .field-container > .field-editor {
    @apply max-h-screen overflow-auto min-h-full;
    flex: 0 1 300px;
    max-width: 500px;
    max-height: 100vh;
    padding: 50px 30px 100px;
  }
  .custom-resizer > .multipane-resizer {
    @apply m-0 left-0 relative;
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
.pane {
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
  @apply bg-indigo-100;
  border-radius: 20px;       /* roundness of the scroll thumb */
}
</style>
