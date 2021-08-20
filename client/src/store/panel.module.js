import axios from '@/services/axios';
//import router from '../router';

export default {
    state: {
        products: [],
        pageLength: 0,
        cart: [],
        orders: [],
        productPerPage: 6

    },
    mutations: {
        addToCart(state, payload) {
            state.cart.push(payload)
        },
        deleteItemCart(state, index) {
            state.cart.splice(index, 1);
        },
        setCart(state, cart) {
            state.cart = cart
        },
        addToProducts(state, products) {
            console.log("şimdi ekleme kodu çalışacak");
            state.products = [...state.products, ...products];
            console.log("çalışmıyor mu acaba", state.products);
        },
        setProducts(state, products) {
            state.products = products;
        },
        setPageLength(state, pageLength) {
            state.pageLength = pageLength;
        }

    },
    actions: {
        async getProducts({ commit, state }, {page,keyword}) {
            if(keyword==null) keyword = "";
            try {
                const response = await axios.get(`/product?page=${page}&keyword=${keyword}`);
                console.log(response);
                response.products.forEach(product => {
                    product.images = eval(product.images);
                    product.prices = eval(product.prices)
                })
                console.log("şimdi gelen veri ile çalıştırılıp eklenecek", response.products);
                commit("setProducts", response.products);
                commit("setPageLength", Math.ceil(response.length / state.productPerPage));

            } catch (e) {
                commit("setProducts", [])
                commit("setPageLength", 0)
                console.log(e);
            }
        },
        unloadProducts({ commit }) {
            commit("setProducts", []);
        },
        async submitOrder({ state }, payload) {
            let order = {
                "paymentMethod": payload.paymentMethod,
                "isDone": false,
                "isAccepted": false,
                "isPaid": false,
                "total": payload.totalPrice,
                orderDetails: [...state.cart]
            }
            const response = await axios.post("/order", { order });

            return response;
        },
        async getOneProduct(store, id) {
            const response = await axios.get(`/product/${id}`);
            response.product.images = eval(response.product.images);
            response.product.prices = eval(response.product.prices)
            return response.product
        },
        deleteItemCart({ commit }, index) {
            commit("deleteItemCart", index);
        }
    },
    getters: {
        products(state) {
            return state.products;
        },

        cart(state) {
            return state.cart;
        },
        pageLength(state) {
            return state.pageLength;
        },
        productPerPage(state) {
            return state.productPerPage;
        }
    },
}