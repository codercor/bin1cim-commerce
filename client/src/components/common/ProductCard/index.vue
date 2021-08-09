<template>
  <v-card class="mx-auto" max-width="400">
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(item, i) in product.images"
        :key="i"
        :src="'http://localhost:3000/images/' + item"
      ></v-carousel-item>
    </v-carousel>
    <v-card-title> {{ product.name }} </v-card-title>

    <v-card-subtitle class="pb-0"> Açıklama </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ product.description }}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0 pt-0"> Fiyat Aralıkları </v-card-subtitle>
    <v-card-text class="text--primary">
      <div>
        1 - {{ unitAmounts[0]}} adet -
        {{ unitPrices[0] }}₺
        <v-chip
          v-if="
            amount > 0 && amount < unitAmounts[0]
          "
          color="green white--text"
        >
          <v-icon>mdi-check</v-icon>
        </v-chip>
      </div>
      <div>
        {{ unitAmounts[0] }}-{{
         unitAmounts[1]
        }}
        adet - {{unitPrices[1]}} ₺<v-chip
          v-if="
            amount < unitAmounts[1] && amount >= unitAmounts[0]
          "
          color="green white--text"
        >
          <v-icon>mdi-check</v-icon>
        </v-chip>
      </div>
      <div>
        {{ unitAmounts[1] }}-{{
          unitAmounts[2]
        }}
        adet - {{unitPrices[2]}}₺
        <v-chip v-if="amount <= unitAmounts[2] && amount >= unitAmounts[1]" color="green white--text">
          <v-icon>mdi-check</v-icon>
        </v-chip>
      </div>
      <div>
        {{ product.prices[2] | getAmount }} adetten fazlası için iletişime geçin
        <v-btn icon> <v-icon>mdi-whatsapp</v-icon> </v-btn>
        <v-btn icon> <v-icon>mdi-phone</v-icon></v-btn>
      </div>
    </v-card-text>
    <v-card-text>
      <div>
        <v-row>
          <v-col cols="6">
            <v-text-field
              min="1"
              :max="Number(Object.keys(product.prices[2])[0])"
              v-model="amount"
              type="number"
            />
          </v-col>
          <v-col cols="2">
            <div class="pt-5">
              <v-icon>mdi-close</v-icon>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="pt-4">
              <span
                v-if="
                  amount > 0 &&
                  amount < Number(Object.keys(product.prices[0])[0])
                "
                class="subtitle-1"
              >
                {{ product.prices[0] | getPrice }}
              </span>
              <span
                v-if="
                  amount < Number(Object.keys(product.prices[1])[0]) &&
                  amount >= 200
                "
                class="subtitle-1"
              >
                {{ product.prices[1] | getPrice }}
              </span>
              <span v-if="amount <= 1000 && amount >= 500" class="subtitle-1">
                {{ product.prices[2] | getPrice }}
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h3>
              Tutar {{ unitPrice * amount }}₺
            </h3>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="
          amount > Number(Object.keys(product.prices[2])[0]) || amount < 1
        "
        @click="addToCart()" 
        color="orange"
        text
      >
        <v-icon left> mdi-cart</v-icon> Sepete Ekle
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["product"],
  filters: {
    getAmount(data) {
      return Object.keys(data)[0];
    },
    getPrice(data) {
      return Object.values(data)[0];
    },
  },
  computed: {
    unitPrice: function () {
      const {amount,product} = this;
      if (amount > 0 && amount < Number(Object.keys(product.prices[0])[0])) {
       
        return Number(Object.values(product.prices[0])[0]);
      } else if (
        amount >= Number(Object.keys(product.prices[0])[0]) &&
        amount < Number(Object.keys(product.prices[1])[0])
      ) {
        return Number(Object.values(product.prices[1])[0]);
      } else if (
        amount >= Number(Object.keys(this.product.prices[1])[0]) &&
        amount <= Number(Object.keys(this.product.prices[2])[0])
      ) {
             return Number(Object.values(product.prices[2])[0]);
      }else{
        return null;
      }
    },
    unitPrices: function () {
      return this.product.prices.map((price)=>{
        return Number(Object.values(price)[0]);
      })
    },
    unitAmounts: function () {
      return this.product.prices.map((price)=>{ 
        return Number(Object.keys(price)[0]);
      })
    },
    totalPrice(){
      return this.unitPrice * this.amount;
    }
  },
  data() {
    return {
      amount: 1,
    };
  },
  watch: {
    amount() {
      console.log(this.unitPrice);
    },
  },
  methods: {
    addToCart(){
      console.log("selami");
      let newOrderDetail = {
        productId: this.product.id,
        amount: this.amount,
        price: this.totalPrice,
      };
      this.$store.commit('addToCart',newOrderDetail);
    }
  }
};
</script>

<style>
</style>