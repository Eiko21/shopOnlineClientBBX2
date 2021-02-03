<template>
    <div class="div-product-card">
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
            <v-card-actions>
                <router-link :to="{ name: 'EditProduct', params: { id: idproduct } }">
                    <v-btn class="mx-2" fab dark color="blue">
                        <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import router from '../router/router'
import getProduct from '../services/getProduct'
import updateProductSelected from '../services/updateProduct'

export default {
    name: 'Product',
    data(){
        return{
            product: {},
            idproduct: router.app.$route.params.id,
            checkbox: false,
            checkboxState: 'DISCOUNTED',
            newState: 'DISCOUNTED'
        }
    },
    router: router,
    created(){
        this.getProductById();
    },
    methods:{
        getProductById(){
            getProduct(this.idproduct).then( res => this.product = res );
            this.checkbox = this.product.state === 'DISCOUNTED' ? true : false;
        },
        updateStateProduct(){
            this.product = updateProductSelected(this.product);
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
