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
        v-bind:class="{'has-children': item.children, 'group': item.type === 'group', 'global-partial': item.type === 'globalPartial'}"
        :data-label="item.label"
        :key="level + '-' + index"
      >
        <div class="card-content" >
          <span class="label">{{item.label}}</span>
          <span class="meta" v-if="item.name"><strong>Name:</strong> {{item.name}}</span>
          <span v-if="item.id != null && item.id != undefined && item.id != '' && item.id" class="meta"><strong>ID:</strong> {{item.id}}</span>
          <div class="tag-container">
            <span class="tag">{{item.type | formatText}}</span>
            <span class="tag" v-if="item.occurrence">Repeater</span>
            <span class="tag" v-if="item.tab == 'STYLE'">Style Tab</span>
          </div>
          <div class="action-bar items-stretch">
            <button class="btn-primary py-1 px-2"
              @click="updateCurrentField(item)"
              v-if="item.type != 'globalPartial'"
            >
              <img src="@/assets/edit.svg" alt="Edit Icon" width="13">
            </button>
            <CloneField
              v-if="item.type != 'globalPartial'"
              :field="item"
            />
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
import CloneField from "../editFields/addRemove/CloneField.vue"
import {mapGetters} from 'vuex'
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
    filters: {
      formatText(text) {
        let splitName = text.split(" ");
        let newSplitName = splitName.map(word => {
          let newWord = word.split("");
          newWord.splice(0,1,newWord[0].toUpperCase());
          return newWord.join("");
        })
        return newSplitName.join(" ") ;
      }
    },
    computed: {
      ...mapGetters(['unsavedEdits']),
      dragOptions () {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost",
          move: event=> {
            !this.unsavedEdits ? this.$store.commit('updateUnsavedEdits', {unsavedEdits: true}) : null;
            return true;
          }
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
      RemoveField,
      CloneField
    }
  }
</script>

<style lang="postcss" scoped>
  .field-item {
    @apply w-full p-7 pb-2 text-left bg-white border border-purple-100;
  }
  .field-item .field-item {
    @apply shadow-md;
  }
  .field-item + .field-item {
    @apply border-t-0;
  }
  .field-item .meta {
    font-size: 14px;
  }
  .field-item .meta strong {
    @apply font-bold;
  }
  .field-item.group {
    @apply bg-orange-50;
  }
  .field-item.global-partial {
    @apply bg-purple-100;
  }
  .field-item .label {
    @apply font-extrabold uppercase mb-1 text-lg;
  }
  .field-item .tag-container {
    position: absolute;
    left: 0;
    bottom: 10px;
    margin-top: 5px;
  }
  .field-item .tag {
    @apply  bg-sky-200 text-black inline-block mr-2 uppercase font-bold font-sans rounded-2xl py-1 px-4;
    font-size: 10px;
  }
  .list-group {
    min-height: 20px;
  }
  .field-item span{
    display: block;
  }
  .field-item .card-content {
    position: relative;
    padding-bottom: 40px;
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
.action-bar {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  opacity: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 5px;
}
</style>

