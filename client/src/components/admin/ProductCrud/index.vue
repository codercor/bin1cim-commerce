<template>
  <div>
  <v-stepper class="mb-4" v-model="step" vertical>
    <v-card-text>
      <h2>Ürün Ekle</h2>
    </v-card-text>
    <v-divider></v-divider>
    <v-stepper-step :complete="step > 1" step="1">
      Ürün Bilgilerini Girin
      <small>İstenilen boşlukları eksiksik doldurun</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card>
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="product.name"
              label="Ürün Adı"
              required
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="product.description"
              label="Ürün Açıklaması"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn color="primary" @click="step = 2"> Devam </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-stepper-content>

    <v-stepper-step :complete="step > 2" step="2">
      Fiyatlandırma Ayarını Yapın
      <small>Adet aralıklarını ve fiyat bilgilerini girin</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <PricesInput :passPrices="passPrices" />
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="step = 3"> Devam </v-btn>
          <v-btn text @click="step = 1"> Geri </v-btn>
        </v-col>
      </v-row>
    </v-stepper-content>

    <v-stepper-step :complete="step > 3" step="3">
      Ürün Resimlerini Seçin
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card>
        <ImageSelect :passImages="passImages" />
        <v-row>
          <v-col>
            <v-btn color="primary" @click="step = 4"> Devam </v-btn>
            <v-btn text @click="step = 2"> Geri </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-stepper-content>

    <v-stepper-step step="4"> Tamamla </v-stepper-step>
    <v-stepper-content step="4">
      <h3>Ürün oluşturuldu kaydedebilirsiniz.</h3>
      <v-btn color="success" @click="saveProduct"> Kaydet </v-btn>
      <v-btn @click="step = 3" text> Geri </v-btn>
    </v-stepper-content>
  </v-stepper>
  <v-divider></v-divider>
  <v-card class="mt-4">
    <v-card-title>
      <h3>Ürünler</h3>
    </v-card-title>
    <ProductsTable/>
  </v-card>
  
  </div>
</template>
<script>
import ImageSelect from "./ImageSelect.vue";
import PricesInput from "./PricesInput.vue";
import { mapActions } from "vuex";
import ProductsTable from './ProductsTable.vue';
export default {
  components: { PricesInput, ImageSelect, ProductsTable },
  data() {
    return {
      step: 1,
      product: {
        name: "",
        description: "",
        images:[],
        prices:[]
      },
      defaultProduct: {
        name: "",
        description: "",
        images:[],
        prices:[]
      }
    };
  },
  methods: {
    async saveProduct() {
     const {status} = await this.addProduct(this.product);
     if(status) 
     {
         this.$vs.notification({
            title: 'Ürün başarıyla eklendi 👉',
            text: 'Eklenilen ürünün detaylarını görmek için ürünler sayfasına gidin.',
            color:"success",
            progress:"auto",
            position:"top-right",
          })
          this.product = this.defaultProduct;
          this.step = 1;
          this.getProducts({page:1,keyword:""});

     }
     else {
        this.$vs.notification({
            title: 'Ürün Eklenemedi',
            color:"danger",
            progress:"auto",
            position:"top-right",
          })
     }

    },
    passImages(images) {
      this.product.images = images;
    },
    passPrices(prices) {
      this.product.prices = prices;
    },
    ...mapActions("admin",["addProduct","getProducts"]),
  },
};
</script>