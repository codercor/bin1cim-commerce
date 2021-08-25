<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="500"
    class="elevation-10 "
  ></v-data-table>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      desserts: this.items,
      headers: [
        {
          text: "Ürün No",
          value: "productId",
        },
        { text: "Fiyat", value: "price" },
        { text: "Miktar", value: "amount" },
      ],
    };
  },
  mounted() {
    console.log(this.items);
  },
};
</script>

<style>
</style>