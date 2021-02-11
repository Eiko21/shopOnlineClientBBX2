<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <router-link :to="{ name: 'App' }">
        <v-toolbar-title class="toolbar-title">ShopOnline</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <!-- <router-link :to="{ name: 'Login' }" v-if="userLogged == null">
        <v-toolbar-title class="toolbar-title sign-in-btn">Sign in</v-toolbar-title>
      </router-link> -->
      <!-- <v-toolbar-title class="toolbar-title toolbar-username" v-if="userLogged != null">
        <v-icon>mdi-account</v-icon>{{ userLogged }}
      </v-toolbar-title>
      <router-link :to="{ name: 'Products' }" v-if="userLogged != null">
        <v-btn icon><span class="material-icons" @click="logout()">logout</span></v-btn>
      </router-link> -->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">

          <v-list-item v-if="userLogged != null">
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>{{ userLogged }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="userLogged == null">
            <v-list-item-icon>
              <span class="material-icons">login</span>
            </v-list-item-icon>
            <router-link :to="{ name: 'Login' }" class="links">
              <v-list-item-title class="title-login">Sign in</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item v-if="userLogged != null">
            <v-list-item-icon>
              <span class="material-icons">chair_alt</span>
            </v-list-item-icon>
            <router-link :to="{ name: 'Products' }" class="links">
              <v-list-item-title>Products</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item v-if="userLogged != null">
            <v-list-item-icon>
              <span class="material-icons">logout</span>
            </v-list-item-icon>
            <!-- <router-link :to="{ name: 'Products' }"> -->
              <v-list-item-title @click="logout()">Sign out</v-list-item-title>
            <!-- </router-link> -->
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </v-app>
</template>

<script>
import auth from './auth/auth.services';
import router from './router/router';

export default {
  name: 'App',
  router: router,
  data(){
    return {
      drawer: false,
      group: null
    }
  },
  methods:{
    logout(){
      auth.logout();
      this.$router.push("/");
    }
  },
  computed:{
    userLogged(){
      return auth.getUserLogged();
    }
  }
}
// const data = () =>{
//   return null;
// };
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
  .sign-in-btn{
    margin-right: 20px;
  }
  .sign-up-btn{
    color: white;
  }
  .toolbar-username{
    margin-right: 20px;
  }
  .toolbar-username, .toolbar-logout{
    display: flex;
    text-align: center;
    align-content: center;
    align-items: center;
  }

  .links{
    color: black;
    text-decoration: none;
  }
  .links .title-login{
    font-size: 15px;
  }

  .v-list-item__icon{
    margin-left: 20px;
  }
</style>