<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <router-link :to="{ name: 'App' }">
        <v-toolbar-title class="toolbar-title">ShopOnline</v-toolbar-title>
      </router-link>
      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import router from './router/router';

export default {
  name: 'App',
  router: router,
  data
}
const data = () =>{
  return null;
};
</script>

<style scoped>
  #app{
    padding-top: 63px;
  }
  header{
    max-height: 63px;
  }
  .toolbar-title{
    color: white;
  }
</style>