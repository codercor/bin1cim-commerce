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
        <Product :product="product" />
      </v-col>
    </v-row>
    <infinite-loading @infinite="loadProdutcs"></infinite-loading>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Product from "../../components/common/ProductCard";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  data: () => ({
    page:1
  }),
  components: {
    Product, InfiniteLoading,
  },
  computed: {
    ...mapGetters(["products"]),
  },
  methods: {
    ...mapActions(["getProducts"]),
   loadProdutcs() {
     console.log(this.page);
     this.getProducts(this.page++);
   }
  },
  async beforeMount() {
    await this.getProducts(1);
  },
};
</script>

<style>
</style>