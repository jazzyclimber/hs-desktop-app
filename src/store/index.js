import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cwd: null,
    globalPartials: {},
    tree: null,
    openFile: null,
    unsavedEdits: false,
    openFileName: null,
    currentField: null,
    currentFilePath: null,
  },
  mutations: {
    updateOpenFileName(state, payload) {
      state.openFileName = payload.openFileName;
    },
    changeGlobalPartialsDirectory(state, payload) {
      state.globalPartials.tree = payload.tree;
      state.globalPartials.dirPath = payload.dirPath;
    },
    changeCurrentDirectory(state, payload) {
      state.cwd = payload.cwd;
      state.tree = payload.tree;
    },
    updateUnsavedEdits(state, payload) {
      state.unsavedEdits = payload.unsavedEdits
    },
    changeTree(state, payload) {
      state.tree = payload
    },
    updateCurrentField(state, payload) {
      state.currentField = payload
    },
    updateOpenFile(state, payload) {
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
    tree(state) {
      return state.tree;
    },
    unsavedEdits(state) {
      return state.unsavedEdits;
    },
    globalPartials(state){
      return state.globalPartials;
    },
    openFileName(state) {
      return state.openFileName;
    },
    currentField(state) {
      return state.currentField;
    },
    openFile(state) {
      return state.openFile;
    },
    currentFilePath(state) {
      return state.currentFilePath;
    }
  },
  actions: {
    removeField({
      commit
    }, payload) {
      commit('updateCurrentField', null)
      commit('removeFieldFromOpenFile', payload)
    }
  },
  modules: {}
})
