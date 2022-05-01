import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import { Step, Steps,Tab, Tabs, Button , ActionBar, ActionBarIcon, ActionBarButton ,Field,  Uploader, Tabbar, TabbarItem, Swipe, SwipeItem, Loading, Image as VanImage , Toast , Dialog , NavBar , ContactCard , AddressList , AddressEdit, Cell, CellGroup , SubmitBar , Icon , Grid, GridItem } from 'vant';

//引入fasteclick
import FastClick from 'fastclick'
// if ('addEventListener' in document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         FastClick.attach(document.body);
//     }, false);
// }

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
//使用vuex
app.use(store);


//使用vantUI组件
app.use(Step);
app.use(Steps);
app.use(Tab);
app.use(Tabs);
app.use(Button);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Field)
app.use(Uploader);
app.use(Grid);
app.use(GridItem);
app.use(Icon);
app.use(SubmitBar);
app.use(Cell);
app.use(CellGroup);
app.use(AddressEdit);
app.use(AddressList);
app.use(ContactCard);
app.use(NavBar);
app.use(Dialog);
app.use(Toast);
app.use(VanImage);
app.use(Loading);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Swipe);
app.use(SwipeItem);


app.mount('#app')
