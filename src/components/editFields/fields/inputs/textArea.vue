<template>
    <label>
        <span  class="toggle__label">On</span>
        <span  class="toggle__label">Off</span>

        <input type="checkbox" :id="keyName" v-model="toggleValue" @change="emitter">
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
    keyName: String,
    index: Number
  },
  methods: {
    emitter: function (value) {
      var payload = { index: this.index, field: { } }
      var key = this.keyName;
      console.log(value);
      payload.field.key = key
      payload.field.value = this.toggleValue
      this.$emit("toggle-change", payload)
    }
  },
  watch: {
    initState: function () {
      this.toggleValue = this.initState
    }
  },
  computed: {
    initState: {
      get () {
      return this.value
    }
    }
  }
}
</script>

<style >
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
.toggle__button .toggle__switch {
    display:inline-block;
    height:12px;
    border-radius:6px;
    width:40px;
    background: #BFCBD9;
    box-shadow: inset 0 0 1px #BFCBD9;
    position:relative;
    margin-left: 10px;
    transition: all .25s;
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
    transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
}

.toggle__button .toggle__switch::after {
    background: #4D4D4D;
    box-shadow: 0 0 1px #666;
}
.toggle__button .toggle__switch::before {
    background: #4D4D4D;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    opacity:0;
}
</style>
