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
        <h3>Repeater Options</h3>
    </div>
    <label for="enable-repeater">
      <div class="field-wrap">
        <span class="label">Enable Repeater</span>
        <Toggle
          v-model="isEnabled"
          @input="emitter"
        />
      </div>
    </label>
    <label v-for="(item) in workingRepeater" :key="item.field.key" >
      <div class="field-wrap" v-if="item.field.key !== 'type' ">
        <span class="label" v-if="isEnabled">{{item.key.toUpperCase()}}</span>
        <v-jsoneditor
          v-model="item.field.value"
          v-if="isEnabled"
          :plus="false"
          height="200px"
          :options="jsonOptions"
          @input="emitter"
        />
      </div>
    </label>
  </div>
</template>

<script>
import Toggle from "./inputs/toggle"
import _ from "lodash"
import VJsoneditor from "v-jsoneditor"
import {jsonOptions} from "@/helpers/jsonEditConfig.js"
import { globalRepeaterFields } from "../helpers/globalFields"
export default {
  name: "RepeaterFields",
  data() {
    return {
      isEnabled: false,
      workingRepeater: null,
      jsonOptions: jsonOptions,
    }
  },
  props: {
    value: Array
  },
  methods: {
     confirmRepeaterFields: function(arrayRepeater) {
      let tempGlobal =  JSON.parse(JSON.stringify({...globalRepeaterFields}));


       arrayRepeater.forEach(item => {
        delete tempGlobal[item.key]
      })

      // Add remaining global fields
      for (const [key, value] of Object.entries(tempGlobal)) {
        arrayRepeater.push(value);
      }
      return arrayRepeater
    },
    clearWorkingRepeater: function() {
        let tempReset = _.cloneDeep(globalRepeaterFields.occurrence);
        tempReset.field.value = null;
        this.workingRepeater = tempReset;
    },
    setIsEnabled(e) {
      this.isEnabled = e;
    },
    emitter(e) {
      //Need this as oppose to a watcher because otherwise
      // watcher will fire on every field update
      // even if its not from an input value change.
      this.isEnabled = e;
      console.log('isEnabled',e)
      this.isEnabled  ? this.workingRepeater = this.confirmRepeaterFields(this.workingRepeater) : this.clearWorkingRepeater();
      console.log('made it passed');
      this.$emit('repeater-change', this.workingRepeater)
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler:function(newData) {
        newData.length  ? this.isEnabled = true : this.isEnabled  = false;
        this.workingRepeater = newData
      }
    },
  },
  components: {
    Toggle,
    VJsoneditor
  }
}
</script>
