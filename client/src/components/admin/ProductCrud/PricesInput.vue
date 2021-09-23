<template>
  <v-card class="pl-4" elevation="0">
    <v-row>
      <v-col cols="3"> Min </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col cols="3"> Max </v-col>
      <v-col cols="1">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col cols="3"> Fiyat </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field disabled value="0" />
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-icon>mdi-minus</v-icon>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="amount1" />
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-icon>mdi-arrow-right</v-icon>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="price1" append-icon="mdi-currency-try" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field disabled :value="amount1" />
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-icon>mdi-minus</v-icon>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="amount2" />
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-icon>mdi-arrow-right</v-icon>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="price2" append-icon="mdi-currency-try" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field disabled :value="amount2" />
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-icon>mdi-minus</v-icon>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="amount3" />
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-icon>mdi-arrow-right</v-icon>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="price3" append-icon="mdi-currency-try" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    passPrices: Function,
    pricesForUpdate: {
      type: Object,
      default: () => {
        return { amount1: 50, amount2: 100, amount3: 150, price1: 50, price2: 20, price3:15 };
      },
    },
  },
  mounted() {
    this.finishPriceInput();
  },
  data() {
    return {
      amount1: this.pricesForUpdate.amount1,
      amount2: this.pricesForUpdate.amount2,
      amount3: this.pricesForUpdate.amount3,
      price1: this.pricesForUpdate.price1,
      price2: this.pricesForUpdate.price2,
      price3: this.pricesForUpdate.price3,
    };
  },
  computed: {
    prices() {
      let prices = [{}, {}, {}];
      prices[0][`${this.amount1}`] = this.price1;
      prices[1][`${this.amount2}`] = this.price2;
      prices[2][`${this.amount3}`] = this.price3;
      return prices;
    },
  },
  watch: {
    prices() {
      this.finishPriceInput();
    },
  },
  methods: {
    finishPriceInput() {
      console.log(this.prices);
      this.passPrices(this.prices);
    },
  },
};
</script>

<style>
</style>