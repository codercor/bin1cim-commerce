<template>
  <v-stepper v-model="priceStep">
    <v-stepper-header>
      <v-stepper-step :complete="priceStep > 1" step="1"> Adetler </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="priceStep > 2" step="2"> Fiyatlar </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="priceStep == 3" step="3"> Sonuç </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card elevation="0" class="mb-12" color="grey lighten-4">
          <v-card-title>Önce Miktarları Girin...</v-card-title>
          <v-row>
            <v-col offset="2" cols="4">
              <v-text-field disabled value="0" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="amount1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col offset="2" cols="4">
              <v-text-field disabled :value="amount1" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="amount2" />
            </v-col>
          </v-row>
          <v-row>
            <v-col offset="2" cols="4">
              <v-text-field disabled :value="amount2" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="amount3" />
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="setPriceStep(2)"> Devamke </v-btn>
      </v-stepper-content>

      <v-stepper-content elevation="0" step="2">
        <v-card elevation="0" class="mb-12" color="grey lighten-5">
          <v-row>
            <v-col offset="2" class="pt-10" cols="4">
              <span> 0 </span> - <span> {{ amount1 }} </span>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="price1" />
            </v-col>
          </v-row>
          <v-row>
            <v-col offset="2" cols="4">
              <span> {{ amount1 }} </span> - <span> {{ amount2 }} </span>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="price2" />
            </v-col>
          </v-row>
          <v-row>
            <v-col offset="2" cols="4">
              <span> {{ amount2 }} </span> - <span> {{ amount3 }} </span>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="price3" />
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="setPriceStep(3)"> Dewamke </v-btn>

        <v-btn @click="setPriceStep(1)" text> Geri </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          elevation="0"
        >
          <v-row>
            <v-col cols="12">
              <v-list dense outlined>
                <v-list-item class="green lighten-3"> 0 - {{ amount1 }} : {{ price1 }}$ </v-list-item>
                <v-list-item class="green lighten-2"> {{ amount1 }} - {{ amount2 }} : {{ price2 }}$ </v-list-item>
                <v-list-item class="green lighten-1"> {{ amount2 }} - {{ amount3 }} : {{ price3 }}$ </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>

        <v-btn text @click="setPriceStep(2)"> Geri </v-btn>
        <v-btn @click="finishPriceInput">Tamam</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
    props:['passPrices',"priceStep","setPriceStep"],
  data() {
    return {
      amount1: 50,
      amount2: 100,
      amount3: 500,
      price1: 0,
      price2: 0,
      price3: 0,
    };
  },
  computed: {
      prices() {
            let prices = [{},{},{}];
            prices[0][`${this.amount1}`] = this.price1;
            prices[1][`${this.amount2}`] = this.price2;
            prices[2][`${this.amount3}`] = this.price3;
            return prices;
          }
  },
  watch: {
      prices(){
          console.log(this.prices);
      }
  },
  methods: {
      finishPriceInput() {
          this.passPrices(this.prices);
      }
  }
};
</script>

<style>
</style>