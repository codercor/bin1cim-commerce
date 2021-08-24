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
            <v-list-item-subtitle>Satıcı</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item exact to="/panel/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Anasayfa</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/panel/orders">
            <v-list-item-icon>
              <v-icon>mdi-cart-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Siparişlerim</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
</template>