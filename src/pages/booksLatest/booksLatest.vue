<template>
   <div class="booksLatest px-2 px-sm-0">
      <div class="bookList pt-5 pt-sm-10 d-flex flex-wrap justify-center mb-5">
         <v-data-table 
            calculate-widths
            disable-sort
            :loading="isLoading"
            :headers="headers"
            :items="bookList"
            :item-key="'id'"
            mobile-breakpoint="0"
            class="elevation-1 bookTable text-center "
            :footer-props="{
               itemsPerPageOptions: [32]
            }"
            hide-default-footer
         >
            <template v-slot:item="{item}" v-if="!isLoading">
               <tr>
                  <td class="tableCover py-1 px-0 px-sm-4">
                     <img width="80" height="121" :src="item.cover" :alt="`${item.title} cover`">
                  </td>
                  <td class="text-start">
                     {{item.title}}
                  </td>
                  <td class="text-start">
                     {{item.authors.join(' ')}}
                  </td>
                  <td class="text-start">
                     <v-btn :loading="btnLookLoading" 
                            @click="openQuickLook(item)" 
                            rounded depressed class="white--text mb-3 d-block" 
                            color="eruditeGreen">
                        <v-icon>mdi-magnify</v-icon>
                     </v-btn>
                     <v-btn :loading="btnDeleteLoading" 
                            @click="deleteBook(item)" 
                            rounded depressed outlined 
                            color="eruditeGreen">
                        <v-icon>mdi-trash-can-outline</v-icon>
                     </v-btn>
                  </td>
               </tr> 
            </template>
         </v-data-table>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         headers: [
            { text: '', value: 'cover' },
            { text: 'Title', value: 'title' },
            { text: 'Authors', value: 'author'},
            { text: 'Actions', value: 'actions'},
         ],
         isLoading:true,
         btnLookLoading:false,
         btnDeleteLoading:false,
      }
   },
   computed: {
      latestBooksIds(){
         return this.$store.getters.getLatestBooksIds;
      },
      bookList(){
         let items = [];
         for(let i = 0; i < this.latestBooksIds.length;i++){
            let currentItem = this.$store.getters.getBooks.find(item => item.id === this.latestBooksIds[i])
            items.push(currentItem)
         }
         return !this.isLoading? items : [];
      }
   },
   methods: {
      deleteBook(book){
         this.btnDeleteLoading = true;
         let self = this;
         this.$store.dispatch('deleteLatestBook',book.id)
            .then(res => {
               if(!self.latestBooksIds?.length){
                  self.$router.push('/')
               }
            })
            .finally(()=>{
               self.btnDeleteLoading = false;
            })
      },
      openQuickLook(book){
         this.btnLookLoading = true;
         let self = this;
         this.$store.dispatch('updateCurrentBook',book.id)
            .then(res => {
               self.$store.dispatch('updateBookDialog',true);
            })
            .finally(()=>{
               self.btnLookLoading = false;
            })
      },
      updateBooks(){
         this.isLoading = true;
         let self = this;
         this.$store.dispatch('updateBooks',{ids:this.latestBooksIds})
            .then(res => {
               self.$nextTick(()=>{
                  self.isLoading = false;
               })
            })
      }
   },
   created() {
      this.updateBooks();
   }
}
</script>

<style lang="less">
@import '../../style/mixin.less';
.booksLatest{
   .bookList{
      width: 100%;
      margin: 0 auto;
      .pageWrapper();
      .bookTable{
         width: 1000px;
         .tableCover{
            width: 80px;
            img{
               border: 1px solid black;
            }
         }
      }
   }
}
</style>