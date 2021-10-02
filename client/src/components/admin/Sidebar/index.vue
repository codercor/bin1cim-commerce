<template>
  <div>
    <v-card class="mx-auto" max-width="434" tile>
      <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      ></v-img>
      <v-col>
        <v-avatar size="100" style="position: absolute; top: 50px">
          <v-img
            src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-list-item color="rgba(0, 0, 0, .4)">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.name }} {{ user.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.role | roleFilter }} {{ user.companyName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item exact to="/admin/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Anasayfa</v-list-item-title>
        </v-list-item>

        <v-list-item exact to="/admin/products">
          <v-list-item-icon>
            <v-icon>mdi-cart-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Ürünler</v-list-item-title>
        </v-list-item>
        <v-list-item exact to="/admin/orders">
          <v-list-item-icon>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Siparişler</v-list-item-title>
        </v-list-item>
        <v-list-item exact to="/admin/users">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Kullanıcılar</v-list-item-title>
        </v-list-item>
        <v-list-item exact to="/admin/settings">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Ayarlar</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout" class="bg-neon">
         
            <v-icon class="neon-text mr-5">mdi-door</v-icon>
            <span class="neon-text">Çıkıs</span> 
           
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {};
  },
  filters: {
    roleFilter(role) {
      if (role == 1) {
        return "Yönetici";
      } else if (role == 2) {
        return "Kurum";
      }
    },
  },
  methods:{
    ...mapActions(["logout"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Vampiro+One&display=swap');
.bg-neon{
  background-color: #222222;
  background: repeating-linear-gradient(
      45deg,
      #2b2b2b 0%,
      #2b2b2b 10%,
      #222222 0%,
      #222222 50%
    )
    0 / 15px 15px;
}
.neon-text {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 0;
  margin-top: 0;
  line-height: 1;
  text-decoration: none;
  color: #fff;
  font-family: Vampiro One;
  animation: neon6 .1s ease-in-out infinite alternate;
}
@keyframes neon6 {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de,
      0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de,
      0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
  }
}
</style>