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
import transformDateFormat from '../resources/changeDateFormat'

export default {
    name: 'Product',
    data(){
        return{
            product: {},
            idproduct: router.app.$route.params.id,
            checkbox: false,
            state: 'DISCONTINUED'
        }
    },
    created(){
        this.getProductById()
    },
    methods:{
        getProductById(){
            fetch(`http://localhost:8086/api/public/product/${this.idproduct}`)
            .then(response => {  return response.json() })
            .then(product => {
                this.product = product
                this.product.creationDate = transformDateFormat(this.product.creationDate)
                this.product.state === 'DISCONTINUED' ? this.checkbox = true : false;
            })
            .catch(err => { throw err })
        },
        updateProductState(){
            if(this.checkbox) {
                this.product.state = 'DISCONTINUED'
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
                
                this.state = 'ACTIVE'
            } else {
                this.product.state = 'ACTIVE'
                this.state = 'DISCONTINUED'
            }
        }
    }
}
</script>
<style>
    .div-product-card{
        margin: 5%;
        padding: 0;
    }
</style>
