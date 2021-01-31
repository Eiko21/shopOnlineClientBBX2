<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>ShopOnline</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Products</v-tab>
          <v-tab>Suppliers</v-tab>
          <v-tab>Users</v-tab>
          <v-tab>
            <a href="/product/create">New Product</a>
          </v-tab>
        </v-tabs>
      </template>
      <!-- <v-spacer></v-spacer> -->
    </v-app-bar>
    <router-view> </router-view>
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
  v-tab > a{
    color: white;
    text-decoration: none;
  }
</style>