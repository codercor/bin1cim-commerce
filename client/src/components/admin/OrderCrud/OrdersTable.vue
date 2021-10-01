<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-switch v-model="editMode" inset color="red" label="Düzenle" dense />
      </v-col>
    </v-row>
    <v-data-table
      :loading="loading"
      :disabled="disabled"
      :items="orders"
      :headers="headers"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <span> {{ item.id }} </span>
          </td>
          <td>
            <span v-if="!editMode"> {{ item.total }} </span>
            <v-text-field
              v-if="editMode"
              v-model="item.total"
              @change="_updateOrder(item.id, item.total, 'total')"
              label="Toplam"
            />
          </td>
          <td>
            <span v-if="!editMode">{{ item.isPaid | boolFilter }}</span>
            <v-switch
              v-if="editMode"
              v-model="item.isPaid"
              @change="_updateOrder(item.id, item.isPaid, 'isPaid')"
            ></v-switch>
          </td>
          <td>
            <p v-if="!editMode">{{ item.isAccepted | boolFilter }}</p>
            <v-switch
              v-if="editMode"
              v-model="item.isAccepted"
              @change="_updateOrder(item.id, item.isAccepted, 'isAccepted')"
            ></v-switch>
          </td>
          <td>
            <p v-if="!editMode">{{ item.isDone | boolFilter }}</p>
            <v-switch
              v-if="editMode"
              v-model="item.isDone"
              @change="_updateOrder(item.id, item.isDone, 'isDone')"
            ></v-switch>
          </td>
          <td>
            <p>{{ item.createdAt }}</p>
          </td>
          <td>
            <v-select
              v-if="editMode"
              v-model="item.paymentMethod"
              @change="
                _updateOrder(item.id, item.paymentMethod, 'paymentMethod')
              "
              :items="['card', 'Nakit', 'Senet']"
            ></v-select>
            <p v-if="!editMode">{{ item.paymentMethod }}</p>
          </td>
          <td>
            <v-btn @click="frezeTable">
              {{ item.user.companyName }}
              <v-icon>mdi-office-building</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn @click="showOrderDetails(item.id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </td>
          <td v-if="editMode">
            <v-btn @click="_deleteOrder(item.id)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col offset="5">
            <v-pagination
              v-model="page"
              total-visible="10"
              circle
              dark
              :length="ordersPageLength"
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
      <v-row v-if="dialog.type == 'sure'">
        <br />
        <v-col cols="6">
          <v-btn @click="dialog.content.cb(dialog.content.id)">Sil</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="dialog.type == 'orderDetails'">
        <v-col cols="12">
          <div class="center">
            <vs-table>
              <template #thead>
                <vs-tr>
                  <vs-th> ProductId </vs-th>
                  <vs-th> Birim Fiyat </vs-th>
                  <vs-th> Adet </vs-th>
                  <vs-th> Toplam </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(tr, i) in dialog.content" :data="tr">
                  <vs-td>
                    {{ tr.product.name }}
                  </vs-td>
                  <vs-td>
                    {{ tr.price / tr.amount }}₺
                  </vs-td>
                  <vs-td>
                    {{ tr.amount }}
                  </vs-td>
                  <vs-td>
                    {{ tr.price }}₺
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <span style="position:relative;left:90%;font-size:3em">+</span>
            <div style="width:100%;border:1px black solid">   
            </div>
            <span style="position:relative;left:80%;font-size:2em">{{ dialog.content.reduce((a, b) => a + b.price, 0) }}₺</span>
          </div>
        </v-col>
      </v-row>
    </Dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dialog from "@/components/common/Dialog";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      page: 1,
      perPage: 10,
      userId: -1,
      willDeleteId: -1,
      dialog: {
        open: false,
        title: "",
        type: "sure",
        content: {},
      },
      editMode: false,
      disabled: false,
      loading: false,
      headers: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Total",
          value: "total",
        },
        {
          text: "Ödenme",
          value: "isPaid",
        },
        {
          text: "Onay",
          value: "isAccepted",
        },
        {
          text: "Tamamlandı",
          value: "isDone",
        },
        {
          text: "Tarih",
          value: "createdAt",
        },
        {
          text: "Ödeme Yöntemi",
          value: "paymentMethod",
        },
        {
          text: "Kurum",
          value: "user",
        },
        {
          text: "Detay",
        },
      ],
    };
  },
  filters: {
    boolFilter(value) {
      if (value) {
        return "Evet";
      } else {
        return "Hayır";
      }
    },
  },
  mounted() {
    this.refreshOrders();
  },
  watch: {
    perPage() {
      this.refreshOrders();
    },
    page() {
      this.refreshOrders();
    },
    userId() {
      this.refreshOrders();
    },
    editMode() {
      if (this.editMode) {
        this.headers.push({ text: "Sil" });
      } else {
        this.headers.pop();
      }
    },
  },
  methods: {
    ...mapActions("admin", ["getOrders", "updateOrder", "deleteOrder"]),
    async refreshOrders() {
      this.loading = true;
      const { page, userId, perPage } = this;
      await this.getOrders({ page, userId, perPage });
      this.loading = false;
    },
    async frezeTable(cb, payload) {
      this.disabled = true;
      this.loading = true;
      if (typeof cb == "function") {
        await cb(payload);
        await this.refreshOrders();
        this.disabled = false;
        this.loading = false;
      } else {
        setTimeout(() => {
          this.disabled = false;
          this.loading = false;
        }, 1000);
      }
    },
    _updateOrder(id, value, key) {
      let data = this.orders.find((item) => item.id == id);
      data[key] = value;
      this.frezeTable(this.updateOrder, data);
    },
    _deleteOrder(id) {
      this.dialog.content.id = id;
      this._sureDelete();
    },
    _sureDelete() {
      this.dialog.title = "Silmek istediğinize emin misiniz ?";
      this.dialog.content.cb = this._sureDelete2;
      this.dialog.open = true;
    },
    _sureDelete2() {
      this.dialog.title = "Gerçekten emin misiniz ?";
      this.dialog.content.cb = async (id) => {
        await this.frezeTable(this.deleteOrder, id);
        this.dialog.open = false;
        this.dialog.content = {};
      };
      this.dialog.open = true;
    },
    showOrderDetails(id) {
      const orderDetails = this.orders.find(
        (order) => order.id == id
      ).orderDetails;
      this.dialog.type = "orderDetails";
      this.dialog.title = "Sipariş Detayları";
      this.dialog.content = orderDetails;
      this.dialog.open = true;
      this.$forceUpdate();
    },
  },
  computed: {
    ...mapGetters("admin", ["orders", "ordersPageLength"]),
  },
};
</script>

<style>
.neonText {
  color: black;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #f09,
    0 0 82px #f09, 0 0 92px #f09, 0 0 102px #f09, 0 0 151px #f09;
}
</style>