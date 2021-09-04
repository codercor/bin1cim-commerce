<template>
    <v-card
    class="mx-auto text-center"
    :color="color"
    dark
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
       {{text}}
      </div>
    </v-card-text>

    <v-divider></v-divider>

 
  </v-card>
</template>
<script>
export default {
    props:['text','color','value'],
}
</script>