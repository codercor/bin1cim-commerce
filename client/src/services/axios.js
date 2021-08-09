import axios from 'axios';
import store from '@/store'

const service = axios.create({
    baseURL: "http://localhost:3000/v1",
});

service.interceptors.request.use(async (config)=>{
    if(config.url != "/user/login"){
       config.headers.token =  store.getters.user.token;
    }
    console.log("Request Object",config);
    return config;
})

service.interceptors.response.use(async (response)=>{
    console.log("Response",response);
    return response.data;
},function(error){
    if(error.response.status == 401){
        store.dispatch("logout");
    }
});

export default service;