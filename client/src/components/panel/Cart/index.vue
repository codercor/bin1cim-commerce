<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Sepetiniz</h1>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" v-if="cart.length < 1">
        <h3>Sepette hiç ürün yok malesef...</h3>
      </v-col>
      <v-col v-if="cart.length > 0" class="justify-center">
        <v-row v-if="isLoading" justify="center">
          <v-progress-circular
            :width="3"
            color="green"
            indeterminate
          ></v-progress-circular>
        </v-row>

        <v-list v-if="!isLoading">
          <template v-for="(item, i) in cartItems">
            <v-card shaped :key="'card-item-' + item.id + generatedId()">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :src="'http://localhost:3000/images/' + item.images[0]"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Xiomi Mi 10</v-list-item-title>

                  <v-list-item-subtitle>
                    50 adet * 1000₺ = 50000₺
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="deleteItemCart(i)" icon>
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <p></p>
              </v-list-item>
            </v-card>
            <v-divider
              class="mb-3"
              :key="'divider-' + item.productId + generatedId()"
              inset
            />
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3 class="overline">Toplam: 60000$</h3>
      </v-col>
      <v-col cols="4">
        <v-btn @click="submitTheOrder" :disabled="cart.length < 1" class="w-100" color="primary"
          >Sepeti Onayla</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="orderDialog.show" hide-overlay persistent width="300">
      <v-card v-if="orderDialog.loading" color="primary" dark>
        <v-card-text>
          Siparişiniz Alınıyor
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
      <v-card color="green "  class="pt-4" v-if="!orderDialog.loading">
        <v-card-text class="white--text">
          <v-icon class="white--text"> mdi-check</v-icon> Siparişiniz Başarıyla Alındı
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { v4 } from "uuid";
export default {
  data() {
    return {
      cartItems: [],
      isLoading: true,
      orderDialog: {
        show: false,
        loading: false,
      },
    };
  },
  mounted() {
    this.makeCartList();
  },
  computed: {
    ...mapGetters(["cart"]),
    totalPrice() {
      let totalPrice = 0;
      this.cart.forEach((item) => (totalPrice += item.price));
      return totalPrice;
    },
  },
  methods: {
    generatedId() {
      return v4();
    },
    ...mapActions(["getOneProduct", "deleteItemCart", "submitOrder"]),
    async makeCartList() {
      if (this.cart.length > 0) {
        console.log("çalıştı");
        this.isLoading = true;
        this.cartItems = [];
        for (let i = 0; i < this.cart.length; i++) {
          let item = await this.getOneProduct(this.cart[i].productId);
          this.cartItems.push(item);
        }
        this.isLoading = false;
        // console.log(this.cartItems);
      }
    },
    async submitTheOrder() {
      this.orderDialog.show = true;
      this.orderDialog.loading = true;

      let data = await this.submitOrder({
        paymentMethod: "card",
        totalPrice: this.totalPrice,
      });
      setTimeout(() => {
        if (data.status) {
          this.$store.commit("setCart", []);
        }
        this.orderDialog.loading = false;
      }, 1000);
      setTimeout(() => {
        this.orderDialog.show = false;
      }, 2000);
      
    },
  },
  watch: {
    cart: async function () {
      this.makeCartList();
    },
  },
};
</script>

<style>
</style>