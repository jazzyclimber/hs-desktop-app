<template>
<div :class="'menu-wrapper'">
  <ul v-for="(item, i) in localTree" :key="'l-'+ level + '-' + i">
    <li v-if="item.children && item.name.includes('.module')">{{item.name}}</li>
    <li :class="'file'" v-else-if="item.name == 'fields.json'" @click="readFile(item.path)">{{item.name}}</li>
    <MenuTree v-if="item.children" :localTree="item.children" :level="nextLevel" />
  </ul>
  </div>
</template>

<script>
import MenuTree from "./MenuTree"
export default {
  name: "MenuTree",
  props: {
    localTree: Array,
    level: Number
  },
  methods: {
    readFile (path) {
      window.ipc.send('readFile', path);
      this.$store.commit("updateCurrentFilePath", path)
      this.$store.commit("updateCurrentField", null);
    }
  },
  computed: {
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
  ul {
    list-style-type: none;
    text-align: left;
    padding-left: 5px;
  }
  ul ul {
    padding-left: 10px;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    color: blue;
  }
  .menu-wrapper {
    min-width: 300px;
  }

</style>
