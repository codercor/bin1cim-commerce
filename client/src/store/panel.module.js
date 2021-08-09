import axios from '@/services/axios';
//import router from '../router';

export default {
    state: {
        products:[],
    },
    mutations:{
        setProducts(state,products) {
            state.products = products
        }
    },
    actions: {
       async getProducts({commit}){
            const response = await axios.get("/product");
            response.products.forEach(product =>{
                product.images =  eval(product.images);
                product.prices = eval(product.prices)
            })
            commit("setProducts", response.products);
        }
    },
    getters: {
        products(state){
            return state.products;
        }
    },
}