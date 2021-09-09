<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Products</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Ürün Ekle
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Ürün Adı..."
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Açıklama"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12"> </v-col>
                  <v-col cols="12">
                    <v-card>
                      <v-row
                        v-if="(editedItem.images.length > 0) && (editedIndex != -1)"
                      >
                        <v-col
                          v-for="image in editedItem.images"
                          :key="image"
                          cols="4"
                        >
                          <v-img
                            height="100"
                            :src="'http://localhost:3000/images/'+image"
                          ></v-img>
                        </v-col>
                      </v-row>
                      <!-- new product image -->
                      <v-row
                        v-if="(editedItem.uploadImages.length> 0 ) && (editedIndex == -1)"
                      >
                        <v-col
                          v-for="image in editedItem.uploadImages"
                          :key="image"
                          cols="4"
                        >
                          <v-img
                            height="100"
                            :src="URL.createObjectURL(image)"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      accept="image/*"
                      v-model="editedItem.uploadImages"
                      prepend-icon="mdi-camera"
                      label="Resim Seç"
                      color="deep-purple accent-4"
                      :counter="false"
                      multiple
                      outlined
                      :clearable="false"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="deep-purple accent-4"
                          dark
                          label
                          small
                        >
                          {{ text }}
                        </v-chip>

                        <span
                          v-else-if="index === 2"
                          class="text-overline grey--text text--darken-3 mx-2"
                        >
                          +{{ editedItem.uploadImages.length - 2 }} Resim
                        </span>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <PricesInput
                      :priceStep="priceStep"
                      :setPriceStep="setPriceStep"
                      :passPrices="setEditedItemPrices"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Siktiret
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Kaydet </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:item.prices="{ item }">
      <v-row dense>
        <v-col md="4" cols="12" class="text-center green lighten-3">
          0 - {{ Object.keys(item.prices[0])[0] }}
          <b> {{ Object.values(item.prices[0])[0] }}₺ </b>
        </v-col>
        <v-col md="4" cols="12" class="text-center green lighten-2">
          {{ Object.keys(item.prices[0])[0] }} -
          {{ Object.keys(item.prices[1])[0] }} :
          <b> {{ Object.values(item.prices[1])[0] }}₺ </b>
        </v-col>
        <v-col md="4" cols="12" class="text-center green lighten-1">
          {{ Object.keys(item.prices[1])[0] }} -
          {{ Object.keys(item.prices[2])[0] }} :
          <b> {{ Object.values(item.prices[2])[0] }}₺ </b>
        </v-col>
      </v-row>
    </template>
    <template v-slot:item.images="{ item }">
      <!-- TODO -->
      <v-btn icon @click="item"> <v-icon>mdi-image</v-icon></v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import PricesInput from "./PricesInput.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PricesInput,
  },
  data: () => ({
    dialog: false,
    URL,
    priceStep: 1,
    dialogDelete: false,
    src: "",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Fiyatlar", value: "prices" },
      { text: "Açıklama", value: "description" },
      { text: "Resimler", value: "images", sortable: false },
      { text: "İşlemler", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      prices: {},
      description: "",
      images: [],
      uploadImages: [],
    },
    defaultItem: {
      name: "",
      prices: {},
      description: "",
      images: [],
      uploadImages: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Yeni Ürün" : "Düzenlenen Ürün";
    },
    ...mapGetters("admin", ["products"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions("admin", ["getProducts", "addProduct"]),
    initialize() {
      this.getProducts();
    },
    setEditedItemPrices(prices) {
      this.editedItem.prices = prices;
      console.log(prices);
    },
    editItem(item) {
      this.editedIndex = this.products.findIndex((t) => t.id === item.id);
      
      this.editedItem = {...item,uploadImages:[]};
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.setPriceStep(1);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.addProduct(this.editedItem);
      }
      this.close();
    },
    setPriceStep(step) {
      this.priceStep = step;
    },
  },
};
</script>