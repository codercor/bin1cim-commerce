import axios from '@/services/axios';
import FormData from 'form-data'
export default {
    state: {
        orderCrud: {
            pageLength: 0,
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
            pageLength: 0,
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            users: [],
            headers: [],
        },
    },
    mutations: {
        //####### PRODUCTS BEGIN #######//
        //set products
        setProducts(state, products) {
            state.productCrud.products = products;
        },
        //set edited product name
        setProductName(state, name) {
            state.productCrud.editedItem.name = name;
        },
        //set product page length
        setProductsPageLength(state, length) {
            state.productCrud.pageLength = length;
        },
        //####### PRODUCTS END #######//
        //####### ORDERS BEGIN #######//
        setOrders(state, orders) {
            state.orderCrud.orders = orders;
        },
        setOrdersPageLength(state, length) {
            state.orderCrud.pageLength = length;
        },
        //####### ORDERS END #######//
        //####### USERS BEGIN #######//
        setUsers(state, users) {
            state.userCrud.users = users;
        },
        setUsersPageLength(state, length) {
            state.userCrud.pageLength = length;
        }
    },
    actions: {
        //####### PRODUCTS BEGIN #######//
        async getProducts({ commit }, { page, keyword, perPage }) {
            if (keyword == null) keyword = "";
            try {
                const response = await axios.get(`/product?page=${page}&keyword=${keyword}&perPage=${perPage}`);
                console.log(response);
                response.products.forEach(product => {

                    product.images = eval(product.images);

                    product.prices = eval(product.prices)
                })
                commit("setProducts", response.products);
                commit("setProductsPageLength", Math.ceil(response.length / perPage));

            } catch (e) {
                commit("setProducts", [])
                commit("setProductsPageLength", 0)
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
        },
        async editProduct(c, product) {
            console.log(product, 88);
            let form = new FormData()
            form.append('name', product.name);
            form.append('description', product.description);
            product.newImages.forEach(image => {
                form.append('newimages[]', image);
            });
            form.append('images', JSON.stringify(product.images));
            form.append('deletedImages', JSON.stringify(product.deletedImages));
            form.append('prices', JSON.stringify(product.prices));
            let res = await axios.put('/product/' + product.id, form, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data;`,
                }
            });
            console.log(res);
            return res;
        },
        async deleteProductRequest(c, id) {
            let res = await axios.delete('/product/' + id);
            console.log(res);
            return res;
        },
        //####### PRODUCTS END #######//
        //####### ORDERS BEGIN #######//
        async getOrders({ commit }, { page, userId, perPage }) {
            if (userId == null) userId = -1;
            try {
                console.log(page, userId, perPage);
                let url = `/order?page=${page}&userId=${userId}&perPage=${perPage}`;
                console.log(url);
                const response = await axios.get(url);
                console.log(response);
                commit("setOrders", response.orders);
                commit("setOrdersPageLength", Math.ceil(response.length / perPage));
                console.log(Math.ceil(response.length / perPage));

            } catch (e) {
                commit("setOrders", [])
                commit("setOrdersPageLength", 0)
                console.log(e);
            }
        },
        async updateOrder(c, order) {
            let res = await axios.put('/order', { order });
            console.log(res);
            return res;
        },
        async deleteOrder(c, id) {
            let res = await axios.delete('/order/' + id);
            console.log(res);
            return res;
        },
        //####### ORDERS END #######//
        //####### USERS BEGIN #######//
        async getUsers({ commit }, { page, companyName, perPage }) {
            try {
                if (!companyName) companyName = "";
                const response = await axios.get(`/user?page=${page}&perPage=${perPage}&companyName=${companyName}`);
                console.log(response);
                commit("setUsers", response.users);
                commit("setUsersPageLength", Math.ceil(response.length / perPage));

            } catch (e) {
                commit("setUsers", [])
                commit("setUsersPageLength", 0)
                console.log(e);
            }
        },
        async addUser(c, user) {
            //add user with json
            let res = await axios.post('/user', user);
            return res;
        },
        async updateUser(c, user) {
            //edit user with json
            console.log("####",user);
            user.createdAt = new Date(Date.now());
            let res = await axios.put('/user', { user });
            console.log(res);
            return res;
        },
        async deleteUser(c, id) {
            //delete user with id
            let res = await axios.delete('/user/' + id);
            console.log(res);
            return res;
        }
        //####### USERS END #######//
    },
    getters: {
        products(state) {
            return state.productCrud.products;
        },
        productsPageLength(state) {
            return state.productCrud.pageLength;
        },
        orders(state) {
            return state.orderCrud.orders;
        },
        ordersPageLength(state) {
            return state.orderCrud.pageLength;
        },
        users(state) {
            return state.userCrud.users;
        },
        usersPageLength(state) {
            return state.userCrud.pageLength;
        }
    },
    namespaced: true
}