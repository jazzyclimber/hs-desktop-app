<template>
  <div class="display-filter-wrapper">
    <label for="menu-tree-filter" class="uppercase">Filter</label>
    <input
      class="border-2 border-indigo-500 rounded font-sans text-sm p-1"
      type="text"
      v-model="filter"
      @input="filterNodes">
  </div>
</template>

<script>
export default {
  name: "FilterDisplay",
  data () {
    return {
      filter: null
    }
  },
  methods: {
    filterNodes() {
      const nodes = document.querySelectorAll(".field-display-container .field-item");
        if (this.filter == "" || this.filter == undefined) {
          nodes.forEach(item=> {
            item.style.display = "block";
          })
        } else {
          nodes.forEach(item => {
            const name = item.getAttribute("data-label");
            name.toLowerCase().includes(this.filter.toLowerCase()) ? showParentTree(item) : item.style.display = "none";
          })
        }

        function showParentTree(child){
          child.style.display = 'block';
          const parentField = child.parentElement.closest('.field-item');
          parentField ? showParentTree(parentField) : null
        }
    }
  }
}
</script>

<style lang="postcss" >
.display-filter-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 10px;
}
.display-filter-wrapper label {
  @apply inline-block font-bold;
  font-size: 11px;
}

</style>
