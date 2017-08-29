// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'

import 'common/css/index.scss'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: [
		{ path: '/', redirect: '/goods' },
    { path: '/goods', name: 'goods', component: goods },
    { path: '/ratings', name: 'ratings', component: ratings },
    { path: '/seller', name: 'seller', component: seller }
  ],
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
new Vue({
  router: router,
  template: '<App/>',
  components: { App, seller, ratings, goods }
}).$mount('#app')
