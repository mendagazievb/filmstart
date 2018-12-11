import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',

  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/map',
      name: 'v-map',
      component: () => import(/* webpackChunkName: "map" */ './views/VMap.vue'),
    },
    {
      path: '/weather/:woeid',
      name: 'v-weather',
      component: () => import(/* webpackChunkName: "v-weather" */ './views/VWeather.vue'),
      children: [
        {
          path: ':date',
          name: 'v-weather-details',
          component: () => import(/* webpackChunkName: "v-weather-details" */ './views/VWeatherDetails.vue')
        }
      ]
    },
  ],
});
