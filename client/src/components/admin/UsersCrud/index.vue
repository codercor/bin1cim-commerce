<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="yellow darken-3"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
<v-tab href="#usersTable">
        Kayıtlı Kurumlar
        <v-icon>mdi-office-building</v-icon>
      </v-tab>
      <v-tab href="#addUser">
        Yeni Kayıt
        <v-icon>mdi-plus</v-icon>
      </v-tab>

      
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        value="addUser"
      >
        <AddUser/>
      </v-tab-item>
       <v-tab-item
        value="usersTable"
      >
         <UsersTable/>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import AddUser from './AddUser.vue'
import UsersTable from './UsersTable.vue';
export default {
  components: { UsersTable,AddUser },  
  data(){
    return {
      tab:"usersTable"
    }
  }  
};
</script>