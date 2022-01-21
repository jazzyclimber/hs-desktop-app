<template>
  <div class="field-editor-container">
    <label v-for="(item, i) in currentField" :key="item.field.key" >
      <span>{{item.field.key}}</span>
      <Toggle
        v-if="item.type == 'boolean'"
        :keyName="item.field.key"
        :index="i"
        v-model="item.field.value"
        v-on:toggle-change="toggleEmitter"
      />
      <input
        v-if="item.type == 'text'"
        type="text"
        v-model="item.field.value"
        @input="emitter"
      />
    </label>
  </div>
</template>

<script>
import Toggle from "./inputs/toggle"
export default {
  name: "TextField",
  data () {
    return {
      booleans: ["required", "locked", "allow_new_line", "show_emoji_picker"],
      currentField: null
    }
  },
  props: {
    value: Object
  },
  watch: {
    modelField: {
      immediate: true,
      handler () {
      console.log('modelField Watch')
       var temp = this.modelField
        var newTemp = []
        for (const [key, value] of Object.entries(temp)) {
          newTemp.push({ type: this.setFieldType(key), key: key, field: { key: key, value: value } })
        }
        this.currentField = newTemp;
    }
    }
  },
  computed: {
    modelField: {
       get () {
        return this.value;
      }
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
    toggleEmitter (value) {
      console.log("toggle", value)
      this.currentField[value.index].field = value.field
      this.emitter();
    },
    emitter (value) {
      var old = this.currentField
      console.log(value)
      var newObj = {}
      old.map(item => {
        newObj[item.field.key] = item.field.value
      })
      this.$emit('emit-current-field', newObj);
    }
  },
  components: {
    Toggle
  }
}
</script>
