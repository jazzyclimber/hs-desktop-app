<template>
<form class="field-editor"
  :style="'max-height: calc(100vh - ' + navHeight + 'px);'"
>
  <label v-for="(item, i) in currentField" :key="i" :for="item.id">
    <span>{{item}}</span>
    <input type="text"  />
  </label>
</form>
</template>

<script>
export default {
  name: "FieldEditor",
  data () {
    return {
      navHeight: null
    }
  },
   methods: {
    calcHeight: function () {
      var navBar = document.querySelector('.nav-bar');
      console.log(navBar.offsetHeight)
      return navBar.offsetHeight;
    }
  },
  computed: {
    currentField: function () {
       return this.$store.getters.currentField;
    }
  },
    mounted () {
    this.navHeight = this.calcHeight();
  }
}
</script>
<style>
</style>
