import {
    ADD_GOODS,
    INIT_SHOP_CART
} from './mutations-type'
import {getStore, setStore} from './../config/global'


export default {
    //往购物车1中添加数据
    [ADD_GOODS](state, {goodsId, goodsName, smallImage, goodsPrice}){
        let shopCart = state.shopCart;
        //判断商品是否存在
        if(shopCart[goodsId]){//存在
            shopCart[goodsId]['num']++;
        }else {//不存在
            shopCart[goodsId] = {
                'num' : 1,
                'id' : goodsId,
                'name' : goodsName,
                'small_image' : smallImage,
                'price' : goodsPrice,
                'checked' : true
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
    }
}
