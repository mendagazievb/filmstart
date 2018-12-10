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
      name: 'map',
      component: () => import(/* webpackChunkName: "map" */ './views/Map.vue'),
    },
    {
      path: '/details',
      name: 'details',
      component: () => import(/* webpackChunkName: "details" */ './views/Details.vue'),
    },
  ],
});
