<template>
  <div>
    <v-row>
      <v-col cols="6" md="2">
        <v-text-field v-model="companyName" label="Kurum Adına Göre Ara..."></v-text-field>
      </v-col>
      <v-col md-offset="8" md="2" cols="6">
        <v-switch v-model="editMode" inset color="red" label="Düzenle" dense />
      </v-col>
    </v-row>
    
    <v-data-table
      :loading="loading"
      :disabled="disabled"
      :items="users"
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
            <span v-if="!editMode"> {{ item.name }} </span>
            <v-text-field
              v-if="editMode"
              v-model="item.name"
              @change="_updateUser(item.id, item.name, 'name')"
              label="Toplam"
            />
          </td>
          <td>
            <span v-if="!editMode">{{ item.lastName }}</span>
            <v-text-field
              v-if="editMode"
              v-model="item.lastName"
              @change="_updateUser(item.id, item.lastName, 'lastName')"
            ></v-text-field>
          </td>
          <td>
            <p v-if="!editMode">{{ item.phone }}</p>
            <v-text-field
              v-if="editMode"
              v-model="item.phone"
              @change="_updateUser(item.id, item.phone, 'phone')"
            ></v-text-field>
          </td>
          <td>
            <p>{{ item.createdAt || Date.now()}}</p>
          </td>
          <td>
            <v-text-field
              v-if="editMode"
              v-model="item.username"
              @change="
                _updateUser(item.id, item.username, 'username')
              "
            ></v-text-field>
            <p v-if="!editMode">{{ item.username }}</p>
          </td>
          <td>
            <v-btn @click="frezeTable">
              {{ item.companyName }}
              <v-icon>mdi-office-building</v-icon></v-btn
            >
          </td>
            <td>
           <p v-if="!editMode"> {{item.role | roleFilter }}</p>
           <v-select  @change="_updateUser(item.id, item.role, 'role')" :items="[{text:'Yönetici',value:'1'},{text:'Kurum',value:'2'}]" v-model="item.role" v-if="editMode"> 
           </v-select>
          </td>
          <td v-if="editMode">
            <v-btn @click="_deleteUser(item.id)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:footer>
        <v-row>
          <v-col md-offset="5">
            <v-pagination
              v-model="page"
              total-visible="10"
              circle
              dark
              :length="usersPageLength"
            ></v-pagination>
          </v-col>
          <v-col cols="6" md="1">
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
  filters: {
    roleFilter(role) {
      if (role == 1) {
        return "Yönetici";
      } else if (role == 2) {
        return "Kurum";
      }
    },
  },
  data() {
    return {
      page: 1,
      perPage: 10,
      companyName:"",
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
        { text:"ID", value:"id"},
        { text:"Ad", value:"name"},
        { text:"Soyad", value:"lastName"},
        { text:"Telefon", value:"phone"},
        { text:"Tarih", value:"createdAt"},
        { text:"Kullanıcı Adı", value:"username"},
        { text:"Şirket Adı", value:"companyName"},
        { text:"Yetki", value:"role"},
      ],
    };
  },
  mounted() {
    this.refreshUsers();
    this.$root.$on("refreshUsers",()=>{
      this.refreshUsers();
    });
  },
  watch: {
    perPage() {
      this.refreshUsers();
    },
    page() {
      this.refreshUsers();
    },
    companyName() {
      this.refreshUsers();
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
    ...mapActions("admin", ["getUsers", "updateUser", "deleteUser"]),
    async refreshUsers() {
      this.loading = true;
      const { page, companyName, perPage } = this;
      await this.getUsers({ page, companyName, perPage });
      this.loading = false;
    },
    async frezeTable(cb, payload) {
      this.disabled = true;
      this.loading = true;
      if (typeof cb == "function") {
        await cb(payload);
        await this.refreshUsers();
        this.disabled = false;
        this.loading = false;
      } else {
        setTimeout(() => {
          this.disabled = false;
          this.loading = false;
        }, 1000);
      }
    },
    _updateUser(id, value, key) {
      let data = this.users.find((item) => item.id == id);
      data[key] = value;
      this.frezeTable(this.updateUser, data);
    },
    _deleteUser(id) {
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
        await this.frezeTable(this.deleteUser, id);
        this.dialog.open = false;
        this.dialog.content = {};
      };
      this.dialog.open = true;
    },
  },
  computed: {
    ...mapGetters("admin", ["users", "usersPageLength"]),
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