<template>
  <div class="filter-wrapper mb-3">
    <label for="menu-tree-filter">Filter</label>
    <input type="text" v-model="filter" @input="filterNodes" class="flex-grow ">
  </div>
</template>

<script>
export default {
  name: "MenuTreeFilter",
  data () {
    return {
      filter: null
    }
  },
  methods: {
    filterNodes() {
      const nodes = document.querySelectorAll(".menu-wrapper.top-level .module");
        if (this.filter == "" || this.filter == undefined) {
          nodes.forEach(item=> {
            item.closest("ul").style.display = "block";
          })
        } else {
          nodes.forEach(item => {
            const name = item.getAttribute("data-name");
            name.toLowerCase().includes(this.filter.toLowerCase()) ? item.closest("ul").style.display = "block" : item.closest("ul").style.display = "none";
          })
        }
    }
  }
}
</script>

<style lang="postcss" >
.filter-wrapper {
  @apply flex flex-row items-center justify-start gap-2 my-2 w-full;
  max-width: 316px
}
.filter-wrapper label {
  @apply inline-block uppercase font-bold;
  font-size: 11px;
}

</style>
