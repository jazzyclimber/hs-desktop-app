<template>
  <div id="app relative">
  <Notification />
    <router-view/>
  </div>
</template>

<script>
import _ from "lodash"
import Notification from "@/components/notification"
export default {
  components: {
    Notification
  },
  mounted () {
    window.ipc.receive("newDirectory", (payload) => {
      if (payload.usage == "changeCurrentDirectory") {
        this.$store.commit("changeCurrentDirectory", {
          cwd: payload.cwd,
          tree: payload.tree
        })
      } else if (payload.usage == "changeGlobalPartialsDirectory") {
        console.log('this is hitting')
        this.$store.commit("changeGlobalPartialsDirectory", {
          tree: payload.tree,
          dirPath: payload.cwd
        })
      }
    })

    window.ipc.receive('autoUpdateErr', (payload) => {
      console.log('autoUpdateErr', payload);
    })

    window.ipc.receive("openFile", (payload) => {
        this.$store.commit("updateOpenFile", {
          openFile: payload.file
        })
        this.$store.commit("updateOpenFileUnedited", {
          openFileUnedited: _.cloneDeep(payload.file)
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
