import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import VueRouterCache from 'vue-router-cache'
Vue.use(VueRouterCache, {
  router: router,
  max: 10,
    getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})

import * as api from '@/api/index';
Vue.prototype.$api = api;
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import '@/styles/index.less';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
