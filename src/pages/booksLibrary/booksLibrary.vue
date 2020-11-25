<template>
  <div class="booksLibrary">
      <div class="bookList pt-2 pt-sm-10 d-flex flex-wrap justify-center">
         <div v-if="!isMobile" class="bookListTitle text-center">
            Library
            <v-divider color="#014C81" class="my-3" />
         </div>
         <template v-if="!isLoading">
            <bookCard v-for="book in bookList" :key="book.id" :book="book"/>
         </template>
         <template v-else>
            <bookCardSkeleton v-for="i in 9" :key="i"/>
         </template>
      </div>
      <div v-if="showPagination" class="text-center py-10">
         <v-pagination color="eruditePurple"
            :total-visible="isMobile? 4 : 7" 
            v-model="pagination.current" 
            :length="pagination.size"
            @input="goSelected"/>
      </div>
  </div>
</template>

<script>
const bookCard = () => import('./bookCard/bookCard.vue');
const bookCardSkeleton = () => import('./bookCard/bookCardSkeleton.vue');

export default {
   name: 'bookListLibrary',
   components: {
      bookCard,
      bookCardSkeleton
   },
   data() {
      return {
         isLoading:true,
         pagination:{
            current:1,
            size:0
         },
         query:{
            page:1,
         }
      }
   },
   computed: {
      bookList(){
         return this.$store.getters.getBooks;
      },
      showPagination(){
         return !this.isLoading && this.pagination?.size > 1 && this.bookList.length;
      },
      isMobile(){
         return this.$vuetify.breakpoint.xsOnly;
      }
   },
   watch: {
      "$route.query"(newVal){
         if(this.$route.query){
            this.query.page = this.$route.query?.page || 1;
            this.pagination.current = +this.query.page || 1
         }
         this.updateBooks()
      }
   },
   methods: {
      goSelected(){
         this.$router.push(
            {
               query: {
                  page: this.pagination.current,
               }
            }
         ).catch(() => {})
      },
      updateBooks(){
         this.isLoading = true;
         let self = this;
         this.$store.dispatch('updateBooks',this.query).then(res => {
            self.pagination.size = Math.ceil(res.pagination.count / 32);
            self.isLoading = false;
            self.$vuetify.goTo(0)
         })
      }
   },
   created() {
      if(this.$route.query){
         this.query.page = this.$route.query?.page || 0;
         this.pagination.current = +this.query.page || 1
      }
      this.updateBooks()
   },
}
</script>

<style lang="less">
@import '../../style/mixin.less';
   .booksLibrary{
      .bookList{
         width: 100%;
         margin: 0 auto;
         .pageWrapper();
         .bookListTitle{
            width: 100%;
            font-size: 70px;
            font-weight: 700;
            line-height: 1;
            color: @bluePurple;
         }
      }
   }
</style>