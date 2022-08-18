<template>
  <div class="display-filter-wrapper">
    <label for="menu-tree-filter">Filter</label>
    <input type="text" v-model="filter" @input="filterNodes">
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
      const nodes = Array.from().document.querySelectorAll(".field-display-container .field-item");
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

<style >
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
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
}

</style>
