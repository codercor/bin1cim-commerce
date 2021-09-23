<template>
    <vs-dialog prevent-close blur v-model="dialog.open">
          <template #header>
          <h4 class="not-margin">
            {{ dialog.title }}
          </h4>
        <v-container>
            <slot></slot>
        </v-container>
        </template>
     </vs-dialog>
</template>

<script>
export default {
props:[
    'dialog'
],
}
</script>

<style>

</style>