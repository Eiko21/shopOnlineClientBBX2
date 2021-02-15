<template>
    <div class="home-body">
        <div class="logo">
            <img src="logo.png">
        </div>
        <div class="body">
            <h1>Welcome to ShopOnline</h1>
            <router-link :to="{ name: 'Login' }" v-if="userLogged == null">
                <v-btn class="ma-2" color="secondary">Sign in</v-btn>
            </router-link>
            <router-link :to="{ name: 'Products' }" v-else>
                <v-btn class="ma-2" color="secondary">Show products</v-btn>
            </router-link>
        </div>
    </div>
</template>
<script>
import auth from '../auth/auth.services'

export default {
    name: 'Home',
    data(){
        return {
            userLogged: auth.getUserLogged()
        }
    }
}
</script>
<style scoped>
    .home-body{
        margin: 8% auto;
        display: grid;
        grid-template-areas: "logo body";
    }

    .logo{
        grid-area: logo;
    }
    img{
        width: 80%;
        border-radius: 25%;
    }

    .body{
        grid-area: body;
        display: grid;
        grid-gap: 20px;
        grid-template-areas: "title"
                            "button";
    }
    .body h1{
        display: flex;
        text-align: center;
        align-content: center;
        align-items: center;
    }
    .body a{
        margin: 0 auto;
    }
</style>