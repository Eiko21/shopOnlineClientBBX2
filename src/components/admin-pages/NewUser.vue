<template>
    <div id="form-create-div">
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">User creation</v-card-title>
                <v-card-text>You must fill all the required fields.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">Accept</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <form method="POST" enctype="multiplart/form-data">
            <v-text-field v-model="username" :error-messages="usernameErrors" :counter="100" label="Username" required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field type="password" v-model="password" :error-messages="passwordErrors" :counter="150" label="password" required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>
            <v-select v-model="selectRole" :items="roles" :error-messages="selectRoleErrors" label="Role" item-text="rolename" required
                @change="$v.selectRole.$touch()"
                @blur="$v.selectRole.$touch()"
            ></v-select>
            <v-btn class="mr-4" @click="createUser()">Create user</v-btn>
            <v-btn class="mr-4" color="red" dark @click="cancelEdit()">Cancel</v-btn>
            <v-btn @click="clear">Clear inputs</v-btn>
        </form>
        <v-alert class="alert" type="success" v-if="created">The user has been created <b>SUCCESSFULLY</b>. 
            <a @click="cancelEdit()">Return to the user list.</a>
        </v-alert>
    </div>
</template>
<script>
import router from '../../router/router'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import createUser from '../../services/users/createUser'

export default {
    mixins: [validationMixin],
    name: 'NewUser',
    validations: {
        username: { required, minLength: minLength(5), maxLength: maxLength(100) },
        password: { required, minLength: minLength(10), maxLength: maxLength(100) },
        selectRole: { required }
    },
    router: router,
    data(){
        return{
            productCreated: [],
            username: '',
            password: '',
            selectRole: null,
            roles: ['USER','ADMIN'],
            dialog: false,
            created: false
        }
    },
    methods:{
        createUser(){
            let userCreated = {
                username: this.username,
                userpassword: this.password,
                role: this.selectRole,
                products: []
            }
            console.log(userCreated);
            this.username == null || this.password == null || this.selectRole == null 
            ? this.dialog = true 
            : createUser(this.username, this.password, this.selectRole)
                .then(res => this.created = res);
        },
        clear(){
            this.$v.$reset();
            this.username = '';
            this.password = '';
            this.selectRole = null;
        },
        cancelEdit(){
            router.go(-1);
        }
    },
    computed:{
        usernameErrors () {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.minLength && errors.push('Username must be at most 5 digits long');
            !this.$v.username.maxLength && errors.push('Username must be at most 100 characters long');
            !this.$v.username.required && errors.push('Username is required');
            return errors;
        },
        passwordErrors () {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.minLength && errors.push('Password must be at least 10 characters long');
            !this.$v.password.maxLength && errors.push('Password must be at most 100 characters long');
            !this.$v.password.required && errors.push('Password is required');
            return errors;
        },
        selectRoleErrors () {
            const errors = [];
            if (!this.$v.selectRole.$dirty) return errors;
            !this.$v.selectRole.required && errors.push('Role is required');
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