import axios from "axios";

export default function ajax(url = '', parmas = {}, type = 'GET') {
    //变量
    let promise;

    //返回一个promise对象
    return new Promise((resolve, reject) => {
        //判断请求类型
        if(type.toUpperCase() === 'GET'){
            //拼接字符串
            let paramasStr = '';
            //遍历
            Object.keys(parmas).forEach( key =>{
                paramasStr  +=  key + '=' + parmas[key] + '&'
            });
            //过滤最后的&
            if(paramasStr){
                paramasStr = paramasStr.substr(0,paramasStr.lastIndexOf('&'))
            }
            //拼接完整路径
            url += '?' + paramasStr;
            //发起GET请求
            promise = axios.get(url);
        }else if(type.toUpperCase() === 'POST'){
            //发起POST请求
            promise = axios.post(url, parmas);
        }

        //处理结果返回
        promise.then((response)=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        })
    })
}