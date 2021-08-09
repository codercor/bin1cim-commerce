<template>
  <v-container>
    <v-row>
      <v-col
        sm="6"
        cols="12"
        md="4"
        v-for="product in products"
        :key="product.id"
      >
      <Product :product="product"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Product from './product.vue';

export default {
  data: () => ({}),
  components:{
    Product
  },
  mounted() {
    console.log(this.$route);
  },
  computed: {
    ...mapGetters(["products"]),
  },
  methods: {
    ...mapActions(["getProducts"]),
  },
  async beforeMount() {
    await this.getProducts();
    console.log(this.products);
  },
};
</script>

<style>
</style>