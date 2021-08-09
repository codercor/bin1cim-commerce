
<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-if="false"
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar color="yellow" app>
      <v-app-bar-nav-icon  v-if="false" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>bin1cim (beta)</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: false }),
  }
</script>