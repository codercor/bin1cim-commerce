<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Kullanıcı Ekle  </v-card-title>
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
            hint="Yetkilinin ismi Örn:Selami"
            autocomplete="disable"
            required
            label="Ad"
            v-model="user.name"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            hint="Yetkilinin soyadı Örn:Şahin"
            required
            autocomplete="disable"
            label="Soyad"
            v-model="user.lastName"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            hint="Telefonu 54XXXXXXX"
            required
            autocomplete="disable"
            label="Telefon"
            v-model="user.phone"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            hint="Bu alan tek kelime olmalı (boşluksuz) Örn: bin1cim-ankara"
            required
            label="Kullanıcı Adı"
            v-model="user.username"
            autocomplete="disable"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field hint="Şifre işte" required label="Şifre" v-model="user.password" />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field hint="Kurumun tam adı" required label="Kurum adı" v-model="user.companyName" />
        </v-col>
        <v-col md="6" cols="12">
          <v-select
            label="Rolü"
            required
            :items="[
              { text: 'Yönetici', value: '1' },
              { text: 'Kurum', value: '2' },
            ]"
            v-model="user.role"
          />
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field name="adres" hint="Adres Örn: 'Camiden düz git solda'" autocomplete="disable" required label="Adres" v-model="user.address" />
        </v-col>
        <v-col
        
         md="6" cols="12">
          <v-btn @click="_addUser" :disabled="!basicValidate" class="green white--text" width="100%"
            >Ekle</v-btn
          >
        </v-col>
        <v-col md="6" cols="12">
          <v-btn
            @click="user = defaultUser"
            class="red white--text"
            width="100%"
            >İptal</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar
      timeout="1500"
      v-model="snackbar"
      :color="snackbarColor"
      center
      top
    >
      <v-icon>{{ snackbarIcon }}</v-icon> {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Tamam </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
    computed:{
          basicValidate(){
              const { name, lastName,phone,password,username,companyName,role,address } = this.user;
              return  name.length > 0 && lastName.length > 0 && phone.length > 0 && password.length > 0 && username.length > 0 && companyName.length > 0 && role.length > 0 && address.length > 0;
          }
    },
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      snackbarIcon: "",
    
      user: {
        name: "",
        lastName: "",
        phone: "",
        username: "",
        password: "",
        companyName: "",
        role: "2",
        address: "",
      },
      defaultUser: {
        name: "",
        lastName: "",
        phone: "",
        username: "",
        password: "",
        companyName: "",
        role: "2",
        address: "",
      },
    };
  },
  methods: {
    ...mapActions("admin", ["addUser", "getUsers"]),
    async _addUser() {
      try {
        let status = await this.addUser(this.user);
        if (status.status) {
          //notify
          this.snackbarText = "Kullanıcı başarıyla eklendi.";
          this.snackbarColor = "purple";
          this.snackbarIcon = "mdi-office-building";
          this.snackbar = true;
        } else {
          //bad notify
          this.snackbarText = "Kullanıcı eklenemedi.";
          this.snackbarColor = "red";
          this.snackbarIcon = "mdi-close-circle-outline";
          this.snackbar = true;
        }
      } catch (error) {
        this.snackbarText = "Kullanıcı eklenemedi.";
        this.snackbarColor = "red";
        this.snackbarIcon = "mdi-close-circle-outline";
        this.snackbar = true;
      }
      //reset
      this.$root.$emit("refreshUsers");
    },
    clear() {
      this.user = this.defaultUser;
    },
  },
};
</script>