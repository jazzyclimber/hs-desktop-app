<template>
  <div>
    <button
      class="btn-primary h-full py-2 px-2"
      @click="cloneField">
      <img src="@/assets/clone.svg" alt="Clone Icon" width="14">
    </button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import _ from "lodash"
export default {
  name: "CloneField",
  props: {
    field: Object
  },
  methods: {
    updateCurrentField(currentField) {
      this.$store.commit('updateCurrentField', currentField);
    },
    updateUnsavedEdits() {
      this.$store.commit('updateUnsavedEdits', {unsavedEdits: true});
    },
    cloneField() {
      const newField = _.cloneDeep(this.field);

      this.$store.commit('addFieldToOpenFile', newField);
      this.updateCurrentField(newField);
      this.updateUnsavedEdits();
    }
  },
  computed: {
    ...mapGetters(['unsavedEdits'])
  }
}
</script>
