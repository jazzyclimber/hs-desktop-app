<template>
<div :class="[level == 1 ? 'top-level':'level'+level, type ? type : '']"  class="menu-wrapper">
  <ul v-for="(item, i) in localTree" :key="'l-'+ level + '-' + i" class="list-none" >

    <li
      v-if="item.children && item.name.includes('.module') && type == 'modules'"
      class="module font-light mt-0.5"
      :data-name="item.name">{{item.name}}</li>
    <li
      class="file font-light hover:text-purple-700 transition-colors cursor-pointer"
      v-else-if="item.name == 'fields.json' && type == 'modules'"
      @click="handleClick(item.path)">{{item.name}}</li>
    <li :class="'file module font-light hover:text-purple-700 transition-colors cursor-pointer'" v-else-if="item.name.includes('.json') && type == 'global-partials'" :data-name="item.name" style="margin-left: 0;padding-left: 0;" @click="handleClick(item.path)">{{item.name}}</li>
    <MenuTree v-if="item.children" v-on:unsaved-edits="emitUnsavedEdits" :type="type" :localTree="item.children" :level="nextLevel" />
  </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import osp from "path"
import MenuTree from "./MenuTree"
export default {
  name: "MenuTree",
  props: {
    localTree: Array,
    level: Number,
    type: String
  },
  methods: {
    handleClick(path) {
      this.unsavedEdits ? this.emitUnsavedEdits(path) : this.readFile(path);
    },
    emitUnsavedEdits(path) {
      console.log('emitting');

      this.$emit('unsaved-edits', path);
    },
    readFile (path) {
      console.log("path", osp )
      const config = {
        path: path,
        usage: 'updateOpenFile'
      }
      window.ipc.send('readFile', config);

      let splitPath = path.split(osp.sep);
      this.$store.commit("updateCurrentFilePath", path)
      this.$store.commit("updateCurrentField", null);
      if (this.type == 'global-partials') {
        this.$store.commit("updateOpenFileName",{openFileName: splitPath[splitPath.length - 1]});
      } else if (this.type == 'modules') {
        this.$store.commit("updateOpenFileName",{openFileName: splitPath[splitPath.length - 2].replace('.module', "")});
      }
    },
    formattedTree: function() {
      let formatted = [];
    }
  },
  created() {
    this.formattedTree();
  },
  computed: {
    ...mapGetters(["unsavedEdits"]),
    nextLevel: function () {
      const level = this.level
      return level + 1
    }
  },
  components: {
    MenuTree
  }
}
</script>

<style lang="postcss">
.module +.modules .file {
  @apply ml-2
}



</style>
