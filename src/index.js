import Vue from 'vue';
import uuid from 'vue-uuid';//追加

import MyApp from 'Components/App';
import store from './store';

Vue.use(uuid);
new Vue({
  el: '#app',
  store,
  components: {
    MyApp
  },
  template: '<my-app></my-app>',
});
