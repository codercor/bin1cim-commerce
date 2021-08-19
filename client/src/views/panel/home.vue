<template>
  <v-container>
    <v-row>
      <v-col sm="12"
        cols="12"
        md="4"
        offset-md="4"
        >
        <v-text-field v-model="searchKeyword" @keydown="search" filled dense rounded label="Ürün Ara... #kod, isim " append-icon="mdi-magnify" clearable > </v-text-field>
      </v-col>
    </v-row>
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
    <v-col cols="8">
      <v-container class="max-width">
        <v-pagination v-model="page" class="my-4" :length="pageLength"></v-pagination>
      </v-container>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Product from "../../components/common/ProductCard";
export default {
  data: () => ({
    page: 1,
    searchKeyword:""
  }),
  components: {
    Product,
  },
  computed: {
    ...mapGetters(["products","productPerPage","pageLength"]),
  },
  methods: {
    ...mapActions(["getProducts","unloadProducts","searchProduct"]),
    async search(){
      this.page=1;
      if(this.searchKeyword == ""){
        await this.getProducts(this.page);
        return;
      }
      await this.searchProduct({page:this.page,keyword:this.searchKeyword})
    }
  },
  async beforeMount() {
    this.unloadProducts();
    await this.getProducts(this.page);
  },
  watch:{
    page(){
      this.getProducts(this.page);
    }
  }
};
</script>

<style>
</style>