<template>
  <div class="field-editor-container">
    <div class="header" v-for="(item) in workingCustom" :key="item.field.key + '-heading'">
      <div v-if="item.field.key == 'label'">
        <h2 class="font-bold text-xl">{{item.field.value}}</h2>
      </div>
    </div>
    <h3 class="font-extrabold">Custom Fields</h3>
    <label v-for="(item) in workingCustom" :key="item.field.key" >
      <div class="field-wrap" v-if="item.field.key !== 'type' && item.type !== 'ignore' ">
        <span class="label mb-1">{{item.field.key.replace(/_/g, " ").toUpperCase()}}</span>
        <Toggle
          v-if="item.type == 'boolean'"
          v-model="item.field.value"
          @input="emitter"
        />
        <v-jsoneditor v-model="item.field.value" v-else-if="item.type == 'object'" @input="emitter" :plus="false" height="200px" :options="jsonOptions" />
        <textarea
          v-else-if="currentField.type == 'richtext' && item.key =='default'"
          name=""
          id=""
          cols="40"
          rows="10"
          @input="emitter"
          v-model="item.field.value"
          ></textarea>

        <input
          v-else
          type="text"
          v-model="item.field.value"
          @input="emitter"
        />
      </div>
    </label>
    <GlobalFields
      v-model="workingGlobal"
      @input="emitter"
    />
    <RepeaterFields
      v-model="workingRepeater"
      @repeater-change="repeaterSet"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Toggle from "./inputs/toggle"
import GlobalFields from './globalFields.vue'
import RepeaterFields from './repeaterFields.vue'
import VJsoneditor from 'v-jsoneditor'
import {jsonOptions} from "@/helpers/jsonEditConfig.js"
export default {
  name: "TextField",
  data() {
    return {
      workingCustom: null,
      workingGlobal: null,
      workingRepeater: null,
      jsonOptions: jsonOptions,
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
        this.workingRepeater = newData.repeatFields
      }
    }
  },
  computed: {
    ...mapGetters(['currentField'])
  },
  methods: {
    setFieldType: function (key) {
      if (this.booleans.includes(key)) {
        return "boolean"
      } else {
        return "text"
      }
    },
    onError() {
      console.log('error')
    },
    repeaterSet(newData) {
      this.workingRepeater = newData;
      this.emitter();
    },
    emitter(){
      //Need this as oppose to a watcher because otherwise
      // watcher will fire on every field update
      // even if its not from an input value change.
      let newField = {
        customFields: this.workingCustom,
        globalFields: this.workingGlobal,
        repeatFields: this.workingRepeater
      }
      this.$emit('field-change', newField)
      console.log('emitter fired', newField);
    }
  },
  components: {
    Toggle,
    GlobalFields,
    RepeaterFields,
    VJsoneditor
  }
}
</script>

<style lang="postcss">
  .field-editor label:not(.toggle__button) {
    margin-bottom: 20px;
    display: block;
  }
  .field-wrap .label {
    display: block;
    font-size: 13px;
    font-weight: 700;
  }
  .field-editor-container .header h2 {
    margin-top: 0;
    text-decoration: underline;
  }
  .field-editor-container h3 {
    margin-bottom: 5px;
    margin-top: 30px;
  }
  .field-editor input[type="text"] {
    padding: 5px;
    width: 100%;
  }
  .field-editor :is(input, textarea) {
    color: #333333!important;
  }
  .field-editor .field-wrap {
    margin-bottom: 10px;
    display: block
  }
</style>
