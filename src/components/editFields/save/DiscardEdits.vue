<template>
  <div class="btn-discard-container">
  <button class="btn-discard" :class="{'hide': !unsavedEdits}" @click="discardEdits()">Discard Edits</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "DiscardEdits",
  computed: {
    ...mapGetters(['currentFilePath', "unsavedEdits" ])
  },
  methods: {
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: false});
    },
    discardEdits() {
      window.ipc.send('readFile', this.currentFilePath);

      this.$store.commit("updateCurrentField", null);
      this.updateUnsavedEdits();
    }
  }
}
</script>

<style>
  .btn-save.hide {
    visibility: hidden;
  }
</style>
