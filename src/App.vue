<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted () {
    window.ipc.receive("newDirectory", (payload) => {
      this.$store.commit("changeCurrentDirectory", {
        cwd: payload.cwd,
        tree: payload.tree
      })
    })
    window.ipc.receive("openFile", (payload) => {
      this.$store.commit("updateOpenFile", {
        openFile: payload.file
      })
    })
  }
}
</script>

<style>
html,body {
  width: 100%;
  padding: 0;
  height: 100%;
  margin: 0;
  background-color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
