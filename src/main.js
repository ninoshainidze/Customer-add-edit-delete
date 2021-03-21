import Vue from 'vue'
import App from './App.vue'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, alpha, max, min } from 'vee-validate/dist/rules';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

extend('required', required);
extend('alpha', alpha);
extend('max', max);
extend('min', min);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);