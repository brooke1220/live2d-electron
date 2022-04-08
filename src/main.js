import Vue from 'vue'
import App from './App.vue'
import '../static/style/tailwind.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
