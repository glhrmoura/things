import Vue from 'vue';

import 'vue-js-modal/dist/styles.css'
import '@/registerServiceWorker';
import VModal from 'vue-js-modal/dist/ssr.nocss'
import Skeleton from 'vue-loading-skeleton';

import App from './App.vue';

import '@/assets/scss/global.scss';

import store from './store';

import ImageSource from '@/components/ImageSource.vue';

Vue.config.productionTip = false;

Vue.use(VModal);
Vue.use(Skeleton)
Vue.component('ImageSource', ImageSource);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
