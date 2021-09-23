<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field width="100%" label="Ürün Adı" v-model="product.name" />
      </v-col>
      <v-col cols="12">
        <v-textarea label="Açıklama" rows="2" v-model="product.description" />
      </v-col>
      <v-col cols="12">
        <ImageSelect
          :existingImages="product.images"
          :passImages="passImages"
          :passDeletedImages="passDeletedImages"
        />
      </v-col>
      <v-col cols="12">
        <PricesInput
          :passPrices="passPrices"
          :pricesForUpdate="pricesConverted"
        />
      </v-col>
      <v-col cols="12">
        <vs-button @click="updateProduct" size="xl" width="100%">
          Güncelle
        </vs-button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ImageSelect from "./ImageSelect.vue";
import PricesInput from "./PricesInput.vue";

export default {
  components: { ImageSelect, PricesInput },
  name: "EditProduct",
  props: ["product"],
  data() {
    return {
      editedProduct: {
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        newImages: [],
        deletedImages: [],
        images: this.product.images,
      },
    };
  },
  mounted() {
    console.log(this.product.images);
  },
  computed: {
    pricesConverted() {
      let prices = this.product.prices;
      let a = prices[0];
      let b = prices[1];
      let c = prices[2];
      let amount1 = Object.keys(a)[0];
      let amount2 = Object.keys(b)[0];
      let amount3 = Object.keys(c)[0];
      let price1 = a[amount1];
      let price2 = b[amount2];
      let price3 = c[amount3];
      return {
        amount1,
        amount2,
        amount3,
        price1,
        price2,
        price3,
      };
    },
  },
  methods: {
    ...mapActions("admin",["editProduct","getProducts"]),
    passImages(images) {
      this.editedProduct.newImages = images;
    },
    passDeletedImages(images) {
      this.editedProduct.deletedImages = images;
      console.log(this.editedProduct);
      console.log("OYE");
    },
    passPrices(prices) {
      this.editedProduct.prices = prices;
    },
    async updateProduct() {
      await this.editProduct(this.editedProduct);
         this.$vs.notification({
            title: 'Ürün Güncellendi ',
            text: 'Ürün güncellendi ekranınzdaki veriler güncellendi.',
            color:"warning",
            progress:"auto",
            position:"top-right",
          })
      this.getProducts({page:1,keyword:""});
      this.$emit("closeDialog");
    },
  },
};
</script>

<style>
</style>