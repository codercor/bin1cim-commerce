<template>
  <vs-dialog prevent-close blur v-model="dialog.open">
    <template #header>
      
      <h4 v-if="dialog.type != 'sure' && dialog.type != 'orderDetails'" class="not-margin">
        {{ dialog.title }}
      </h4>
      <v-container>
        <h1 v-if="dialog.type == 'sure' || dialog.type == 'orderDetails'">
        {{ dialog.title }}
      </h1>
        <slot></slot>
      </v-container>
    </template>
  </vs-dialog>
</template>

<script>
export default {
  props: ["dialog"],
};
</script>

<style>
</style>