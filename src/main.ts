import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(VueAxios, axios)
    .mount('#app')
