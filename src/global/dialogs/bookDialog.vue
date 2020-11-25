<template>
   <v-dialog :value="true" persistent width="700" content-class="bookDialog" :fullscreen="$vuetify.breakpoint.xsOnly">

      <v-card width="700px" color="white" class="pa-0">
         <v-icon class="closeIcon" @click="closeDialog">mdi-close</v-icon>

         <div class="content pa-4 d-flex flex-column flex-sm-row align-center align-sm-start">

            <img class="rounded flex-grow-1 flex-shrink-1 flex-grow-sm-0 flex-shrink-sm-0"
                 width="220" height="308" :src="book.cover" :alt="`${book.title} cover`">

            <div class="bookInfo pt-2 pt-sm-0 ps-sm-5 flex-grow-0 flex-shrink-1 d-flex d-sm-block 
                  flex-column align-center text-sm-start text-center">
               <div class="bookTitle" v-text="book.title"/>
               <div v-if="book.authors.length" class="bookAuthors pt-sm-3" v-text="`By ${book.authors.join(' ')}`"/>
               <div class="pt-3" v-if="book.bookshelves.length">
                  <v-chip v-for="bookshelve in book.bookshelves" :key="bookshelve" 
                     small color="eruditeGreen" class="me-2 mb-2 white--text">
                     {{bookshelve}}
                  </v-chip>
               </div>
            </div>
            
         </div>

      </v-card>

   </v-dialog>
</template>

<script>
export default {
   computed: {
      book(){
         return this.$store.getters.getCurrentBook;
      }
   },
   methods: {
      closeDialog(){
         this.$store.dispatch('updateBookDialog',false);
      }
   }
}
</script>

<style lang="less">
@import '../../style/mixin.less';
.bookDialog{
   .closeIcon{
      position: absolute;
      right: 4px;
      top: 4px;
      cursor: pointer;
   }
   .content{
      img{
         border: 1px solid black;
      }
      .bookInfo{
         width: 100%;
         .bookTitle{
            width: 100%;
            color: @bluePurple;
            font-size: 26px;
            font-weight: 700;
            .giveMeEllipsis(3,30)
         }
         .bookAuthors{
            font-size: 18px;
            font-weight: 400;
            color: #666;
         }
      }
   }
}
</style>