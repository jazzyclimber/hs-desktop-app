<template>
  <div>
    <button @click="removeField"><img src="@/assets/trash.svg" alt="delete" width="12px"></button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import _ from "lodash"
export default {
  name: "RemoveField",
  props: {
    field: Object
  },
  methods: {
    removeField() {
      console.log('RemoveField', this.field);
      this.$store.dispatch('removeField', this.field),
      this.updateUnsavedEdits();
      if (this.field.type == 'globalPartial') {
         this.partialExists() ? null : this.createModifySrcMap();
      }
    },
    partialExists() {
      let target = this.field;
      let targetFound = false;
      function findPartial(array, target) {
        array.forEach((item) => {
          if (item.type == "group") {
            findPartial(item.children, target)
          } else if (item.type == "globalPartial") {
            if (target.fileName == item.fileName ) {
              targetFound = true;
            };
          }
        })
      }

      findPartial(this.openFile, target);

      console.log(targetFound)

      return targetFound;
    },
    createModifySrcMap() {
      const config = {
        path: this.field.filePath,
        name: this.field.fileName,
        cwd: this.cwd,
        openFileName: this.openFileName,
        usage: 'createModifySrcMap',
        action: 'remove'
      }

      console.log(config);

      window.ipc.send('helperTask', config);
    },
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: true});
    }
  },
  computed: {
    ...mapGetters(['unsavedEdits', 'openFileName', 'cwd', "openFile"])
  }
}
</script>
<style scoped>
  button {
    vertical-align: middle;
    display: block;
  }
</style>
