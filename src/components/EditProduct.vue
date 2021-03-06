<template>
    <div id="form-edit-div">
        <v-alert type="error" class="alert" v-if="error">Only the product creator can edit this product. 
            <a id="error-link" @click="cancelEdit()">Click here to return to the previous page.</a>
        </v-alert>

        <v-dialog v-model="dialog" persistent max-width="290" >
            <v-card>
                <v-card-title class="headline">Product edition</v-card-title>
                <v-card-text>No fields have been modified.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Accept</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <form enctype="multiplart/form-data">
            <v-text-field v-model="code" :error-messages="codeErrors" :counter="5" label="Code" required
                @input="$v.code.$touch()"
                @blur="$v.code.$touch()"
            ></v-text-field>
            <v-text-field v-model="description" :error-messages="descriptionErrors" :counter="100" label="Description" required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
            ></v-text-field>
            <v-text-field v-model="price" :error-messages="priceErrors" :counter="99999" label="Price (€)"
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
            <v-text-field v-model="creator" label="Creator" required readonly></v-text-field>
            <v-btn class="mr-4" @click="updateProduct()" v-if="!error">Edit product</v-btn>
            <v-btn class="mr-4" color="red" dark @click="cancelEdit()" v-if="!error">Cancel</v-btn>
        </form>

        <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
                <v-card-title>You have changed the product state to DISCONTINUED.</v-card-title>
                <v-card-text>
                    <v-select v-model="reasonSelected" :items="reasons" :error-messages="selectReasonErrors" label="Select a reason" item-text="reason" 
                        item-value="reasonid" required @change="$v.reasonSelected.$touch()" @blur="$v.reasonSelected.$touch()">
                    </v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="updateProduct()">Save option</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-alert class="alert" type="success" v-if="updated">The product has been edited successfully. 
            <a @click="cancelEdit()">Come back to see the product.</a>
        </v-alert>
    </div>
</template>
<script>
import router from '../router/router'
import cloneDeep from 'lodash.clonedeep'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, decimal, numeric, minValue, maxValue } from 'vuelidate/lib/validators'
import getAllSuppliers from '../services/getSuppliersList'
import getAllPriceReductions from '../services/getPriceReductionList'
import getProduct from '../services/getProduct'
import getPriceReduction from '../services/getPriceReduction'
import getSupplier from '../services/getSupplier'
import updateProductSelected from '../services/updateProduct'
import auth from '../auth/auth.services'

export default {
    mixins: [validationMixin],
    name:'EditProduct',
    validations: {
        code: { required, numeric, minLength: minLength(4) },
        description: { required, maxLength: maxLength(100), minLength: minLength(8) },
        price: { decimal, minValue: minValue(1), maxValue: maxValue(99999) },
        creationDate: { required },
        selectState: { required },
        selectSupplier: {},
        selectPriceReduction: {},
        reasonSelected: { required }
    },
    data() {
        return {
            product: {},
            idproduct: router.app.$route.params.id,
            code: null,
            description: '',
            price: null,
            creationDate: new Date().toISOString().slice(0,10),
            states: ["ACTIVE", "DISCONTINUED"],
            suppliers: [],
            priceReductions: [],
            selectState: "ACTIVE",
            selectSupplier: null,
            selectPriceReduction: null,
            creator: null,
            updated: false,
            showDialog: false,
            reasons: [
                { reason: "Termination of the contract with the supplier", reasonid: 0},
                { reason: "Out of sale, temporarily", reasonid: 1},
                { reason: "Bad condition of the product", reasonid: 2},
            ],
            reasonSelected: null,
            error: false,
            userLogged: auth.getUserLogged().username,
            dialog: false,
            supplier: {},
            priceReduction: {}
        }
    },
    router: router,
    created(){
        this.getProductToEdit();
        this.suppliers = getAllSuppliers();
        this.priceReductions = getAllPriceReductions();
    },
    methods:{
        getProductToEdit(){             
            getProduct(this.idproduct)
            .then(res => this.product = cloneDeep(res) )
            .then( () => {
                this.code = this.product.code
                this.description = this.product.description;
                this.price = this.product.price;
                this.selectState = this.product.state;
                this.selectSupplier = this.product.suppliers == null ? {} : this.product.suppliers;
                this.selectPriceReduction = this.product.priceReductions == null ? {} : this.product.priceReductions;
                this.creationDate = this.product.creationDate;
                this.creator = this.product.creator.username;

                this.product.creator.username == this.userLogged ?  this.error = false : this.error = true;
            });
        },
        async updateProduct(){
            this.$v.$touch()

            if(this.code !== this.product.code || this.description !== this.product.description || this.price !== this.product.price
            || this.selectState !== this.product.state || this.selectSupplier !== this.product.suppliers || this.selectPriceReduction !== this.product.priceReductions 
            || this.creationDate !== this.product.creationDate){
            
                if(this.selectState != this.product.state && !this.showDialog && this.product.creator.username == this.userLogged){
                    this.showDialog = true
                }else{
                    typeof(this.selectSupplier) != 'object' 
                    ? this.supplier = await getSupplier(this.selectSupplier).then(res => { return res }) : this.supplier = null
                    typeof(this.selectPriceReduction) != 'object' 
                    ? this.priceReduction = await getPriceReduction(this.selectPriceReduction).then(res => { return res }) : this.priceReduction = null
                    await updateProductSelected(this.idproduct, this.code, this.description, this.price, this.selectState, this.supplier, 
                        this.priceReduction, this.creationDate, this.product.creator, this.reasonSelected)
                        .then(res => {
                            this.updated = res;
                            this.showDialog = false;
                        })
                }
            }else this.dialog = true;
        },
        cancelEdit(){
            router.go(-1);
        }
    },
    computed:{
        selectStateErrors () {
            const errors = []
            if (!this.$v.selectState.$dirty) return errors
            !this.$v.selectState.required && errors.push('State is required')
            return errors
        },
        selectReasonErrors () {
            const errors = []
            if (!this.$v.reasonSelected.$dirty) return errors
            !this.$v.reasonSelected.required && errors.push('Reason is required')
            return errors
        },
        codeErrors () {
            const errors = []
            if (!this.$v.code.$dirty) return errors
            !this.$v.code.numeric && errors.push('Code must be numeric')
            !this.$v.code.minLength && errors.push('Code must be at most 5 digits long')
            !this.$v.code.required && errors.push('Code is required')
            return errors
        },
        descriptionErrors () {
            const errors = []
            if (!this.$v.description.$dirty) return errors
            !this.$v.description.minLength && errors.push('Description must be at least 20 characters long')
            !this.$v.description.maxLength && errors.push('Description must be at most 100 characters long')
            !this.$v.description.required && errors.push('Description is required')
            return errors
        },
        priceErrors () {
            const errors = []
            if (!this.$v.price.$dirty) return errors
            !this.$v.price.minValue && errors.push('Price must be at least 1€')
            !this.$v.price.maxValue && errors.push('Price must be at most 99999€')
            return errors
        },
    }
}
</script>
<style scoped>
    #form-edit-div{
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

    #error-link{
        color: white;
        font-weight: bold;
    }
</style>