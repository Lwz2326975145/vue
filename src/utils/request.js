import axios from 'axios'

import { Notification,Message } from 'element-ui'
import router from 'vue-router'
const request=axios.create(
    {
        baseURL:'/api',//添加api
        timeout:5000,//请求过期时间
    }
)
//请求拦截器
request.interceptors.request.use(config=>{
    const token = localStorage.getItem("token");
        if (token) {
            config.headers.token = token;
        }
    return config
})
//响应拦截器
request.interceptors.response.use(
    response => {
        
        
        //20000代表成功
        if (response?.data?.code === 20000) {
            // 由于历史遗留问题, 后端响应的结构不能一次性做到统一,兼容处理一下
            if (typeof response?.data?.data === 'string')
                Message.success(response?.data?.data);
            if ( typeof response?.data?.data?.info === 'string') 
                Message.success(response?.data?.data?.info);
            return response;
            
            // 603 代表token失效, 处理跳转到登录
        } else if (response?.data?.code === 603) { 
            Notification.error({
                title: '错误',
                message: 'token失效,请重新登录'
            });
            // 替换到登录页面，但是如果是login页面那就不重复跳转
            let url=window.location.href.split('/')
            if(url[url.length-1]!=='login'){
                
            // window.location.href='/login'
            localStorage.clear()
            // window.location.reload()
            
            }
            
        } else {
            //如果原始的请求状态不等于200表示响应错误
             if(response.status!==200){
                Notification.error({
                    title: '错误',
                    message: '响应错误'
                })
            }
        }
                return response
    }
)


export default request
