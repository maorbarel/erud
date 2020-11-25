<template>
   <v-app-bar class="px-2 py-0" app color="eruditePurple" flat>
      <div class="headerWrapper d-flex align-center">

         <img src="./images/0.png" alt="erudite logo">
         
         <div class="tabs ms-4 d-flex align-end">
            <button v-for="(tab,index) in tabs" :key="index" 
                    @click="goToRoute(tab.routeName)" 
                    :class="['tabBtn','text-uppercase',{'tabDisabled':tab.disabled},
                            {'tabActive':currentRoute == tab.routeName}]">
               {{tab.text}}
            </button>
         </div>

      </div>
   </v-app-bar>
</template>

<script>
import * as routeNames from '../../router/routeNames.js';
export default {
   computed: {
      tabs(){
         return [
            {
               text: 'Library',
               routeName: routeNames.Library,
            },
            {
               text: 'Latest viewed',
               routeName: routeNames.Latest,
               disabled: !this.$store.getters?.getLatestBooksIds?.length
            },
         ]
      },
      currentRoute(){
         return this.$route.name;
      }
   },
   methods: {
      goToRoute(routeName){
         this.$router.push({
            name: routeName
         }).catch(()=>{})
      }
   },
}
</script>
<style lang="less">
@import '../../style/mixin.less';
   .v-toolbar__content{
      padding: 0;
   }
   .headerWrapper{
      .pageWrapper();
      height: 100%;
      width: 100%;
      margin: 0 auto;
      img{
         height: 26px;
         @media(max-width: @screen-xs){
            height: 16px;
         }
      }
      .tabs{
         height: 100%;
         .tabBtn{
            @media(max-width: @screen-xs){
               font-size: 16px;
            }
            font-weight: 500;
            color: white;
            padding: 10px;
            margin-right:10px;
            outline: none;
            height: 100%;
            font-size: 20px;
            &.tabActive{
               background: @green;
               border-left: white solid 2px;
               border-right: white solid 2px;
               color:@bluePurple;
            }
            &.tabDisabled{
               pointer-events: none;
               opacity: 0.2;
            }
         }
      }
   }
</style>