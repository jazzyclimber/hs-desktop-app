<template>
<div class="select-wrapper w-full" :class="orientation">
  <label class="label" :class="labelClass">{{label}}</label>
  <select name="" id="" @change="emitter" class="border-2 border-indigo-500 rounded font-sans text-sm p-1 flex-grow" :class="selectClass">
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
      selectClass: String,
      labelClass: String
    },
    methods: {
      emitter: function(evt) {
        this.$emit('select-change', evt);
      }
    }

  }
</script>

<style lang="postcss">
.select-wrapper {
  @apply flex flex-row items-center justify-start gap-2;
  max-width: 317px;
}
.select-wrapper label {
  @apply inline-block font-bold uppercase;
  font-size: 11px;
}
</style>
