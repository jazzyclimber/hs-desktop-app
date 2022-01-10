<template>
    <Container @drop="onDrop"  >
      <Draggable v-for="(item) in tempTree" :key="item.name">
        <div class="field dragable-item" @click="updateCurrentField(item)">
          <p>Label: {{item.label}}</p>
          <p>Type: {{item.type}}</p>
        </div>
        <FieldVisualizer :tree="item.children" v-if="item.children" />
      </Draggable>
    </Container>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import FieldVisualizer from "./FieldVisualizer"
  export default {
    name: "FieldVisualizer",
    data () {
      return {
        tempTree: this.tree,
        currentField: null
      }
    },
    props: {
      level: Number,
      tree: Array
    },
    watch: {
      tree: function () {
        this.tempTree = this.tree;
      }
    },
    methods: {
    shouldAcceptDrop (sourceContainerOptions, payload) {
      return true;
    },
    onDrop (dropResult) {
      this.tempTree = this.applyDrag(this.tempTree, dropResult);
    },
    updateCurrentField (field) {
      this.$store.commit("updateCurrentField", field)
    },
    applyDrag (arr, dragResult) {
        const { removedIndex, addedIndex, payload } = dragResult
        console.log(removedIndex, addedIndex, payload)
        if (removedIndex === null && addedIndex === null) return arr
        const result = [...arr]
        let itemToAdd = payload
        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0]
        }
        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd)
        }
        return result
    }
  },
    components: { Container, Draggable, FieldVisualizer }
  }
</script>

<style scope>
.field {
  border: 1px solid black;
  padding: 10px;
  margin: 5px 0;
  background-color: white;
  text-align: left;
}
.field p {
  margin: 0 0 5px;
}
.smooth-dnd-draggable-wrapper {
  padding: 10px 20px;
  background-color: #e3f7fc;
  border: 1px solid #88b6c2;
  transition: background-color .2s ease, border .2s ease;
}
.smooth-dnd-draggable-wrapper:hover {
  padding: 10px 20px;
  background-color: #d9fced;
  border: 1px solid #88c2a1;
}
</style>
