<template>
  <v-app>
    <appHeader/>
    <v-main> 
      <router-view class="main"/>
      <dialogs/>
    </v-main>
  </v-app>
</template>

<script>
const appHeader = () => import('./global/appHeader/appHeader.vue');
const dialogs = () => import('./global/dialogs/dialogs.vue');

export default {
  name: 'App',
  components:{
    appHeader,
    dialogs
  }
};
</script>

<style lang="less">
  html{
    overflow-y: auto !important;
  }
  .main{
    background: linear-gradient(110deg,  #F3F8FE 40%, rgba(0, 0, 0, 0) 30%), radial-gradient(farthest-corner at 0% 0%, white 70%,  #E6F3FF 70%);
    height: 100%;
  }
</style>
