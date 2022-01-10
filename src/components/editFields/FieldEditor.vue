<template>
<form class="field-editor">
  <label v-for="(item, i) in currentField" :key="i" :for="item.id">
    <span>{{item}}</span>
    <input type="text"  />
  </label>
</form>
</template>

<script>
export default {
  name: "FieldEditor",
  computed: {
    currentField: function () {
       return this.$store.getters.currentField;
    }
  }
}
</script>
