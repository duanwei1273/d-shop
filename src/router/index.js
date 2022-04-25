import {createRouter, createWebHistory} from 'vue-router'


//引入一级组件
import DashBoard from "./../views/dashboard/DashBoard.vue";
import Home from "./../views/home/Home.vue";
import Mine from "./../views/mine/Mine.vue";
import UserCenter from "../views/mine/children/UserCenter.vue";
import ModifyThePicture from "../views/mine/children/children/ModifyThePicture.vue";
import ModifyTheNickname from "../views/mine/children/children/ModifyTheNickname.vue";
import ModifyTheEmail from "../views/mine/children/children/ModifyTheEmail.vue";
import ModifyThePw from "../views/mine/children/children/ModifyThePw.vue";

import Cart from "./../views/cart/Cart.vue";
import Category from "./../views/category/Category.vue";

import Order from "../views/order/Order.vue";
import MyAddress from "../views/order/children/MyAddress.vue";
import AddAddress from "../views/order/children/children/AddAddress.vue";
import EditAddress from "../views/order/children/children/EditAddress.vue";

import Login from "../views/login/Login.vue";
import Register from "../views/login/Register.vue"


//创建路由对象
const routes = [
    {path: '/', redirect: '/dashboard'},
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard,
        children: [
            {path: '/dashboard', redirect: '/dashboard/home'},
            {path: 'home', name: 'home', component: Home, meta: { keepAlive:true}},
            {path: 'category', name: 'category', component: Category, meta: { keepAlive:true}},
            {path: 'cart', name: 'cart', component: Cart, meta: { keepAlive:false}},
            {
                path: 'mine',
                name: 'mine',
                component: Mine,
                meta: { keepAlive:false},
                children: [
                    {
                        path: 'userCenter',
                        name:'userCenter',
                        component: UserCenter,
                        children: [
                            {path:'modifyThePicture', name: 'modifyThePicture', component: ModifyThePicture},
                            {path:'modifyTheNickname', name: 'modifyTheNickname', component: ModifyTheNickname},
                            {path:'modifyTheEmail', name: 'modifyTheEmail', component: ModifyTheEmail},
                            {path:'modifyThePw', name: 'modifyThePw', component: ModifyThePw},

                        ]
                    }
                ]
            },
        ]
    },
    {
        path: '/confirmOrder',
        name: 'order',
        component: Order,
        children: [
            {
                path: 'myaddress',
                name: 'myaddress',
                component: MyAddress,
                children: [
                    {path:'addAddress', name: 'addAddress', component: AddAddress},
                    {path:'editAddress', name: 'editAddress', component: EditAddress}
                ]
            }
        ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出路由对象
export default router