import Vue from 'vue';
import App from './App.vue'
import store from './store'
import TestApp from "@/components/user/Apps/TestApp.vue";

Vue.config.productionTip = false

Vue.component('TestApp', TestApp);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');