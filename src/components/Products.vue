<template>
  <div class="product-list">
    <div class="div-card" v-if="$route.params.id == null">
      <v-container fluid>
        <v-radio-group v-model="radioGroup">
          <v-radio v-for="option in radioOptions" :key="option" :label="`${option} products`" :value="option"></v-radio>
        </v-radio-group>
        
        <!-- <router-link :to="{ name: 'NewProduct' }">
          <v-btn class="mx-2" fab dark color="blue" v-model="clicked">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </router-link> -->
      </v-container>
      <div v-for="product in filterProducts" v-bind:key="product.idproduct">
        <v-card class="mx-auto" max-width="500">
            <v-card-text>
              <p class="display-1 text--primary">
                <b>[{{product.code}}]</b> {{ product.description }}
              </p>
              <div class="text--primary">Precio: {{ product.price }}€</div>
              <div class="text--primary">State: {{ product.state }}</div>
              <div class="text--primary">Creation date: {{ product.creationDate }}</div>
              <div class="text--primary">Created by: <b>{{ product.creator.username }}</b></div>
            </v-card-text>
            <v-card-actions>
                <router-link :to="{ name: 'Product', params: { id: product.idproduct } }">
                    <v-btn text color="deep-blue accent-4">Show product</v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
      </div>
    </div>
    <!-- <div v-else-if="clicked">
      <router-view>
        <NewProduct />
      </router-view>
    </div> -->
    <div v-else>
      <router-view>
        <Product />
      </router-view>
    </div>
  </div>
</template>

<script>
import router from '../router/router'
import Product from './Product'
// import NewProduct from './NewProduct'

const SERVER_URL = 'http://localhost:8086/api/public/productlist';

export default {
  name: 'Products',
  components:{
    Product,
    // NewProduct
  },
  data(){
    return{
        products: [],
        creationDates: [],
        checkbox: false,
        radioOptions: ['ALL','ACTIVE','DISCOUNTED'],
        radioGroup: 1
        // clicked: false
    }
  },
  router: router,
  created(){
    this.getProductList()
  },
  methods:{
    getProductList(){
      fetch(SERVER_URL)
        .then(response => { return response.json(); })
        .then(products => {
          this.products = products;
          products.forEach(product => {
            const productDate = new Date(product.creationDate)
            const year = productDate.getFullYear()
            const month = (productDate.getMonth()+1).toString().padStart(2, '0')
            const day = productDate.getDay().toString().padStart(2, '0')

            const resultDate = `${day}/${month}/${year}`

            product.creationDate = resultDate
          });
        })
    },
    getProductById(idproduct){
      router.push({ name: 'Product' , params: { id: idproduct } });
    }
  },
  computed:{
    filterProducts(){
      console.log(this.radioGroup);

      if(this.radioGroup === 1 || this.radioGroup === 'ALL') return this.products 
      else return this.products.filter(product => product.state === this.radioGroup)
      // if( || this.radioGroup !== 1) 
      //   return 
      // else 
    }
  }
}
</script>

<style scoped>
  .product-list{
    margin: 5%;
    padding: 10px;
    display: grid;
    grid-gap: 20px;
    grid-template-areas: "card card card";
  }

  .div-card{
    grid-area: card;
    grid-column: span 3;
  }
</style>
