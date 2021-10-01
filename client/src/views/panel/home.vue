<template>
  <v-container>
    <v-row>
      <v-col sm="12" cols="12" md="4" offset-md="4">
        <v-text-field
          v-model="keyword"
          filled
          dense
          rounded
          label="Ürün Ara..."
          append-icon="mdi-magnify"
          clearable
        >
        </v-text-field>
      </v-col>
    </v-row>
      <v-row>
      <v-col offset="11" cols="1">
     <v-select v-model="perPage"  hint="Göster" persistent-hint  :items="perPages" />
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
        <v-pagination
          v-model="page"
          class="my-4"
          :length="pageLength"
        ></v-pagination>
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
    keyword: "",
    perPages:[3,6,9,12,15],
    perPage:6
  }),
  components: {
    Product,
  },
  computed: {
    ...mapGetters(["products", "productPerPage", "pageLength"]),
  },
  methods: {
    ...mapActions(["getProducts", "unloadProducts", "searchProduct"]),
    async search() {
      this.page = 1;
      let { keyword,page,perPage } = this;
      await this.getProducts({
        page,
        keyword,
        perPage
      });
    },
    async refreshProducts(){
      let { keyword,page,perPage } = this;
      await this.getProducts({
        page,
        keyword,
        perPage
      });
    }
  },
  async beforeMount() {
    this.unloadProducts();
    let { page, keyword,perPage } = this;
    await this.getProducts({ page, keyword,perPage });
  },
  watch: {
    page() {
     this.refreshProducts()
    },
    perPage() {
     this.refreshProducts()
    },
    keyword(){
      this.search();
    }
  },
};
</script>

<style>
</style>