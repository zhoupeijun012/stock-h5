import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';

import * as api from '@/api/index';
Vue.prototype.$api = api;
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import '@/styles/index.less';
Vue.config.productionTip = false;

import StockDeatil from '@/views/stock/components/detail/stock-detail.js';
Vue.use(StockDeatil);

import ConceptDetail from '@/views/concept/components/detail/concept-detail.js';
Vue.use(ConceptDetail);

import IndustryDetail from '@/views/industry/components/detail/industry-detail.js';
Vue.use(IndustryDetail);

import RegionDetail from '@/views/region/components/detail/region-detail.js';
Vue.use(RegionDetail);

import T0Detail from '@/views/t+0/components/detail/t0-detail.js';
Vue.use(T0Detail);

import T1Detail from '@/views/t+1/components/detail/t1-detail.js';
Vue.use(T1Detail);

import LofDetail from '@/views/lof/components/detail/lof-detail.js';
Vue.use(LofDetail);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
