<template>
  <form class="field-editor"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
    v-if="currentField"
  >
    <TextField :field="field" v-on:field-change="handleEmit" />

  </form>
</template>

<script>
import { globalFields } from "./helpers/globalFields"
import TextField from "./fields/newText.vue"
import {mapGetters} from "vuex"
export default {
  name: "FieldEditor",
  data () {
    return {
      navHeight: null,
      field: null,
      booleans: ["required", "locked", "allow_new_line", "show_emoji_picker"],
      globalFields: ["help_text", "inline_help_text", "locked", "required", "visibility", "display_width"]
    }
  },
  updated() {
  },
   methods: {
    handleEmit(newData) {

      newData = newData.customFields.concat(newData.globalFields);

      // Still need to set new File here
      let newField = {};
      let openFile = this.openFile;
      let cf = this.currentField;
      console.log('changing', openFile)

      newData.forEach((item) => {
        newField[item.field.key] = item.field.value;
      })

      function findField(arr) {
        arr.forEach((item, i) => {
          if (item === cf) {
            // arr[i] = payload;
            arr.splice(i, 1, newField);
          } else if (item.children) {
            findField(item.children);
          }
        });
      }

      findField(openFile);
      this.$store.commit("updateCurrentField", newField);
      this.$store.commit("updateOpenFile", {openFile: openFile});

    },
    calcHeight: function () {
      var navBar = document.querySelector('.nav-bar');
      return navBar.offsetHeight;
    },
    checkIfGlobalField: function (key){
      return this.globalFields.includes(key)
    },
    setFieldType: function (key) {
      if (this.booleans.includes(key)) {
        return "boolean";
      } else {
        return "text";
      }
    },
    confirmGlobalFields: function (arrayGlobal) {
      let tempGlobal = {...globalFields};
      // Remove all global fields that already exist from import
      arrayGlobal.forEach(item => {
        delete tempGlobal[item.key]
      })
      // Add remaining global fields
      for (const [key, value] of Object.entries(tempGlobal)) {
        arrayGlobal.push(value);
      }
      return arrayGlobal
    }
   },
  computed: {
    ...mapGetters(["openFile", "currentField"])
  },
  watch: {
    currentField: function (newData, oldData) {
      var newTemp = {
        customFields: [],
        globalFields: []
      };

      for (const [key, value] of Object.entries(newData)) {
        var isGlobalField = this.checkIfGlobalField(key)
        var fieldObj = {
          type: this.setFieldType(key),
          key: key,
          field: { key: key, value: value },
        }
        isGlobalField ? newTemp.globalFields.push(fieldObj) : newTemp.customFields.push(fieldObj);
      }

      newTemp.globalFields = this.confirmGlobalFields(newTemp.globalFields)

      this.field = newTemp;
    },
  },
  mounted () {
    this.navHeight = this.calcHeight();
  },
  components: {
    TextField
  }
}
</script>

<style>
  .field-editor  {
    text-align: left;
  }
  .field-editor label > span {
    display: block;
  }
  .field-editor label {
  display: block;
  margin-bottom: 10px;
  }
</style>
