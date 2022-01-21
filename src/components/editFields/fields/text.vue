<template>
  <div class="field-editor-container">
    <label v-for="(item, i) in newCurrentField" :key="item.field.key" >
      <span>{{item.field.key}}</span>
      <Toggle
        v-if="item.type == 'boolean'"
        v-model="newCurrentField[i].field.value"
        v-on:toggle-change="emitter"
      />
      <input
        v-if="item.type == 'text'"
        type="text"
        v-model="newCurrentField[i].field.value"
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
      fieldType: "text",
      booleans: ["required", "locked", "allow_new_line", "show_emoji_picker"]
    }
  },
  props: {
    value: Object
  },
  computed: {
    // currentField () {
    //   return this.$attrs.value
    // },
    newCurrentField: {
      get () {
        var temp = this.value
        var newTemp = []
        for (const [key, value] of Object.entries(temp)) {
          newTemp.push({ type: this.setFieldType(key), field: { key: key, value: value } })
        }
        return newTemp;
      },
      set (value) {
        console.log('setter')
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
    emitter (value) {
      var old = this.newCurrentField
      console.log("emitter", value);
      var newObj = {}
      old.map(item => {
        newObj[item.field.key] = item.field.value
      })
      console.log('newObj', newObj)
      this.$emit('emit-current-field', newObj);
    }
  },
  components: {
    Toggle
  }
}
</script>
