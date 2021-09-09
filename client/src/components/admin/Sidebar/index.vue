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
          <v-list-item-title class="title">Mücahit Matiz</v-list-item-title>
          <v-list-item-subtitle>Admin</v-list-item-subtitle>
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
      </v-list-item-group>
    </v-list>
  </div>
</template>