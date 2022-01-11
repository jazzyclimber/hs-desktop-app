<template>
  <draggable :tag="'ul'" :group="{ name:'g1'}" @start="drag = true"
        @end="drag = false"  class="dragArea"  :value="value" v-bind="dragOptions"  @input="emitter" >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <li v-for="(item) in realValue" :key="item.name + '-' + level" class="field dragable-item" @click="updateCurrentField(item)">
      <p>Label: {{item.label}}</p>
      <p>Type: {{item.type}}</p>
        <!--<NewVisualizer :tree="item.children" v-if="item.children" :level="level + 1" />-->
        <NewVisualizer :level="level + 1" :value="item.children" v-if="item.children"/>
      </li>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import NewVisualizer from "./NewVisualizer"
  export default {
    name: "NewVisualizer",
    display: "Transitions",
    data () {
      return {
        tempTree: this.tree,
        currentField: null,
        drag: false
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      },
      realValue () {
        this.value ? console.log('value') : console.log("list");
        return this.value ? this.value : this.list;
      }
    },
    props: {
      level: Number,
      tree: Array,
      value: {
        required: false,
        type: Array,
        default: null
      },
      list: {
        required: false,
        type: Array,
        default: null
      }
    },
    watch: {
      tree: function () {
          this.tempTree = this.tree;
        }
    },
    methods: {
    lookForChild (array) {
      array.forEach(item => {
        if (item.children) {
            this.lookForChild(item.children)
          } else {
            this.children = []
          }
      })
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
    },
    emitter (value) {
      console.log('emitting')
      this.$emit("input", value);
    }

  },
    components: { draggable, NewVisualizer }
  }
</script>

<style>
.dragArea {
  min-height: 20px;
}
.field {
  border: 1px solid black;
  padding: 10px 10px 0;
  margin: 5px 0;
  background-color: white;
  text-align: left;
  color: black;
}
.field:hover {
  color: black;
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
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

</style>
