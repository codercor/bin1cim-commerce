<template>
  <v-container>
    <v-card>
      <v-card-title>
        Siparişleriniz
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Ara"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :single-expand="true"
        :expanded.sync="expanded"
        show-expand
      >
        <template  v-slot:expanded-item="{ item }">
         <div style="position:absolute">
          <OrderDetails :items="item.orderDetails" />
         </div>

        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/services/axios";
import { mapGetters } from "vuex";
import OrderDetails from '@/components/common/OrderDetails'
export default {
  components: {OrderDetails},
  async mounted() {
    let response = await axios.get("/order");
    console.log(response);
    console.log(response.orders[0].orderDetail);
    //convert order created_at to date format
    response.orders.forEach((element) => {
      element.createdAt = new Date(element.createdAt).toLocaleDateString(
        "TR-tr"
      );
      element.isDone = element.isDone ? "Tamamlandı" : "Beklemede";
      element.isAccepted = element.isAccepted ? "Onaylandı" : "Onay Bekleniyor";
      element.total = element.total + " ₺";
    });
    this.desserts = response.orders;
    this.headers = [
      { text: "Sipariş No", value: "id" },
      { text: "Sipariş Durumu", value: "isDone" },
      { text: "Sipariş Tarihi", value: "createdAt" },
      { text: "Sipariş Onayı", value: "isAccepted" },
      { text: "Ödeme Yöntemi", value: "paymentMethod" },
      { text: "Toplam", value: "total" },
    ];
  },
  computed:{
    ...mapGetters(["user"]),
  },
  data() {
    return {
      search: "",
      headers: [],
      desserts: [],
      expanded: [],
      orderDetails:null
    };
  },
};
</script>

<style>
</style>