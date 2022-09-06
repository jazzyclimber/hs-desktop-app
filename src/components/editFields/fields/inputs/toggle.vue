<template>
    <label class="toggle__button flex flex-row items-center " :class="{'active': isActive}">
        <span v-if="isActive" class="toggle__label ">On</span>
        <span v-if="!isActive" class="toggle__label">Off</span>

        <input type="checkbox" v-model="toggleValue" @change="$emit('input', toggleValue)">
        <span class="toggle__switch"></span>
    </label>
</template>

<script>
export default {
  name: "Toggle",
  data () {
    return {
      toggleValue: false
    }
  },
  props: {
    value: Boolean,
  },
  watch: {
    initState: {
      immediate: true,
      handler: function () {
        this.toggleValue = this.initState;
      }
    }
  },
  computed: {
    isActive () {
      return this.toggleValue;
    },
    initState: {
      get () {
        return this.value;
      }
    }
  }
}
</script>

<style lang="postcss">
.toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
}
.toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
}
.toggle__label {
  @apply text-sm font-bold uppercase;
  min-width: 25px;
  font-size: 11px;
}
.toggle__button .toggle__switch {
    display:inline-block;
    height:12px;
    border-radius:6px;
    width:40px;
    background: #BFCBD9;
    box-shadow: inset 0 0 1px #BFCBD9;
    position:relative;
    margin-left: 10px;
    transition: all .2s ease;
}

.toggle__button.active .toggle__switch {
  @apply bg-indigo-300
}

.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
}

.toggle__button .toggle__switch::after {
    background: #4D4D4D;
    box-shadow: 0 0 1px #666;
    transition: all .2s ease;
}
.toggle__button .toggle__switch::before {
    background: #4D4D4D;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    opacity:0;
    transition: all .2s ease;
}
.toggle__button.active .toggle__switch::after {
  left: calc(100% - 18px);
}
.toggle__button.active .toggle__switch::before,
.toggle__button.active .toggle__switch::after {
    @apply bg-indigo-500;
}
</style>
