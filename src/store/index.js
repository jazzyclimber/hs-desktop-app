import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cwd: null,
    globalPartialsTree: null,
    globalPartialsDir: null,
    tree: null,
    openFile: null,
    openFileUnedited: null,
    unsavedEdits: false,
    openFileName: null,
    currentField: null,
    currentFilePath: null,
    displayMode: null,
  },
  mutations: {
    updateOpenFileName(state, payload) {
      state.openFileName = payload.openFileName;
    },
    changeGlobalPartialsDirectory(state, payload) {
      state.globalPartialsTree = payload.tree;
      state.globalPartialsDir = payload.dirPath;
    },
    changeCurrentDirectory(state, payload) {
      state.cwd = payload.cwd;
      state.tree = payload.tree;
    },
    updateOpenFileUnedited(state, payload) {
      state.openFileUnedited = payload.openFileUnedited
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
    updateDisplayMode(state, payload) {
      state.displayMode = payload
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
    displayMode(state) {
      return state.displayMode;
    },
    openFileUnedited(state) {
      return state.openFileUnedited
    },
    unsavedEdits(state) {
      return state.unsavedEdits;
    },
    cwd(state){
      return state.cwd;
    },
    globalPartialsDir(state) {
      return state.globalPartialsDir;
    },
    globalPartialsTree(state){
      return state.globalPartialsTree;
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
