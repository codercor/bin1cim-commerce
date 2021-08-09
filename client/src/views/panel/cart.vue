<template>
    <v-container>
       <Cart/>
    </v-container>
</template>

<script>

import Cart from '@/components/panel/Cart'

export default {

    components: {   Cart },
    mounted(){
        console.log("selo");
    }
}
</script>

<style>

</style>