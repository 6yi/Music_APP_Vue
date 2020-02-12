<<<<<<< HEAD
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import router from './router'

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
=======
import Vue from "vue";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import router from './router'
import App from './App.vue'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components:{App},
  render:h=>h(App)
  
>>>>>>> sec
})
