import axios from '@/services/axios';
import FormData from 'form-data'
export default {
    state: {
        orderCrud: {
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            orders: [],
            headers: [],
        },
        productCrud: {
            pageLength: 0,
            productPerPage: 6,
            editedIndex: -1,
            editedItem: {
                name: "",
                prices: [],
                images: [],
                description: ""
            },
            defaultItem: {},
            products: [],
            headers: [],
        },
        userCrud: {
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            users: [],
            headers: [],
        },
    },
    mutations: {
        //set products
        setProducts(state, products) {
            state.productCrud.products = products;
        },
        //set product name
        setProductName(state, name) {
            state.productCrud.editedItem.name = name;
        },
        //set page length
        setPageLength(state, length) {
            state.productCrud.pageLength = length;
        }
    },
    actions: {
        //get products
        async getProducts({ commit, state }, {page,keyword}) {
            if(keyword==null) keyword = "";
            try {
                const response = await axios.get(`/product?page=${page}&keyword=${keyword}`);
                console.log(response);
                response.products.forEach(product => {
                   
                    product.images = eval(product.images);
                    
                    product.prices = eval(product.prices)
                })
                commit("setProducts", response.products);
                commit("setPageLength", Math.ceil(response.length / state.productPerPage));

            } catch (e) {
                commit("setProducts", [])
                commit("setPageLength", 0)
                console.log(e);
            }
        },
        async addProduct(c, product) {
            let form = new FormData()
            form.append('name', product.name);
            form.append('description', product.description);
            product.images.forEach(image => {
                form.append('images[]', image);
            });
            form.append('prices', JSON.stringify(product.prices));
            let res = await axios.post('/product', form, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data;`,
                }
            });
            console.log(res);
            return res;
        }
    },
    getters: {
        products(state) {
            return state.productCrud.products;
        }
    },
    namespaced: true
}