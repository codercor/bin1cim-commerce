import axios from '@/services/axios';
import FormData from 'form-data'
export default {
    state:{
        orderCrud:{
            editedIndex:-1,
            editedItem:{},
            defaultItem:{},
            orders:[],
            headers:[],
        },
        productCrud:{
            editedIndex:-1,
            editedItem:{
                name:"",
                prices:[],
                images:[],
                description:""
            },
            defaultItem:{},
            products:[],
            headers:[],
        },
        userCrud:{
            editedIndex:-1,
            editedItem:{},
            defaultItem:{},
            users:[],
            headers:[],
        },
    },
    mutations:{
        //set products
        setProducts(state,products){
            state.productCrud.products = products;
        },
        //set product name
        setProductName(state,name){
            state.productCrud.editedItem.name = name;
        }
    },
    actions:{
        //get products
        getProducts({commit}){
             axios.get('/product').then(res=>{
                commit('setProducts',res.products);
            });
        },
       async addProduct(c,product){
            let form = new FormData()
            form.append('name',product.name);
            form.append('description',product.description);
            product.uploadImages.forEach(image=>{
                form.append('images[]',image);
            });
            form.append('prices',JSON.stringify(product.prices));
            let res = await axios.post('/product',form,{
                headers: {
                  'accept': 'application/json',
                  'Content-Type': `multipart/form-data;`,
                }
              });
            console.log(res);
            return res;
        }
    },
    getters:{
       products(state){
           state.productCrud.products = state.productCrud.products.map(product=>{
               product.prices = JSON.parse(product.prices);
               product.images = JSON.parse(product.images);
               return product;
           });
           return state.productCrud.products;
       }
    },
    namespaced:true
}