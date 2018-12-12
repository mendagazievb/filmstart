import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueHighcharts from 'vue-highcharts';
import YmapPlugin from 'vue-yandex-maps';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'whatwg-fetch';

Vue.use(YmapPlugin);
Vue.use(VueHighcharts);

library.add(faSpinner, faCog);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');