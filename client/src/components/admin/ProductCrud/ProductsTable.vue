<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="Yükleniyor bekleyiver..."
      :headers="headers"
      :items="products"
      :items-per-page="100"
      hide-default-footer
    >
    <template v-slot:top>
      <v-text-field v-model="keyword" rounded dense filled clearable elevation="5" label="Ürün ara..."></v-text-field>
    </template>
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
        <v-btn icon @click="deleteProductDialog(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col offset="5">
            <v-pagination
              v-model="page"
              total-visible="10"
              circle
              dark
              :length="productsPageLength"
            ></v-pagination>
          </v-col>
          <v-col cols="1">
            <v-text-field
              width="100px"
              :value="perPage"
              label="Göster"
              type="number"
              min="1"
              max="100"
              @input="perPage = Number($event)"
            ></v-text-field>
          </v-col>
        </v-row>
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
            :src="photoUrl+n"
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
      <v-row v-if="dialog.type == 'edit'">
        <EditProduct @closeDialog="closeDialog" :product="dialog.content" />
      </v-row>
      <div v-if="dialog.type == 'delete'">
        <v-row>
          <v-col cols="12">
            <v-card-title>
              {{ dialog.content.name }} adlı ürünü silmek istediğinize emin
              misiniz?
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-btn
                @click="deleteProduct(dialog.content.id)"
                style="background: red; color: white; width: 100%"
                >Sil</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dialog from "@/components/common/Dialog";
import EditProduct from "./EditProduct.vue";
export default {
  components: {
    Dialog,
    EditProduct,
  },
  mounted: async function () {
    await this.refreshProducts();
  },
  watch: {
    perPage() {
      this.refreshProducts();
    },
    page(){
      this.refreshProducts();
    },
    keyword(){
      this.refreshProducts();
    }
  },
  data() {
    return {
      page: 1,
      perPage: 5,
      keyword:"",
      loading: true,
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
    };
  },
  methods: {
    ...mapActions("admin", ["getProducts", "deleteProductRequest"]),
    showImages(item) {
      this.dialog.type = "images";
      this.dialog.content = item.images;
      this.dialog.open = true;
      this.$forceUpdate();
    },
    showDescription(item) {
      this.dialog.type = "text";
      this.dialog.content = item.description;
      this.dialog.open = true;
      this.$forceUpdate();
    },
    showPrices(item) {
      this.dialog.type = "prices";
      console.log(item);
      this.dialog.content = item.prices;
      this.dialog.open = true;
      this.$forceUpdate();
    },
    editProduct(item) {
      this.dialog.type = "edit";
      this.dialog.open = true;
      this.dialog.content = item;
      this.$forceUpdate();
    },
    deleteProductDialog(item) {
      this.dialog.type = "delete";
      this.dialog.content = item;
      this.dialog.open = true;
      this.$forceUpdate();
    },
    async deleteProduct(id) {
      await this.deleteProductRequest(id);
      this.$vs.notification({
        title: "Ürün Silindi ",
        text: "Ürün silindi ekranınız güncellendi.",
        color: "danger",
        progress: "auto",
        position: "top-right",
      });
      await this.getProducts({
        page: this.page,
        keyword: "",
        perPage: this.perPage,
      });
      this.dialog.open = false;
    },
    closeDialog() {
      this.dialog.open = false;
    },
    async refreshProducts() {
      this.loading = true;
      await this.getProducts({
        page: this.page,
        keyword: this.keyword,
        perPage: this.perPage,
      });
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters("admin", ["products", "productsPageLength"]),
    photoUrl(){
            return process.env.VUE_APP_API_PHOTO_URL;
        }
  },
};
</script>

<style>
</style>