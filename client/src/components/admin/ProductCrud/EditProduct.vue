<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field width="100%" label="Ürün Adı" v-model="product.name" />
      </v-col>
      <v-col cols="12">
        <v-textarea label="Label in Textarea" v-model="product.description" />
      </v-col>
      <v-col cols="12">
        <ImageSelect
          :existingImages="product.images"
          :passImages="passImages"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageSelect from "./ImageSelect.vue";
export default {
  components: { ImageSelect },
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
  methods: {
    passImages(images) {
      this.editedProduct.newImages = images;
      console.log(this.editedProduct);
      //TODO 
      //write backend update service
    },
  },
};
</script>

<style>
</style>