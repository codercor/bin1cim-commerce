<template>
  <div>
    <v-data-table :headers="headers" :items="products">
      <template v-slot:item.prices="{ item }">
        <v-btn @click="showPrices(item)"> Fiyatları Gör </v-btn>
      </template>
      <template v-slot:item.images="{ item }">
        <v-btn icon @click="showImages(item)">
          <v-icon>mdi-image-filter-center-focus</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.description="{ item }">
        <v-btn icon @click="showDescription(item)">
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editProduct(item)">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
        <v-btn icon @click="deleteProduct(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <Dialog :dialog="dialog">
      <div v-if="dialog.type == 'text'">
        <p>
          {{ dialog.content }}
        </p>
      </div>
      <v-row v-if="dialog.type == 'prices'">
        <!-- show prices -->
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Min</th>
                  <th class="text-left">Max</th>
                  <th class="text-left">Fiyat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>
                    {{ Object.keys(dialog.content[0])[0] }}
                  </td>
                  <td>{{ Object.values(dialog.content[0])[0] }} ₺</td>
                </tr>
                <tr>
                  <td>
                    {{ Object.keys(dialog.content[0])[0] }}
                  </td>
                  <td>
                    {{ Object.keys(dialog.content[1])[0] }}
                  </td>
                  <td>{{ Object.values(dialog.content[1])[0] }} ₺</td>
                </tr>
                <tr>
                  <td>
                    {{ Object.keys(dialog.content[1])[0] }}
                  </td>

                  <td>
                    {{ Object.keys(dialog.content[2])[0] }}
                  </td>
                  <td>{{ Object.values(dialog.content[2])[0] }} ₺</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row v-if="dialog.type == 'images'">
        <v-col
          v-for="n in dialog.content"
          :key="n"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="`http://localhost:3000/images/${n}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
      <v-row
       v-if="dialog.type == 'edit'"
      >
        <EditProduct :product="dialog.content" />
      </v-row>
    </Dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dialog from "@/components/common/Dialog";
import EditProduct from './EditProduct.vue';
export default {
  components: {
    Dialog,
    EditProduct,
  },
  mounted: function () {
    this.getProducts({ page: 1, keyword: "" });
  },
  data() {
    return {
      dialog: {
        open: false,
        title: "",
        type: "text",
        content: null,
      },
      headers: [
        {
          text: "Ürün",
          value: "name",
          sortable: true,
        },
        {
          text: "Açıklama",
          value: "description",
          sortable: true,
        },
        {
          text: "Fiyatlar",
          value: "prices",
          sortable: true,
        },
        {
          text: "Resimler",
          value: "images",
          sortable: false,
        },

        {
          text: "İşlemler",
          value: "actions",
          sortable: false,
        },
      ],
      items: [
        {
          name: "Xiomi Kablo Orjinal 5 Metre",
          price: "$1",
          images: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions("admin", ["getProducts"]),
    showImages(item) {
      this.dialog.type = "images";
      this.dialog.content = item.images;
      this.dialog.open = true;
    },
    showDescription(item) {
      this.dialog.type = "text";
      this.dialog.content = item.description;
      this.dialog.open = true;
    },
    showPrices(item) {
      this.dialog.type = "prices";
      this.dialog.content = item.prices;
      this.dialog.open = true;
    },
    editProduct(item) {
      this.dialog.type = "edit";
      this.dialog.open = true;
      this.dialog.content = item;
    },
  },
  computed: {
    ...mapGetters("admin", ["products"]),
  },
};
</script>

<style>
</style>