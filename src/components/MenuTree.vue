<template>
<div :class="(level == 1) ? 'top-level':'level'+level " class="menu-wrapper">
  <ul v-for="(item, i) in localTree" :key="'l-'+ level + '-' + i">
    <li v-if="item.children && item.name.includes('.module')" class="module" :data-name="item.name">{{item.name}}</li>
    <li :class="'file'" v-else-if="item.name == 'fields.json'" @click="handleClick(item.path)">{{item.name}}</li>
    <MenuTree v-if="item.children" v-on:unsaved-edits="emitUnsavedEdits" :localTree="item.children" :level="nextLevel" />
  </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MenuTree from "./MenuTree"
export default {
  name: "MenuTree",
  props: {
    localTree: Array,
    level: Number
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
      window.ipc.send('readFile', path);

      let splitPath = path.split("/");
      this.$store.commit("updateCurrentFilePath", path)
      this.$store.commit("updateCurrentField", null);
      this.$store.commit("updateOpenFileName",{openFileName: splitPath[splitPath.length - 2].replace('.module', "")});
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

<style >
  .menu-wrapper ul {
    list-style-type: none;
    text-align: left;
    padding-left: 5px;
  }
  .menu-wrapper ul ul {
    padding-left: 10px;
  }
  .menu-wrapper li {
    cursor: pointer;
  }
  .menu-wrapper li:hover {
    color: blue;
  }
  .menu-wrapper {
    min-width: 300px;
  }

</style>
