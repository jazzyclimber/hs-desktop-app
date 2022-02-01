<template>
  <form class="field-editor"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
    v-if="currentField"
  >
    <TextField :field="field" v-on:field-change="handleEmit" />

  </form>
</template>

<script>
import TextField from "./fields/newText.vue"
import {mapGetters} from "vuex"
export default {
  name: "FieldEditor",
  data () {
    return {
      navHeight: null,
      field: null,
      booleans: ["required", "locked", "allow_new_line", "show_emoji_picker"],
    }
  },
  updated() {
  },
   methods: {
    handleEmit(newData) {

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
    setFieldType: function (key) {
      if (this.booleans.includes(key)) {
        return "boolean";
      } else {
        return "text";
      }
    },
   },
  computed: {
    ...mapGetters(["openFile", "currentField"])
  },
  watch: {
    currentField: function (newData, oldData) {
      var newTemp = [];
      for (const [key, value] of Object.entries(newData)) {
        newTemp.push({
          type: this.setFieldType(key),
          key: key,
          field: { key: key, value: value },
        });
      }
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
