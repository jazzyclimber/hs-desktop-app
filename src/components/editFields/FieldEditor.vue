<template>
  <form class="field-editor"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
    v-if="currentField !== null"
  >
    <TextField :field="field" v-on:field-change="handleEmit" />

  </form>
</template>

<script>
import { globalFields, customGlobalFields, extraFields} from "./helpers/globalFields"
import TextField from "./fields/newText.vue"
import {mapGetters} from "vuex"
export default {
  name: "FieldEditor",
  data () {
    return {
      navHeight: null,
      field: null,
      booleans: ["required", "locked", "allow_new_line", "show_emoji_picker", "expanded"],
      globalFields: ["help_text", "inline_help_text", "locked", "required", "visibility", "display_width"],
      repeatFields: ["occurrence"],
      requiredCustomFields: ["name", "label", "id"],
      allFields: {...globalFields, ...customGlobalFields, ...extraFields}
    }
  },
  updated() {
  },
   methods: {
    handleEmit(newData) {
      newData = newData.customFields.concat(newData.globalFields, newData.repeatFields);

      // Still need to set new File here
      let newField = {};
      let openFile = this.openFile;
      let cf = this.currentField;

      // Loop through newData and create new field to match Field Structure
      newData.forEach((item) => {
        if ( item?.field?.value == undefined) {
          console.log("err, FieldEditor.vue", item)
        } else {
          newField[item.field.key] = item.field.value;
        }
      })


      // Find the correct field to modify in JSON file
      function findField(arr) {
        arr.forEach((item, i) => {

          // If it is the correct field then replace it.
          if (item === cf) {
            arr.splice(i, 1, newField);
          } else if (item.children) {
            findField(item.children);
          }
        });
      }

      findField(openFile);


      !this.unsavedEdits ? this.$store.commit("updateUnsavedEdits", {unsavedEdits: true}) : null;
      // Updates the field that is currently being edited (right pane)
      this.$store.commit("updateCurrentField", newField);
      // updates the file with the new field information.
      this.$store.commit("updateOpenFile", {openFile: openFile});

    },
    checkIfGlobalField: function (key){
      return this.globalFields.includes(key)
    },
    checkIfRepeaterField: function(key) {
      return this.repeatFields.includes(key);
    },

    setFieldType: function (key, value) {

      // console.log(key, typeof value);
      // if (this.booleans.includes(key)) {
      //   return "boolean";
      // } else if (key == "children") {
      //   return "ignore"
      // } else if (typeof value === "object" && value != null){
      //    return "object"
      // } else {
      //   return "text";
      // }
      if (key == "children") {
        return "ignore"
      } else if (typeof value === "object" && value != null){
         return "object"
      } else if (this.allFields[key]) {
        return this.allFields[key].type
      } else {
        return "text"
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
    },
    confirmCustomFields: function (arrayCustom) {
      let tempCustom = {...customGlobalFields};
      // Remove all global fields that already exist from import
      arrayCustom.forEach(item => {
        delete tempCustom[item.key]
      })
      // Add remaining global fields
      for (const [key, value] of Object.entries(tempCustom)) {
        arrayCustom.push(value);
      }
      return arrayCustom
    }
   },
  computed: {
    ...mapGetters(["openFile", "currentField", "unsavedEdits"])
  },
  watch: {
    currentField: function (newData, oldData) {

      // Split current field into chunks for display
      if (newData !== null) {
        var newTemp = {
          customFields: [],
          globalFields: [],
          repeatFields: [],
        };

        for (const [key, value] of Object.entries(newData)) {
          var isGlobalField = this.checkIfGlobalField(key);
          var isRepeatField = this.checkIfRepeaterField(key);
          var fieldObj = {
            type: this.setFieldType(key,value),
            key: key,
            field: { key: key, value: value },
          }


          // if global add to global, if repeat add to repeat, else add to custom
          isGlobalField ? newTemp.globalFields.push(fieldObj) : isRepeatField ? newTemp.repeatFields.push(fieldObj) : newTemp.customFields.push(fieldObj);
        }
        newTemp.globalFields = this.confirmGlobalFields(newTemp.globalFields)
        newTemp.customFields = this.confirmCustomFields(newTemp.customFields)

        this.field = newTemp;
      }
    },
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
