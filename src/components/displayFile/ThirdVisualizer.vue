<template>
  <draggable
        :list="list"
        class="list-group"
        ghost-class="ghost"
        :group="{ name:'g1'}"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
      >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <div class="field-item"
        v-for="item in list"
        v-bind:class="{'has-children': item.children}"
        :key="item.name + '-' + level"
      >
        <span>Label: {{item.label}}</span>
        <span>Type: {{item.type}}</span>
        <span v-if="item.children">Has Children</span>
        <ThirdVisualizer :level="level + 1" v-if="item.children" :list="item.children"  />
      </div>
      </transition-group>
  </draggable >
</template>

<script>
import draggable from "vuedraggable";
import ThirdVisualizer from "./ThirdVisualizer"
  export default {
    name: "ThirdVisualizer",
    data () {
      return {
        drag: false
      }
    },
    props: {
      level: Number,
      list: Array
    },
    computed: {
      dragOptions () {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    components: {
      draggable,
      ThirdVisualizer
    }
  }
</script>

<style>
  .field-item {
    width: 100%;
    padding: 20px;
    border: 1px solid black;
  }
  .field-item.has-children {
    padding-bottom: 0;
  }
  .list-group {
    min-height: 20px;
  }
  .field-item span{
    display: block;
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
.field-item {
  cursor: move;
  margin: 0;
}
.list-group-item i {
  cursor: pointer;
}
</style>
