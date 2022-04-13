import ajax from "./ajax.js";
//http://demo.itlike.com/web/xlmc/api/homeApi
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc'

export const getHomeData = ()=> ajax(BASE_URL + '/api/homeApi')