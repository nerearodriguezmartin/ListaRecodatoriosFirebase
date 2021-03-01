import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { firestorePlugin } from 'vuefire'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"



Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(firestorePlugin)

Vue.use(VueRouter)

Vue.config.productionTip = false


import cabecera from './components/cabecera'
Vue.component(cabecera)

import nota from './components/nota'
Vue.component(nota)

import pie from './components/pie'
Vue.component(pie)

const routes = [
  { path: '/pie', component: pie },
  { path: '/nota', component: nota }
]


const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  render: h => h(App),

  router

}).$mount('#app')
