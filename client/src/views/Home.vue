<template>
  <v-container>
    <v-row>
        <v-col md=6 offset-md="3" sm=12>
           <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center"> 
            <div class="display-1 mb-3">
              <v-icon class="mr-2" large="large">mdi-cart</v-icon> İşletme Girişi
            </div>
            <v-card dark>
              <v-card-text>
                <div class="subheading">
                  <template>İşletmeniz için size verilen giriş bilgilerini giriniz</template>
                </div>
                <v-form>
                  <v-text-field  v-model="username"  prepend-icon="mdi-login" label="Kullanıcı adı" type="email"></v-text-field>
                  <v-text-field  v-model="password" prepend-icon="mdi-lock" label="Şifre" type="password"></v-text-field>
                  <v-btn color="yellow black--text" :disabled="!(username&&password)"  @click.prevent="login({username,password})" block="block" type="submit">Giriş</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        </v-col>
    </v-row>
    
  </v-container>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'

export default {
 data(){
   return {
     username:null,
     password:null
   }
 },
 computed:{
   ...mapGetters(['user']),
 },
 methods:{
   ...mapActions(['login'])
 }
};
</script>

<style>
</style>