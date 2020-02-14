import Vue from "vue";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components:{App},
  render:h=>h(App)
  
})
