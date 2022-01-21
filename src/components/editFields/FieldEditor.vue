<template>
<form class="field-editor"
  :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
  v-if="currentField"
>
  <TextField v-model="currentField" v-on:emit-current-field="captureEmit" />

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
   methods: {
    calcHeight: function () {
      var navBar = document.querySelector('.nav-bar');
      console.log(navBar.offsetHeight)
      return navBar.offsetHeight;
    },
    checkIndex(array) {
      var index = array.indexOf(this.currentField);
      console.log('checkindex', array)
      return index != -1 ? index : false;
    },
    findIndex(args) {
      let finalPath = [];
      let fieldMissing = true;
      const array = args.array;
      const newValue = args.newField;

      // const findField = (item) => {
      //   console.log(this.checkIndex(item))
      //   if (this.checkIndex(item) !== false) {
      //     finalPath.push(this.checkIndex(item));
      //     fieldMissing = false;
      //   } else {
      //     console.log('running else')
      //     item.forEach((sub, i) => {
      //       if (fieldMissing && sub.children) {
      //         finalPath.push(i)
      //         console.log(i, finalPath, sub)
      //         findField(sub.children);
      //         fieldMissing ? finalPath.pop() : null
      //       }
      //     })
      //   }
      // }

      // const parseArray = ()=> {
      //   var obj = `${this.openFile}`;

      //   finalPath.forEach(item => {
      //     console.log(item)
      //     obj = obj + `[${item}].children`
      //   })
      //   return obj
      // }

      const findField = (ar, newField) => {
        let isCurrentField = false

        ar = ar.map( item => {
          item == this.currentField ? isCurrentField = true : isCurrentField = false;
          console.log('currentFidl', isCurrentField);
          if (isCurrentField) {
            console.log('hitcurrentif')
            console.log('newField',newField)
            return newField;
          } else if (item.children) {
            findField(item.children, newField);
            return item;
          }

        })

        return ar

      }

    let updatedFile = findField(array, newValue);

    return updatedFile
    },
    captureEmit (value) {
      console.log('emitted', value)
      var temp = this.openFile
      // this.findIndex(temp, value)
      const args = {array: temp, newField: value}
      var updatedFile = this.findIndex(args)
      this.openFile = updatedFile
      // var index = temp.indexOf(this.currentField)
      // console.log("current index", index);
      // console.log('temp', temp)
      // temp.flatMap(item => {
      //   console.log("flatmap", item)
      // })
      // temp.splice(index, 1, value)
      // console.log(temp)
      // this.$store.commit('updateOpenFile', { openFile: temp })
    }
  },
  computed: {
    file () {
      return this.$store.getters.openFile
    },
    currentField: {
      get () {
       return this.$store.getters.currentField;
      },
      set (value) {
        console.log('commit-called')
        this.$store.commit('updateCurrentField', value);
      }
    }
  },
  watch: {
    file: function () {
      this.openFile = this.file
    }
  },
    mounted () {
    this.navHeight = this.calcHeight();
    this.openFile = this.file
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
