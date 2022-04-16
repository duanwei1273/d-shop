import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { Tabbar, TabbarItem, Swipe, SwipeItem, Loading, Image as VanImage  } from 'vant';

//引入fasteclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

//引入全局样式
import './style/common.less'

//引入vantUI配置
// import './plugins/vant.js'

//引入rem
import './config/rem.js'




const app = createApp(App)

//引入全局过滤器
// import './config/filters.js'
app.config.globalProperties.$filters =  {
    moneyFormat(value)  {
        return '¥' + Number(value).toFixed(2);
    }
}

//使用路由
app.use(router);

//使用vantUI组件
app.use(VanImage);
app.use(Loading);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Swipe);
app.use(SwipeItem);


app.mount('#app')
