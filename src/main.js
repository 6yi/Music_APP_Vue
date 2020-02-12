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
  
})
