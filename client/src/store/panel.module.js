import axios from '@/services/axios';
//import router from '../router';

export default {
    state: {
        products: [],
        cart: [],
        orders: []

    },
    mutations: {
        setProducts(state, products) {
            state.products = [...state.products, ...products]
        },
        addToCart(state, payload) {
            state.cart.push(payload)
        },
        deleteItemCart(state, index) {
            state.cart.splice(index, 1);
        },
        setCart(state, cart) {
            state.cart = cart
        }

    },
    actions: {
        async getProducts({ commit }, page = 1) {
            const response = await axios.get("/product?page=" + page);
            console.log(response.products);
            response.products.forEach(product => {
                product.images = eval(product.images);
                product.prices = eval(product.prices)
            })
            commit("setProducts", response.products);
            console.log("çalıştı");
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
        }
    },
}