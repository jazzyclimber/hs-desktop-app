<template>
  <div class="filter-wrapper">
    <label for="menu-tree-filter">Filter</label>
    <input type="text" v-model="filter" @input="filterNodes">
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

<style >
.filter-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 7px;
  margin-top: 10px;
}
.filter-wrapper label {
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}

</style>
