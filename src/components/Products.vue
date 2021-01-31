<template>
  <div class="product-list">
    <div class="div-card">
      <v-container fluid>
        <v-radio-group v-model="radioGroup">
          <v-radio
            v-for="option in radioOptions"
            :key="option"
            :label="`${option} products`"
            :value="option"
          ></v-radio>
        </v-radio-group>

        <router-link :to="{ name: 'NewProduct' }">
          <v-btn class="mx-2" fab dark color="blue">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-container>
      <div v-for="product in filterProducts" v-bind:key="product.idproduct">
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
            <router-link
              :to="{ name: 'Product', params: { id: product.idproduct } }"
            >
              <v-btn text color="deep-blue accent-4">Show product</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/router"
import getAllProducts from "../services/getProductList";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      checkbox: false,
      radioOptions: ["ALL", "ACTIVE", "DISCOUNTED"],
      radioGroup: "ALL",
    };
  },
  router: router,
  created() {
    this.getProductList();
    this.filterProducts();
  },
  methods: {
    getProductList() {
      this.products = getAllProducts();
    },
    getProductById(idproduct) {
      router.push({ name: "Product", params: { id: idproduct } });
    },
  },
  computed: {
    filterProducts() {
      return (this.radioGroup === "ALL")
        ? this.products
        : this.products.filter( ({state}) => state === this.radioGroup );
    },
  },
};
</script>

<style scoped>
.product-list {
  margin: 0 5%;
  display: grid;
  grid-gap: 20px;
  grid-template-areas: "card card card";
}

.div-card {
  grid-area: card;
  grid-column: span 3;
}
</style>
