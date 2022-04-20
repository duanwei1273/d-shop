import ajax from "./ajax.js";
//http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001 - lk006
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc'

export const getHomeData = ()=> ajax(BASE_URL + '/api/homeApi')
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories')
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams)
export const getzzy = (name) => ajax('http://192.168.0.109:8888/list',{name: name})