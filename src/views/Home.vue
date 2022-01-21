<template>
  <div class="home">
    <div class="sidebar">
      <MenuTree v-if="this.tree[0] != null" :localTree="tree" :level="1"/>
    </div>
    <main>
      <UploadFile />
      <div class="field-container">
        <NewDisplay />
        <FieldEditor  />
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import UploadFile from '@/components/UploadFile.vue'
import MenuTree from "@/components/MenuTree"
// import DisplayFile from "@/components/displayFile/DisplayFile"
import NewDisplay from "@/components/displayFile/NewDisplay"
import FieldEditor from "@/components/editFields/FieldEditor"
export default {
  name: 'Home',
  components: {
    UploadFile,
    MenuTree,
    NewDisplay,
    FieldEditor
  },
   computed: {
    tree: function () {
      return [this.$store.getters.tree];
    }
  }
}
</script>

<style>
  *,*:before,*:after {
    box-sizing: border-box;
  }
  .sidebar {
    background-color: #f2f2f2;
    padding-right: 10px;
    min-width: 200px;
    min-height: 100%;
    max-height: 100%;
    overflow: auto;
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
    padding: 100px 30px;
    overflow: auto;
    min-height: 100%;
  }
</style>
