<template>
  <v-container>
     <span class="">
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </span>
    <router-view></router-view>
  </v-container>
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb.js'
export default {
  mixins: [breadCrumb],
}
</script>

<style>

</style>