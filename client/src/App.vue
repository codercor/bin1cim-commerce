
<template>
  <v-app id="inspire">
    <v-navigation-drawer :width="drawerWidthBreakpoint" v-if="isUser" v-model="cartDrawer" app right>
      <Cart :toggle="toggleCartDrawer" />
    </v-navigation-drawer>
    <v-navigation-drawer v-if="isUser" app left v-model="menuDrawer">
      <PanelSidebar />
    </v-navigation-drawer>
    <v-navigation-drawer v-if="isAdmin" app left v-model="adminDrawer">
      <AdminSidebar />
    </v-navigation-drawer>
    <v-app-bar color="yellow" app>
      <v-btn icon color="black" @click="menuDrawer = !menuDrawer" v-if="isUser">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn
        icon
        color="black"
        @click="adminDrawer = !adminDrawer"
        v-if="isAdmin"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>bin1cim (beta)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="black" @click="cartDrawer = !cartDrawer" v-if="isUser">
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
import PanelSidebar from "./components/panel/Sidebar/index.vue";
import AdminSidebar from "./components/admin/Sidebar/index.vue";
export default {
  components: { Cart, PanelSidebar, AdminSidebar },
  data: () => ({ cartDrawer: false, menuDrawer: false, adminDrawer: false }),
  methods: {
    toggleCartDrawer() {
      this.cartDrawer = !this.cartDrawer;
    }
  },
  computed: {
    drawerWidthBreakpoint: function () {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "90%";
        case "sm":
          return  "90%";
        case "md":
          return  "35%";
        case "lg":
          return "35%";
        case "xl":
          return "35%";
      }
      return "35%";
    },
    ...mapGetters(["user"]),
    isUser() {
      return this.user.role == 2;
    },
    isAdmin() {
      return this.user.role == 1;
    },
  },
};
</script>