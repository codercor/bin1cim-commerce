import Vue from 'vue'
import VueRouter from 'vue-router'



import store from '@/store'

Vue.use(VueRouter)


const panelRoutes = [
  {
    path: '/',
    name: 'Panel Home',
    component: () => import('../views/panel/home.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/panel/cart.vue'),
  },  {
    path: '/order',
    name: 'Orders',
    component: () => import('../views/panel/orders.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/panel/settings.vue'),
  },
];
const adminRoutes = [
  {
    path: '/',
    name: 'Admin',
    component: () => import('../views/admin/home.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/admin/history.vue')
  },
  {
    path: '/incomings',
    name: 'Incomings',
    component: () => import('../views/admin/incomings.vue')
  },  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/admin/users.vue')
  },

]

panelRoutes.forEach((r)=>{r.meta={auth:true}});
adminRoutes.forEach((r)=>{r.meta={admin:true}});

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/panel',
    component: () => import('../views/panel'),
    children: [...panelRoutes],
    
  },
  {
    path: '/admin',
    component: () => import('../views/admin'),
    children: [...adminRoutes]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.admin) {
    const { token, isLoggedIn, role } = store.getters.user;
    console.log(role,999999999);
    if (token && isLoggedIn && role == 1) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const { token, isLoggedIn, role } = store.getters.user;
    if (token && isLoggedIn && role != 1) {
      next();
    } else {
      next('/');
    }
  } else {
    const { token, isLoggedIn,role } = store.getters.user;
    if(to.name == "Login" && token && isLoggedIn && role != 1) next("/panel");
    else if(to.name == "Login" && token && isLoggedIn && role == 1) next("/admin");
    next();
  }
})



export default router
