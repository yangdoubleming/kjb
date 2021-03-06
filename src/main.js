import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//  reset CSS
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/styles/index.scss' // global css
import './element-variables.scss'

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
