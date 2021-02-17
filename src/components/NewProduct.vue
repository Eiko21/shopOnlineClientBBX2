<template>
    <div id="form-create-div">
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">Product creation</v-card-title>
                <v-card-text>You must fill all the required fields.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Accept</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <form method="POST" enctype="multiplart/form-data">
            <v-text-field v-model="code" :error-messages="codeErrors" :counter="5" label="Code" required
                @input="$v.code.$touch()"
                @blur="$v.code.$touch()"
            ></v-text-field>
            <v-text-field v-model="description" :error-messages="descriptionErrors" :counter="100" label="Description" required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
            ></v-text-field>
            <v-text-field v-model="price" :error-messages="priceErrors" :counter="99999" label="Price"
                @input="$v.price.$touch()"
                @blur="$v.price.$touch()"
            ></v-text-field>
            <v-text-field v-model="creationDate" label="Creation date" required readonly></v-text-field>
            <v-select v-model="selectState" :items="states" :error-messages="selectStateErrors" label="State" item-text="statename" required
                @change="$v.selectState.$touch()"
                @blur="$v.selectState.$touch()"
            ></v-select>
            <v-select v-model="selectSupplier" :items="suppliers" label="Supplier" item-text="supplierName" item-value="idsupplier" 
                @change="$v.selectSupplier.$touch()"
                @blur="$v.selectSupplier.$touch()"
            ></v-select>
            <v-select v-model="selectPriceReduction" :items="priceReductions" label="Price reduction" item-text="discount" item-value="idpricereduction"
                @change="$v.selectPriceReduction.$touch()"
                @blur="$v.selectPriceReduction.$touch()"
            >
            </v-select>
            <v-btn class="mr-4" @click="createProduct()">Create product</v-btn>
            <v-btn class="mr-4" color="red" dark @click="cancelEdit()">Cancel</v-btn>
            <v-btn @click="clear">Clear inputs</v-btn>
        </form>
        <v-alert class="alert" type="success" v-if="created">The product has been created successfully. 
            <a @click="cancelEdit()">Return to the product list.</a>
        </v-alert>
    </div>
</template>
<script>
import router from '../router/router'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, decimal, numeric, minValue, maxValue } from 'vuelidate/lib/validators'
import auth from '../auth/auth.services'
import getAllSuppliers from '../services/getSuppliersList'
import getAllPriceReductions from '../services/getPriceReductionList'
import getPriceReduction from '../services/getPriceReduction'
import getSupplier from '../services/getSupplier'

import createProduct from '../services/createProduct'

export default {
    mixins: [validationMixin],
    name: 'NewProduct',
    validations: {
        code: { required, numeric, minLength: minLength(4) },
        description: { required, numeric, maxLength: maxLength(100), minLength: minLength(8) },
        price: { required, decimal, minValue: minValue(1), maxValue: maxValue(99999) },
        creationDate: { required },
        selectState: { required },
        selectSupplier: {},
        selectPriceReduction: {}
    },
    data(){
        return{
            code: null,
            description: '',
            price: null,
            creationDate: new Date().toISOString().slice(0,10),
            states: ["ACTIVE", "DISCOUNTED"],
            suppliers: [],
            priceReductions: [],
            selectState: "ACTIVE",
            selectSupplier: null,
            selectPriceReduction: null,
            created: false,
            dialog: false,
            user: null,
            supplier: {},
            priceReduction: {}
        }
    },
    router: router,
    created(){
        this.suppliers = getAllSuppliers();
        this.priceReductions = getAllPriceReductions();
        this.user = auth.getUserLogged();
        this.user.products = [];
    },
    methods:{
        async createProduct(){
            this.$v.$touch();
            if(this.code == null || this.description == null || this.price == null || this.creationDate == null || this.selectState == null){
                this.dialog = true
            }else{
                this.selectSupplier == null ? this.supplier = {} : this.supplier = await getSupplier(this.selectSupplier).then(res => { return res }),
                this.selectPriceReduction == null ? this.priceReduction = {} : 
                    this.priceReduction = await getPriceReduction(this.selectPriceReduction).then(res => { return res }),
                await createProduct(this.code, this.description, this.price, this.selectState, this.supplier, 
                    this.priceReduction, this.creationDate, this.user).then(res => this.created = res)
            }
        },
        clear(){
            this.$v.$reset();
            this.code = '';
            this.description = '';
            this.price = '';
            this.selectState = null;
            this.selectSupplier = null;
            this.selectPriceReduction = null;
        },
        cancelEdit(){
            router.go(-1);
        }
    },
    computed:{
        selectStateErrors () {
            const errors = [];
            if (!this.$v.selectState.$dirty) return errors;
            !this.$v.selectState.required && errors.push('State is required');
            return errors;
        },
        codeErrors () {
            const errors = [];
            if (!this.$v.code.$dirty) return errors;
            !this.$v.code.numeric && errors.push('Code must be numeric');
            !this.$v.code.minLength && errors.push('Code must be at most 5 digits long');
            !this.$v.code.required && errors.push('Code is required');
            return errors;
        },
        descriptionErrors () {
            const errors = [];
            if (!this.$v.description.$dirty) return errors;
            this.$v.description.numeric && errors.push('Description must not be numeric');
            !this.$v.description.minLength && errors.push('Description must be at least 20 characters long');
            !this.$v.description.maxLength && errors.push('Description must be at most 100 characters long');
            !this.$v.description.required && errors.push('Description is required');
            return errors;
        },
        priceErrors () {
            const errors = [];
            if (!this.$v.price.$dirty) return errors;
            !this.$v.price.required && errors.push('Price is required');
            !this.$v.price.minValue && errors.push('Price must be at least 0,1€');
            !this.$v.price.maxValue && errors.push('Price must be at most 99999€');
            return errors;
        },
    }
}
</script>
<style scoped>
    #form-create-div{
        margin: 0 5%;
        padding: 3% 0;
    }
    form{
        width: 60%;
        margin: 0 auto;
    }

    .alert{
        margin: 5% auto;
        width: 50%;
    }
    .alert a{
        color: white;
        font-weight: bold;
    }
</style>