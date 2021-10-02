import axios from 'axios';
import store from '@/store'

const service = axios.create({
    baseURL: process.env.VUE_APP_API,
});

service.interceptors.request.use(async (config)=>{
    if(config.url != "/user/login"){
       config.headers.token =  store.getters.user.token;
    }
    return config;
})

service.interceptors.response.use(async (response)=>{
    return response.data;
},function(error){
    console.log(error,1);
    if(error.response.status == 401){
        store.dispatch("logout");
    }
});

export default service;