<template>
  <div class="product-list">
    <div class="div-card">
      <v-container fluid>
        <v-radio-group v-model="radioGroup">
          <v-radio v-for="option in radioOptions" :key="option" :label="`${option} products`" :value="option"></v-radio>
        </v-radio-group>
        <router-link :to="{ name: 'NewProduct' }" class="link-create" v-if="userLogged != null">
          <v-btn class="mx-2" fab dark color="blue"><v-icon dark>mdi-plus</v-icon></v-btn>
        </router-link>
      </v-container>

    <v-alert class="alert" type="error" v-if="error">You must be the ADMINISTRATOR to remove any product.</v-alert>
    <v-alert class="alert" type="success" v-if="isDeleted">The product has been removed successfully.</v-alert>
      <v-row no-gutters>
        <v-col v-for="product in filterProducts" :key="product.idproduct" cols="12" sm="4">
          <v-card class="mx-auto" max-width="500">
            <v-card-text>
              <p class="display-1 text--primary">
                <b>[{{ product.code }}]</b> {{ product.description }}
              </p>
              <div class="text--primary">Precio: {{ product.price }}€</div>
              <div class="text--primary">State: {{ product.state }}</div>
              <div class="text--primary">
                Creation date: {{ product.creationDate }}
              </div>
              <div class="text--primary">
                Created by: <b>{{ product.creator.username }}</b>
              </div>
            </v-card-text>
            <v-card-actions>
              <router-link :to="{ name: 'Product', params: { id: product.idproduct, username: user.username } }">
                <v-btn class="ma-2" text color="deep-gray accent-4">Show product</v-btn>
              </router-link>
              <v-btn class="ma-2" color="red" dark @click="deleteProductOfTheList(product.idproduct)" v-if="userLogged != null">Delete
                  <v-icon dark right>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    
  </div>
</template>

<script>
import router from "../router/router"
import getAllProducts from "../services/getProductList"
import deleteProduct from '../services/deleteProduct'
import auth from '../auth/auth.services'

export default {
  name: "Products",
  data() {
    return {
      products: [],
      checkbox: false,
      radioOptions: ["ALL", "ACTIVE", "DISCONTINUED"],
      radioGroup: "ALL",
      user: {
        username: router.app.$route.username,
        role: router.app.$route.role
      },
      userLogged: auth.getUserLogged(),
      error: false,
      isDeleted: false
    };
  },
  router: router,
  created() {
    this.initialize();
  },
  methods: {
    initialize () {
      this.products = getAllProducts()
    },
    deleteProductOfTheList(idproduct){
      this.userLogged.role == 'ADMIN' 
      ? deleteProduct(idproduct).then(() => this.products.splice(-1, 1))
        // .then(() => this.products = getAllProducts() )
      : this.error = true;
    }
  },
  computed: {
    filterProducts() {
      return (this.radioGroup !== "ALL")
        ? this.products.filter( ({state}) => state === this.radioGroup )
        : this.products;
    },
  },  
};
</script>

<style scoped>

.container{
  display: flex;
  align-content: center;
  align-items: center;
}
.link-create{
  margin: 0 auto;
}

.product-list {
  margin: 0 5%;
  grid-gap: 20px;
}

.alert{
  margin: 2% auto;
  width: 50%;
}

</style>
