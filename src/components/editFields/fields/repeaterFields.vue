<!-- ToDo:
  Everything.
  This file is going to take repeater data from the chosen field group
  A boolean toggle will dictate whether or not the occurrence field is added
  If the field data already includes the occurence field the boolean will default to true.
  Else
  The boolean will default to false.

NOTE:: this controlling boolean is for interface only.
NOTE:: Boolean should NOT be included with emitted data
 -->
<template>
  <div class="global-fields-container">
    <div class="header">
        <h3>Global Fields</h3>
    </div>
    <label v-for="(item) in workingRepeater" :key="item.field.key" >
      <div class="field-wrap" v-if="item.field.key !== 'type' ">
        <span class="label">{{item.field.key.replace(/_/g, " ").toUpperCase()}}</span>
        <Toggle
          v-model="item.field.value"
          @input="emitter"
        />
        <v-jsoneditor
          v-model="item.field.value"
          v-if="item.type == 'object'"
          :plus="false"
          height="200px"
          :options="jsonOptions"
        />
      </div>
    </label>
  </div>
</template>

<script>
import Toggle from "./inputs/toggle"
import VJsoneditor from "v-jsoneditor"
import {jsonOptions} from "@/helpers/jsonEditConfig.js"
export default {
  name: "RepeaterFields",
  data() {
    return {
      workingRepeater: null,
      jsonOptions: jsonOptions,
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
      this.$emit('input', this.workingRepeater)
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler:function(newData){
        this.workingRepeater = newData
      }
    }
  },
  components: {
    Toggle,
    VJsoneditor
  }
}
</script>
