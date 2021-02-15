<template>
    <div id="form-login-div">
        <v-alert v-if="error" type="error">The username or password is incorrect</v-alert>
        <form method="POST" enctype="multiplart/form-data">
            <h2>Please sign in</h2>
            <v-text-field v-model="username" :error-messages="usernameErrors" label="Username" required autofocus
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
            ></v-text-field>
            <v-text-field type="password" v-model="password" :error-messages="passwordErrors" label="Password" required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>
            <v-btn class="mr-4" @click="login()">Sign in</v-btn>
        </form>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import auth from '../../auth/auth.services'
import cloneDeep from 'lodash.clonedeep'
import router from '../../router/router'

export default {
    mixins: [validationMixin],
    name: 'Login',
    validations: {
        username: { required },
        password: { required },
    },
    data(){
        return {
            username: "",
            password: "",
            error: false,
            user: {}
        }
    },
    router: router,
    methods:{
        login(){
            this.$v.$touch();
            auth.login(this.username,this.password)
            .then( res => {
                this.user = cloneDeep(res)
                const userCookie = { user: this.user };
                auth.setUserLogged(userCookie);
                this.$router.push({ name: "Products" });
            })
            .catch(() => { this.error = true });
        }
    },
    computed:{
        usernameErrors () {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.required && errors.push('The username is required');
            return errors;
        },
        passwordErrors () {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('The password is required');
            return errors;
        },
    }
}
</script>
<style scoped>
    #form-login-div{
        margin: 0 5%;
        padding: 3% 0;
    }
    form{
        width: 50%;
        margin: 5% auto;
    }
</style>