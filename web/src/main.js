import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('http://bitcoin-backend:7000/notifications');
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VueSocketIO, SocketInstance);
Vue.use(Router)
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
