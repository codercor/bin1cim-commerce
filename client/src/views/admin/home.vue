<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Son 7 Günlük Veriler</h2>
      </v-col>
      <v-col cols="12" md="4">
        <OrderCount
          :value="last7Days.orderCounts"
          color="green"
          text="Sipariş Sayısı"
        />
      </v-col>
      <v-col cols="12" md="4">
        <OrderCount
          :value="last7Days.orderPrices"
          color="primary"
          text="Sipariş Ücreti"
        />
      </v-col>
      <v-col cols="12" md="4">
        <OrderCount
          :value="last7Days.orderDelivered"
          color="purple"
          text="Teslim Edilen Sipariş"
        />
      </v-col>
     <v-col cols="12" width="100%">
         <v-divider></v-divider>
     </v-col>
     <v-col cols="12">
         <OrderCrud/>
     </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderCount from "@/components/admin/charts/OrderCount";
import OrderCrud from "@/components/admin/OrderCrud"
export default {
  components: { OrderCount,OrderCrud },
  data() {
    return {
      last7Days: {
        orderCounts: [34, 65, 754, 65, 34, 65, 34],
        orderPrices: [4, 65, 654, 23, 54, 6, 8],
        orderDelivered: [6, 56, 99, 12, 11, 5, 65],
      },
    };
  },
};
</script>

<style>
</style>