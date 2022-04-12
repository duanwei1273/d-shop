import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { Tabbar, TabbarItem } from 'vant';

//引入fasteclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

//引入全局样式
import './style/common.less'


const app = createApp(App)
app.use(router);
app.use(Tabbar);
app.use(TabbarItem);
app.mount('#app')
