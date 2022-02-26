<template>
  <draggable
        :list="list"
        class="list-group"
        ghost-class="ghost"
        :group="{ name:'g1'}"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
        @input="emitter"
        :value="value"
      >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <div class="field-item"
        v-for="(item, index) in realValue"
        v-bind:class="{'has-children': item.children, 'group': item.type === 'group'}"
        :key="level + '-' + index"
      >
        <div class="card-content">
          <span>Label: {{item.label}}</span>
          <span>Type: {{item.type}}</span>
          <div class="action-bar">
            <button @click="updateCurrentField(item)">Edit</button>
            <RemoveField :field="item" />
          </div>
        </div>
        <ThirdVisualizer :level="level + 1" v-if="item.children" :list="item.children"  />
      </div>
      </transition-group>
  </draggable >
</template>

<script>
import draggable from "vuedraggable";
import RemoveField from "../editFields/addRemove/RemoveField.vue"
import ThirdVisualizer from "./ThirdVisualizer"
  export default {
    name: "ThirdVisualizer",
    data () {
      return {
        drag: false,
      }
    },
    props: {
      level: Number,
      list: Array,
      value: Array
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
      realValue() {
        return this.value ? this.value : this.list;
      },
    },
    methods: {
      updateCurrentField (currentField) {
        this.$store.commit('updateCurrentField', currentField);
      },
      emitter (value) {
        this.$emit('input', value)
      }
    },
    components: {
      draggable,
      ThirdVisualizer,
      RemoveField
    }
  }
</script>

<style scoped>
  .field-item {
    width: 100%;
    padding: 20px;
    border: 1px solid black;
    text-align: left;
    background-color: white;
  }
  .field-item.group {
    background-color: #fff9ec;
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
  .field-item .card-content {
    position: relative;
  }

  .field-item .card-content:hover .action-bar {
    opacity: 1;
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.field-item {
  cursor: pointer;
  margin: 0;
}
.list-group-item i {
  cursor: pointer;
}
</style>

<style scoped>
  .action-bar {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    padding: 10px;
    opacity: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 5px;
  }
</style>
