<template>
  <div class="global-fields-container">
    <div class="header">
        <h3>Global Fields</h3>
    </div>
    <label v-for="(item) in workingGlobal" :key="item.field.key" >
      <div class="field-wrap" v-if="item.field.key !== 'type' ">
        <span class="label">{{item.field.key.replace(/_/g, " ").toUpperCase()}}</span>
        <Toggle
          v-if="item.type == 'boolean'"
          v-model="item.field.value"
          @input="emitter"
        />
        <input
          v-else
          type="text"
          v-model="item.field.value"
          @input="emitter"
        />
      </div>
    </label>
  </div>
</template>

<script>
import Toggle from "./inputs/toggle"
export default {
  name: "GlobalFields",
  data() {
    return {
      workingGlobal: null
    }
  },
  props: {
    value: Array
  },
  methods: {
    emitter() {
      //Need this as oppose to a watcher because otherwise
      // watcher will fire on every field update
      // even if its not from an input value change.
      this.$emit('input', this.workingCustom)
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler:function(newData){
        this.workingGlobal = newData
      }
    }
  },
  computed: {
    // workingGlobal: function() {
    //   return this.value;
    // }
  },
  components: {
    Toggle
  }
}
</script>
