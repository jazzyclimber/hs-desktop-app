<template>
<transition name="slide-in">
  <article v-if="isVisible" class="fixed top-2 right-2 p-3 flex flex-row items-center justify-start gap-3 bg-gradient-to-r from-amber-500 to-orange-600 z-50 max-w-xs leading-tight" >
    <img @click="isVisible = !isVisible" class="cursor-pointer" src="@/assets/close-white.svg" alt="close button" width="20">
    <span class="text-white font-sans text-xs m-0 block">{{msg}}</span>
    <button class="border border-white py-1 px-5 text-xs text-white" @click="triggerInstall">Quit &amp; install</button>
  </article>
</transition>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      isVisible: false,
      msg: null,
      type: null
    }
  },
  methods: {
    triggerInstall: function() {
      window.ipc.send('quitAndUpdate', "");
    }
  },
  mounted () {
    window.ipc.receive("notification", (payload) => {
      console.log(payload);
        this.msg = payload.msg;
        this.type = payload.type;
        this.isVisible = true
    })
  }
}
</script>

<style>
.slide-in-enter-active {
  animation: slide-in .5s;
}
.slide-in-leave-active {
  animation: slide-in .5s reverse;
}
  @keyframes slide-in {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
