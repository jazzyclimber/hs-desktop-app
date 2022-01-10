import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cwd: null,
    tree: null,
    openFile: null,
    currentField: null
  },
  mutations: {
    changeCurrentDirectory (state, payload) {
      console.log(payload)
      state.cwd = payload.cwd;
      state.tree = payload.tree;
    },
    changeTree (state, payload) {
      state.tree = payload
    },
    updateCurrentField (state, payload) {
      state.currentField = payload
    },
    updateOpenFile (state, payload) {
      console.log('updateOpenFile', payload)
      state.openFile = payload.openFile
    }
  },
  getters: {
    tree (state) {
      return state.tree
    },
    currentField (state) {
      return state.currentField
    },
    openFile (state) {
      return state.openFile
    }
  },
  actions: {
  },
  modules: {
  }
})
