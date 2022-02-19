import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cwd: null,
    tree: null,
    openFile: null,
    currentField: null,
    currentFilePath: null,
  },
  mutations: {
    changeCurrentDirectory (state, payload) {
      state.cwd = payload.cwd;
      state.tree = payload.tree;
    },
    changeTree (state, payload) {
      state.tree = payload
    },
    updateCurrentField (state, payload) {
      console.log('UPDATE CURRENT FIELD')
      state.currentField = payload
    },
    updateOpenFile (state, payload) {
      state.openFile = payload.openFile
    },
    addFieldToOpenFile(state, payload) {
      state.openFile.unshift(payload)
    },
    updateCurrentFilePath(state, payload) {
      state.currentFilePath = payload
    },
    removeFieldFromOpenFile(state, payload) {
      let df = payload

      function findField(arr) {
        arr.forEach((item, i) => {
          if (item === df) {
            // arr[i] = payload;
            arr.splice(i, 1);
          } else if (item.children) {
            findField(item.children);
          }
        });
      }

      findField(state.openFile)
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
    },
    currentFilePath (state) {
      return state.currentFilePath;
    }
  },
  actions: {
    removeField({commit}, payload) {
      commit('updateCurrentField', null)
      commit('removeFieldFromOpenFile', payload)
    }
  },
  modules: {
  }
})
