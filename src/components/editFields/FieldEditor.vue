<template>
  <form class="field-editor"
    :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
    v-if="currentField"
  >
    <TextField v-model="currentField" v-on:emit-current-field="handleEmit"  />

  </form>
</template>

<script>
import TextField from "./fields/newText.vue"

export default {
  name: "FieldEditor",
  data () {
    return {
      navHeight: null,
      openFile: null,
    }
  },
  updated() {
    console.log('field-editor has been updated')
  },
   methods: {
    handleEmit(val) {
      let openFile = this.file
      let searching = true;
      let cf = this.currentField

      function findField(arr) {
        arr.forEach((item, i) => {
          if (item == cf) {
            arr[i] = val
          } else if (item.children) {
            findField(item.children)
          }
        });
      }

      findField(openFile);
      this.currentField = val
      this.file = openFile

    },
    calcHeight: function () {
      var navBar = document.querySelector('.nav-bar');
      console.log(navBar.offsetHeight)
      return navBar.offsetHeight;
    }
   },
  computed: {
   file: {
      get () {
        return this.$store.getters.openFile
      },
      set(value) {
        this.$store.commit('updateOpenFile', { openFile: value })
      }
    },
    currentField: {
      get () {
       return this.$store.getters.currentField;
      },
      set (value) {
        this.$store.commit('updateCurrentField', value);
      }
    }
  },
  watch: {
    mounted () {
    this.navHeight = this.calcHeight();
    }
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
