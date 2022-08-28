<template>
<div class="select-wrapper" :class="orientation">
  <label class="label">{{label}}</label>
  <select name="" id="" @change="emitter">
    <option v-for="option in options" :value="option.value">{{option.label}}</option>
  </select>
</div>

</template>

<script>
  export default {
    name: "Select",
    props: {
      options: Array,
      label: String,
      Orientation: String,
    },
    methods: {
      emitter: function(evt) {
        this.$emit('select-change', evt);
      }
    }

  }
</script>
