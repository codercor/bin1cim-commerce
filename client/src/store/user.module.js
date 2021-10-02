import axios from '@/services/axios';
import router from '../router';
export default  {
    state:{
        userId:null,
        username:"",
        name:"",
        lastName:"",
        isLoggedIn:false,
        companyName:"",
        token:"",
        role:""
    },
    mutations:{
        setUserData:function(state,{id,username,name,lastName,token,isLoggedIn,role,companyName}){
            state.userId =id;
            state.username = username;
            state.name = name;
            state.lastName = lastName;
            state.token = token;
            state.isLoggedIn = isLoggedIn;
            state.role = role;
            state.companyName = companyName;
        },
    },
    actions:{
         async login({commit},payload){
             try {
                const user = await axios.post('/user/login',payload);
                if(!user.status){
                    console.log("Hata");
                }else{
                    user.isLoggedIn = true;
                    console.log(user);
                    commit("setUserData",user);
                    if(user.role == 1) router.push("/admin/");
                    else  router.push("/panel/");
                }
                
             } catch (error) {
                 console.log("HATA");
             }
         
        },
        logout({commit}){
            const data={};
            data.isLoggedIn = false;
            commit("setUserData",data);
            router.push("/");
        }
    },
    getters:{
        user(state){
            return state;
        }
    },
}