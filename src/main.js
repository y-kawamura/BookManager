import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

Vue.config.productionTip = false;

// Avoid Illegal invocation error
// since browser restricts native method aliases like fetch
Vue.prototype.$http = (url, opts) => fetch(url, opts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
