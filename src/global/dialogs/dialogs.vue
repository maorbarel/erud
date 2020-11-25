<template>
   <div>
      <bookDialog v-if="getIsBookDialog"/>
   </div>
</template>

<script>
const bookDialog = () => import('./bookDialog.vue');

export default {
   components:{bookDialog},
   computed: {
      getIsBookDialog(){
         return this.$store.getters.getIsBookDialog;
      }
   }
}
</script>