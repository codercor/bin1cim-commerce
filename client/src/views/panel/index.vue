<template>
  <v-container>
    <span class="">
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </span>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    breadcrumbs() {
      let breadcrumbs = [];
      let path = this.$route.fullPath.split("/");
      for (let i = 1; i < path.length; i++) {
        let text = path[i].charAt(0).toUpperCase() + path[i].slice(1);
        text = this.translateToTurkishBreadcrumbText(text);
        breadcrumbs.push({
          text: text,
          disabled: false,
          href: path.slice(0, i + 1).join("/"),
        });
      }
      return breadcrumbs;
    },
    
  },
  methods: {
    translateToTurkishBreadcrumbText(text) {
      switch (text) {
        case "Panel":
          return "Panel"
        case "Orders":
          return "Siparişler"
        default:
          return text;
      }
  },
  },
};
</script>

<style>
</style>