
<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-if="isUser"
      v-model="drawer"
      app
      right
    >
    <Cart/>
    </v-navigation-drawer>

    <v-app-bar color="yellow" app>
      

      <v-toolbar-title>bin1cim (beta)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="black" v-if="isUser" @click="drawer = !drawer">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Cart from './components/panel/Cart';

  export default {
    components:{Cart},
    data: () => ({ drawer: false }),
    mounted () {
      console.log(this.user);
    },
    computed: {
      ...mapGetters(["user"]),
      isUser () {
        return this.user.role == 2;
      }
    }
  }
</script>