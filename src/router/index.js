import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import * as routeNames from './routeNames.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'home',
    redirect: routeNames.Library
  },
  {
    path: '/library',
    name: routeNames.Library,
    component: () => import('../pages/booksLibrary/booksLibrary.vue'),
  },
  {
    path: '/latest',
    name: routeNames.Latest,
    component: () => import('../pages/booksLatest/booksLatest.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters?.getLatestBooksIds?.length){
        next();
      }else{
        next({name:routeNames.Library})
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router