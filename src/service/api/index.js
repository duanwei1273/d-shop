import ajax from "./ajax.js";
//http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001 - lk006
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc'
const ZZY_BASE_URL = 'http://124.222.138.52:8887/'

export const getHomeData = ()=> ajax(BASE_URL + '/api/homeApi')
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories')
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams)

//home页面数据获取接口
//分类获取
export const getGoodsClassify = () => ajax(ZZY_BASE_URL + '/type/')

//所有商品获取
export const getAllGoods = () => ajax(ZZY_BASE_URL + '/goods/')

//根据分类id得到所有商品
export const getCategoryGoods = (id)=>ajax(ZZY_BASE_URL + '/goods/get/' + id )





//用户中心接口
//http://demo.itlike.com/web/xlmc/api/send_code
const LOCAL_BASE_URL = 'http://demo.itlike.com/web/xlmc';
//短信验证
export const getPhoneCode = (phone)=>ajax(LOCAL_BASE_URL + '/api/send_code', {phone});
//手机验证登录
export const phoneCodeLogin = (phone , code)=>ajax(LOCAL_BASE_URL + '/api/login_code', {phone, code},'POST');

//账号密码登录
export const passwordLogin = (username, password)=>ajax(ZZY_BASE_URL + '/user/login', {username: username, password: password},'POST');

//邮箱验证
export const getEmailCode = (email)=>ajax(ZZY_BASE_URL + '/user/code' ,{email: email})

//邮箱验证登录
export const emailCodeLogin = (email, code)=>ajax(ZZY_BASE_URL + '/user/register_email', {email: email, code: code}, 'POST')

//注册
export const emailCodeRegister = (nickname, username, password, email, code)=>ajax(ZZY_BASE_URL + '/user/register', {nickname:nickname, username:username, password:password, email:email, code:code}, 'POST')

//修改头像
export const modifThePicture = (file)=>ajax(ZZY_BASE_URL + '/user/image', {file:file}, 'POST')

//修改昵称
export const modifyTheNickname = (id, nickname)=>ajax(ZZY_BASE_URL + '/user/information', {id, nickname}, 'PUT')

//修改邮箱
export const modifyTheEmail = (id, email)=>ajax(ZZY_BASE_URL + '/user/information', {id, email}, 'PUT')

//修改密码
export const modifyThePassword = (id, password, newPassword)=>ajax(ZZY_BASE_URL + '/user/password', {id,password,newPassword}, 'PUT')



//购物车接口
//查询购物车
export const getUserGoodsCard = (id) => ajax(ZZY_BASE_URL + '/card/' + id)
//加入购物车
//购物车中商品加一
export const addUserGoodsCard = (id)=>ajax(ZZY_BASE_URL + '/card/addGoods',{id}, 'post')
//减该商品购物车数量
export const delUserGoodsCard = (id,g_nums)=>ajax(ZZY_BASE_URL + '/card/',{id,g_nums},'PUT')
//清空购物车
export const delAllGoodsCard = (ids)=>ajax(ZZY_BASE_URL + '/card/?ids=' + ids ,{},'DELETE')


//地址接口
//填加地址
export const addADDress = (address,consignee,phone,user_id)=>ajax(ZZY_BASE_URL + '/address/', {address,consignee,phone,user_id}, 'POST')
//根据用户id得到所有的收货地址
export const getAllAddress = (userId)=>ajax(ZZY_BASE_URL + '/address/' + userId)