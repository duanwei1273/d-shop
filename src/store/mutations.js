import {
    ADD_GOODS,
    INIT_SHOP_CART,
    REDUCE_CART,
    SELECTED_SINGER_GOODS

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
            if(goods.checked){//存在该属性
                goods.checked = !goods.checked;
            }
            // else {
            //     this.$set(goods,'checked',true);
            // }
            //同步数据
            state.shopCart = {...shopCart};
            setStore('shopCart',state.shopCart)
        }

    }
}
