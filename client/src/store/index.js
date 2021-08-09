import Vue from 'vue'
import Vuex from 'vuex'

import adminModule from './admin.module'
import userModule from './user.module';
import panelModule from './panel.module';

import createPersistedState from "vuex-persistedstate";
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false })


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin: adminModule,
    user: userModule,
    panel: panelModule,
  },
  plugins: [
    createPersistedState({
      key: "BIN1CIM",
      paths: ['user','panel'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    }),
  ],
})
