<template>
   <div class="bookCard d-flex align-center flex-grow-sm-0 flex-shrink-sm-0 flex-grow-1 flex-shrink-1">
      <div @click="openQuickLook()" class="bookCover d-flex flex-column jusitfy-center">
         <v-progress-circular class="bookLoader" v-if="bookLoading" size="100" width="3" color="eruditePurple" indeterminate/>
         <div class="bookInner d-flex align-center">
            <div class="coverImg">
               <img :src="book.cover"/>
            </div>
            <div class="page"></div>
            <div class="page page-2"></div>
            <div class="page page-3"></div>
            <div class="page page-4"></div>
            <div class="page page-5"></div>
            <div class="coverImg final-page">
               <img :src="book.cover"/>
            </div>
         </div>
      </div>
      <div class="bookInfo d-flex flex-column 
                  flex-grow-1 flex-shrink-1 ps-8 ps-sm-10 
                  justify-space-between py-sm-4">
         <div>
            <h1 class="bookTitle">{{book.title}}</h1>
            <h2 v-if="book.authors.length" class="bookAuthors pt-sm-2"> By {{book.authors.join(' ')}}</h2>
         </div>
         <div class="d-flex justify-sm-end pe-4">
            <v-btn :block="$vuetify.breakpoint.xsOnly" :loading="btnLoading" @click="openQuickLook(true)" 
                   max-width="120px" class="white--text" depressed 
                   rounded color="eruditeGreen">
               <span>details</span>
            </v-btn>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props:{
      book:{
         type:Object,
         required:true
      }
   },
   data() {
      return {
         btnLoading:false,
         bookLoading:false,
      }
   },
   methods: {
      openQuickLook(isBtn){
         if(isBtn){
            this.btnLoading = true;
         }else{
            this.bookLoading = true;
         }
         let self = this;
         this.$store.dispatch('updateCurrentBook',this.book.id)
            .then(res => {
               self.$store.dispatch('updateBookDialog',true);
            })
            .finally(()=>{
               if(isBtn){
                  self.btnLoading = false;
               }else{
                  self.bookLoading = false;
               }
            })
      }
   },
}
</script>

<style lang="less">
@import '../../../style/mixin.less';
@bookWidth:144px;
@bookHeight:218px;
@bookWidthMobile:86px;
@bookHeightMobile:130px;
.bookCard{
   margin: 10px;
   max-width: 435px;
   min-width: 435px;
   @media(max-width: @screen-xs){
      min-width:initial;
   }
   .bookCover{
      transform: translateZ(0);
      cursor: pointer;
      position: relative;
      .bookLoader{
         @media(max-width: @screen-xs){
            width: @bookWidthMobile;
            height: @bookHeightMobile;
         }
         width: @bookWidth;
         height: @bookHeight;
         position: absolute;
         z-index: 10;
         right: 16%;
         top: 26%;
      }
      .bookInner {
         @media(max-width: @screen-xs){
            width: @bookWidthMobile;
            height: @bookHeightMobile;
         }
         width: @bookWidth;
         height: @bookHeight;
         transform-style: preserve-3d;
         &::before{
            content: "";
            width: 100%;
            position: absolute;
            height: 0;
            bottom: 14px;
            transform: rotateY(-20deg) translateZ(-20px);
            z-index: 0;
            box-shadow: 10px 12px 20px 13px rgba(0, 0, 0, 0.3);
         }
         .coverImg {
            transform: rotateY(-20deg);
            width: 100%;
            z-index: 5;
            clear: both;
            height: 100%;
            background: #ddd;
            &::before{
               content: "";
               display: block;
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               border: 2px solid rgba(0, 0, 0, 0.2);
               box-sizing: border-box;
               border-left: 4px solid rgba(0, 0, 0, 0.3);
               z-index: 2;
            }
            img {
               width: 100%;
               height: 100%;
               display: block;
               position: absolute;
               top: 0;
            }
            &.final-page {
               position: absolute;
               z-index: -1;
               right: -17px;
               transform: rotateY(-19deg) translateZ(-10px) scale(0.984);
            }
         }
         .page {
            width: calc(100% - 20px);
            height: calc(100% - 2px);
            position: absolute;
            box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.2),
               inset -1px 0px 1px rgba(150, 150, 150, 0.1);
            border-radius: 0px 3px 3px 0px;
            transform: rotateY(-20deg) translateZ(-5px);
            right: -3px;
            z-index: 4;
            background: white;
            &.page-2 {
               height: calc(100% - 4px);
               right: -6px;
               z-index: 3;
            }
            &.page-3 {
               height: calc(100% - 6px);
               right: -9px;
               z-index: 2;
            }

            &.page-4 {
               height: calc(100% - 8px);
               right: -12px;
               z-index: 1;
            }

            &.page-5 {
               height: calc(100% - 10px);
               right: -15px;
               z-index: 0;
            }
         }
      }
   }
   .bookInfo{
      height: 100%;
      .bookTitle{
         @media(max-width: @screen-xs){
            font-size: 20px;
            .giveMeEllipsis(2,20)
         }
         font-size: 26px;
         font-weight: 700;
         font-stretch: normal;
         font-style: normal;
         letter-spacing: -1px;
         color: @bluePurple;
         .giveMeEllipsis(3,30)
      }
      .bookAuthors{
         @media(max-width: @screen-xs){
            font-size: 14px;
         }
         font-size: 16px;
         font-weight: 400;
         color: #666;
      }
   }
}

</style>