import {createRouter, createWebHistory} from 'vue-router'


//引入一级组件
import DashBoard from "./../views/dashboard/DashBoard.vue";
import Home from "./../views/home/Home.vue";
import Mine from "./../views/mine/Mine.vue";
import Cart from "./../views/cart/Cart.vue";
import Category from "./../views/category/Category.vue";

//创建路由对象
const routes = [
    {path: '/', redirect: '/dashboard'},
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard,
        children: [
            {path: '/dashboard', redirect: '/dashboard/home'},
            {path: 'home', name: 'home', component: Home},
            {path: 'category', name: 'category', component: Category},
            {path: 'cart', name: 'cart', component: Cart},
            {path: 'mine', name: 'mine', component: Mine},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出路由对象
export default router