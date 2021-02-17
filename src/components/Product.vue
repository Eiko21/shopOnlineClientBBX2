<template>
    <div class="div-product-card">
        <div>
            <v-btn class="ma-2" color="secondary" @click="backToPrincipalPage()">Go back</v-btn>
        </div>
        <v-card class="mx-auto" max-width="500">
            <v-card-text>
                <p class="display-1 text--primary">
                    <b>[{{product.code}}]</b> {{ product.description }}
                </p>
                <p class="text--primary">Precio: {{ product.price }}€</p>
                <p class="text--primary">State: {{ currentState }}</p>
                <p class="text--primary">Creation date: {{ product.creationDate }}</p>
                <p class="text--primary">Suppliers: {{ suppliers }}</p>
                <p class="text--primary">Price reductions: {{ priceReductions }}</p>
                <p class="text--primary">Creation date: {{ product.creationDate }}</p>
                <p class="text--primary">Created by: <b>{{ product && product.creator && product.creator.username }}</b></p>
                <p class="text--primary" :hidden="!discontinued">Discontinued by: <b>{{ product.comment }}</b></p>
            </v-card-text>
            <v-card-actions>
                <router-link :to="{ name: 'EditProduct', params: { id: idproduct } }">
                    <v-btn class="mx-2" fab dark color="blue" :disabled="discontinued || userLogged == null">
                        <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
        <v-alert type="info" class="alert" v-if="discontinued && userLogged != null">This product cannot be editable because it is <b>DISCOTINUED</b></v-alert>
        <v-container class="px-0" fluid v-if="discontinued && userLogged != null">
            <v-checkbox v-model="checkbox" :label="`Change product state to ACTIVE`" @click="updateStateProduct()"></v-checkbox>
        </v-container>
    </div>
</template>
<script>
import router from '../router/router'
import getProduct from '../services/getProduct'
import updateProductSelected from '../services/updateProduct'
import updateProductState from '../services/updateProductState'
import auth from '../auth/auth.services'

export default {
    name: 'Product',
    data(){
        return{
            product: {},
            idproduct: router.app.$route.params.id,
            discontinued: false,
            checkbox: false,
            currentState: null,
            userLogged: auth.getUserLogged(),
            isCreator: false
        }
    },
    router: router,
    created(){
        this.getProductById();
    },
    methods:{
        getProductById(){
            getProduct(this.idproduct).then( res => this.product = res )
            .then( () => {
                this.product.state == 'DISCONTINUED' ? this.discontinued = true : this.discontinued = false;
                this.currentState = this.product.state;
            });
        },
        updateStateProduct(){
            this.checkbox ? updateProductState(this.idproduct, this.product)
                .then( () => { 
                    this.discontinued = false;
                    this.currentState = 'ACTIVE';
                })
            : this.product = updateProductSelected(this.product);
        },
        backToPrincipalPage(){
            router.go(-1);
        }
    },
    computed:{
        suppliers(){
            return this.product.suppliers && Object.keys(this.product.suppliers).length 
            ? this.product.suppliers : 'NO_SUPPLIERS'
        },
        priceReductions(){
            return this.product.priceReductions && Object.keys(this.product.priceReductions).length 
            ? this.product.priceReductions : 'NO_PRICE_REDUCTIONS'
        }
    }
}
</script>
<style>
    .div-product-card{
        margin: 4% 5%;
        padding: 0;
    }
    .alert{
        margin: 2% 0;
        width: 50%;
    }
</style>
