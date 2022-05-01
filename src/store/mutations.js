import {
    ADD_GOODS,
    INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS,
    SELECTED_ALL_GOODS,
    CLEAR_CART,
    USER_INFO,
    INIT_USER_INFO,
    RESET_USER_INFO

} from './mutations-type'
import {getStore, removeStore, setStore} from './../config/global'


export default {
    //往购物车中添加数据
    [ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice, gNum,cId}){
        let shopCart = state.shopCart;
        //判断商品是否存在
        if(shopCart[goodsId]){//存在
            shopCart[goodsId]['num']++;
        }else {//不存在
            shopCart[goodsId] = {
                'num' : gNum?gNum:1,
                'id' : goodsId,
                'name' : goodsName,
                'small_image' : smallImage,
                'price' : goodsPrice,
                'checked' : true,
                'cid': cId
            }
        }
        //产生新对象
        state.shopCart = {...shopCart};
        //存入本地
        setStore('shopCart', state.shopCart);
    },

    //页面初始化。获取购物车数据(从本地)
    [INIT_SHOP_CART](state) {
        let initCart = getStore('shopCart');
        if(initCart) {
            state.shopCart = JSON.parse(initCart);
        }
    },


    //把商品移出购物车
    [REDUCE_CART](state, goodsId) {
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId.goodsId];
        // console.log(goods);
        if(goods){//找到该商品
            if(goods['num'] > 0){
                goods['num']--;
                //判断是否只有0个
                if(goods['num'] === 0){
                    delete shopCart[goodsId.goodsId];
                }

            }else {
                goods = null;
            }
            //同步数据
            state.shopCart = {...shopCart};
            setStore('shopCart',state.shopCart)

        }
    },

    //单个商品的选择和取消
    [SELECTED_SINGER_GOODS](state, goodsId){
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId.goodsId];
        if(goods){
             if(goods.checked !== null){//存在该属性
            //     console.log('更改')
                goods.checked = !goods.checked;
             }
            // else {
            //     this.$set(goods,'checked',true);
            // }
            //同步数据
            state.shopCart = {...shopCart};
            setStore('shopCart',state.shopCart)
        }

    },

    //全选和取消全选
    [SELECTED_ALL_GOODS](state, {isSelected}){
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((goods, index)=>{
            if(goods.checked !== null){//存在该属性
                //     console.log('更改')
                goods.checked = !isSelected;
            }
        });
        //同步数据
        state.shopCart = {...shopCart};
        setStore('shopCart',state.shopCart)

    },

    ////清除购物车
    [CLEAR_CART](state){
        state.shopCart = null;
        state.shopCart = {...state.shopCart};
        setStore('shopCart',state.shopCart);
    },

    //保存用户信息到本地
    [USER_INFO](state, userInfo){
        state.userInfo = userInfo;
        setStore('userInfo', state.userInfo);
    },

    //初始化用户信息
    [INIT_USER_INFO](state){
        let userInfo = getStore('userInfo');
        if(userInfo){
            state.userInfo = JSON.parse(userInfo);
        }
    },

    //退出登录清空用户数据
    [RESET_USER_INFO](state){
        state.userInfo = {};
        removeStore('userInfo');
    },

}
