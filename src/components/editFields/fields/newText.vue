<template>
  <div class="field-editor-container">
    <div class="header" v-for="(item) in workingCustom" :key="item.field.key + '-heading'">
      <div v-if="item.field.key == 'label'">
        <h2>{{item.field.value}}</h2>
      </div>
    </div>
    <h3>Custom Fields</h3>
    <label v-for="(item) in workingCustom" :key="item.field.key" >
      <div class="field-wrap" v-if="item.field.key !== 'type' ">
        <span class="label">{{item.field.key}}</span>
        <Toggle
          v-if="item.type == 'boolean'"
          v-model="item.field.value"
          @input="emitter"
        />
        <input
          v-if="item.type == 'text'"
          type="text"
          v-model="item.field.value"
          @input="emitter"
        />
      </div>
    </label>
    <GlobalFields v-model="workingGlobal" @input="emitter" />
  </div>
</template>

<script>
import Toggle from "./inputs/toggle"
import GlobalFields from './globalFields.vue'
export default {
  name: "TextField",
  data() {
    return {
      workingCustom: null,
      workingGlobal: null,
    }
  },
  props: {
    field: Object
  },
  watch: {
    field: {
      deep: true,
      immediate: true,
      handler: function (newData) {
        this.workingCustom = newData.customFields
        this.workingGlobal = newData.globalFields
      }
    }
  },
  // computed: {
  //   workingCustom: function() {
  //     return this.field.customFields
  //   },
  //   workingGlobal: function() {
  //     return this.field.globalFields
  //   }
  // },
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
    Toggle,
    GlobalFields
  }
}
</script>

<style >
  .field-wrap .label {
    display: block;
  }
  .field-editor-container .header h2 {
    margin-top: 0;
    text-decoration: underline;
  }
  .field-editor-container h3 {
    margin-bottom: 5px;
    margin-top: 30px;
  }
</style>
