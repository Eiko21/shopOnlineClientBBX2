<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <router-link :to="{ name: 'App' }">
        <v-toolbar-title class="toolbar-title">ShopOnline</v-toolbar-title>
      </router-link>
    </v-app-bar>
    
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">

          <v-list-item v-if="userLogged != null">
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>{{ userLogged.username }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="userLogged == null">
            <router-link :to="{ name: 'Login' }" class="links">
              <v-list-item-icon>
                <span class="material-icons">login</span>
              </v-list-item-icon>
                <v-list-item-title class="title-login">Sign in</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item v-if="userLogged != null && userLogged.role == 'ADMIN'">
            <router-link :to="{ name: 'Users' }" class="links">
              <v-list-item-icon>
                <span class="material-icons">list</span>
              </v-list-item-icon>
              <v-list-item-title >Users registered</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item v-if="userLogged != null && userLogged.role == 'ADMIN'">
            <router-link :to="{ name: 'Products' }" class="links">
              <v-list-item-icon>
                <span class="material-icons">list</span>
              </v-list-item-icon>
              <v-list-item-title >Products</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item v-if="userLogged != null" @click="logout()">
            <v-list-item-icon>
              <span class="material-icons">logout</span>
            </v-list-item-icon>
            <v-list-item-title >Sign out</v-list-item-title>
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
      drawer: true,
      group: null,
    }
  },
  methods:{
    logout(){
      auth.logout();
      this.$router.push("/login");
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
    display: flex;
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