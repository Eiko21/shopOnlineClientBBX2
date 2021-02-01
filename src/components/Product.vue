<template>
    <div class="div-product-card">
        <v-container fluid>
        <v-checkbox v-model="checkbox" @click="updateProductState()">
          <template v-slot:label>
            <div>Change product state as {{ state }}</div>
          </template>
        </v-checkbox>
      </v-container>
        <v-card class="mx-auto" max-width="500">
            <v-card-text>
                <p class="display-1 text--primary">
                    <b>[{{product.code}}]</b> {{ product.description }}
                </p>
                <p class="text--primary">Precio: {{ product.price }}€</p>
                <p class="text--primary">State: {{ product.state }}</p>
                <p class="text--primary">Creation date: {{ product.creationDate }}</p>
                <p class="text--primary">Created by: <b>{{ product && product.creator && product.creator.username }}</b></p>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import router from '../router/router'
import getProduct from '../services/getProduct'

export default {
    name: 'Product',
    data(){
        return{
            product: {},
            idproduct: router.app.$route.params.id,
            checkbox: false,
            state: 'DISCOUNTED'
        }
    },
    created(){
        this.getProductById();
    },
    methods:{
        getProductById(){
            this.product = getProduct(this.idproduct, this.checkbox);
            this.checkbox = this.product.state === 'DISCOUNTED' ? true : false;
        },
        updateProductState(){
            if(this.checkbox) {
                this.product.state = 'DISCOUNTED'
                fetch(`http://localhost:8086/api/public/product/${this.idproduct}/update`, {
                    method: 'PUT',
                    body: this.product,
                    headers:{
                        "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(response => { return response.json() })
                .then(() => { this.getProductList() })
                .catch(err => { throw err })
                
                this.state = 'ACTIVE';
            } else {
                this.product.state = 'ACTIVE';
                this.state = 'DISCOUNTED';
            }
        }
    }
}
</script>
<style>
    .div-product-card{
        margin: 0 5%;
        padding: 0;
    }
</style>
