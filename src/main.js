import Vue from 'vue'
import App from './App.vue'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import store from './store'
import router from './router'
import '@/core/filters';
import '@/plugins/validate';

Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
