import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// import errLog from './helpers/logger'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    log: function(...args){
      console.log(args)
    },
    errLog: function(...args) {
      return this.log('ERROR::', args);
    },
    infoLog: function(...args) {
      return this.log('INFO::', args);
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

