<template>
  <div class="field-editor-container">
    <label v-for="(item, i) in currentField" :key="item.field.key" >
      <span>{{item.field.key}}</span>
      <Toggle
        v-if="item.type == 'boolean'"
        :keyName="item.field.key"
        :index="i"
        v-model="currentField[i].field.value"
        v-on:toggle-change="toggleEmitter"
      />
      <input
        v-if="item.type == 'text'"
        type="text"
        v-model="currentField[i].field.value"
        @input="textEmitter"
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
    }
  },
  props: {
    value: Object
  },
  computed: {
   currentField: {
      get() {
        var temp = this.value
        var newTemp = []
        for (const [key, value] of Object.entries(temp)) {
          newTemp.push({ type: this.setFieldType(key), key: key, field: { key: key, value: value } })
        }
        this.currentField = newTemp
        return newTemp
      },
      set(value) {
        console.log('set')
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
      this.currentField[value.index].field = value.field
      this.emitter();
    },
    textEmitter (value) {
      var old = this.currentField
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
