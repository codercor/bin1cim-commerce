<template>
  <v-card>
      
      <v-row>
          <!-- exitisting images -->
           <v-col v-for="image in existingImagesCopy" :key="image" cols="6" sm="6" md="4" lg="3" xl="2" class="text-center">
               
              <v-img  aspect-ratio="0.7"  :src="`http://localhost:3000/images/${image}`" >
                <v-btn small rounded class="white--text"  color="red" @click="deleteExistings(image)"> <v-icon>mdi-close</v-icon></v-btn>
              </v-img>
          </v-col>
          <!-- selected Images -->
          <v-col v-for="image in images" :key="image.name" cols="6" sm="6" md="4" lg="3" xl="2" class="text-center">
             
              <v-img  aspect-ratio="0.7"  :src="window.URL.createObjectURL(image)" >
                <v-btn small rounded class="white--text"  color="red" @click="removeImage(image)"> <v-icon>mdi-close</v-icon></v-btn>
              </v-img>
          </v-col>
      </v-row>
      <v-row>
          <v-col cols="8" offset="2" > 
              <v-file-input v-model="images" label="resim seç" multiple prepend-icon="mdi-camera"></v-file-input>
          </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
    props: {
        existingImages:{
            type: Array,
            default: () => []
        },
        passImages:Function,
        passDeletedImages:Function
    },
    data() {
        return {
            images: [],
            deletedImages:[],
            existingImagesCopy:this.existingImages
        }
    },
    methods: {
        removeImage(image) {
            this.images = this.images.filter(img => img.name !== image.name)
        },
        deleteExistings(image) {
            this.existingImagesCopy.splice(this.existingImagesCopy.indexOf(image),1)
            this.deletedImages.push(image)
        },  
    },
    watch: {
        images() {
            this.passImages(this.images)
        },
        deletedImages() {
            this.passDeletedImages(this.deletedImages)
        }
    },


}
</script>

<style>
.delete-button{
    position: relative;
    left: 100px;
}
</style>