
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="isUser" v-model="menuDrawer" app right>
      <Cart />
    </v-navigation-drawer>
    <v-navigation-drawer v-if="isUser" app left v-model="cartDrawer">
     <SideMenu/>
    </v-navigation-drawer>
    <v-app-bar color="yellow" app>
      <v-btn icon color="black" @click="cartDrawer = !cartDrawer" v-if="isUser">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>bin1cim (beta)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="black" @click="menuDrawer = !menuDrawer" v-if="isUser">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Cart from "./components/panel/Cart";
import SideMenu from './components/common/SideMenu'
export default {
  components: { Cart,SideMenu },
  data: () => ({ cartDrawer: false, menuDrawer: false }),
  mounted() {
    console.log(this.user);
  },
  computed: {
    ...mapGetters(["user"]),
    isUser() {
      return this.user.role == 2;
    },
  },
};
</script>