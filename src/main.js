import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入VANT
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible'
// 处理最大宽度
import {handleMaxWidth } from './assets/utils.js'
handleMaxWidth()
window.addEventListener('resize',handleMaxWidth)

createApp(App).use(store).use(router).use(Vant).mount('#app')