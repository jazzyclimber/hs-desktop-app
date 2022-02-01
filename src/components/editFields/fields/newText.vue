<template>
  <div class="field-editor-container">
    <label v-for="(item, i) in workingField" :key="item.field.key" >
      <span>{{item.field.key}}</span>
      <Toggle
        v-if="item.type == 'boolean'"
        v-model="workingField[i].field.value"
        @input="emitter"
      />
      <input
        v-if="item.type == 'text'"
        type="text"
        v-model="workingField[i].field.value"
        @input="emitter"
      />
    </label>
  </div>
</template>

<script>
import Toggle from "./inputs/toggle"
export default {
  name: "TextField",
  props: {
    field: Array
  },
  computed: {
    workingField: function() {
      return this.field
    }
  },
  methods: {
    setFieldType: function (key) {
      if (this.booleans.includes(key)) {
        return "boolean"
      } else {
        return "text"
      }
    },
    emitter(){
      //Need this as oppose to a watcher because otherwise
      // watcher will fire on every field update
      // even if its not from an input value change.
      this.$emit('field-change', this.field)
    }
  },
  components: {
    Toggle
  }
}
</script>
