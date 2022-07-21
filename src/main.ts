import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// @ts-ignore
import { Vue3Mq } from "vue3-mq";
import "./style/index.css";

createApp(App).use(router).use(Vue3Mq).mount("#app");
