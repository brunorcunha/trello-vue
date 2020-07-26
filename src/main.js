import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import mixins from './mixins/Mixin'
import store from './store'
import vueResource from 'vue-resource'
import draggable from 'vuedraggable'

Vue.use(vueResource)
Vue.mixin(mixins)
Vue.component('draggable', draggable)
Vue.config.productionTip = false

Vue.http.interceptors.push(request => {
  request.headers.set('apikey', process.env.VUE_APP_API_KEY)
})

new Vue({
  vuetify,
  store,
  beforeCreate () {
    this.$store.dispatch('configs/init')
  },
  render: h => h(App)
}).$mount('#app')
