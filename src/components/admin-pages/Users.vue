<template>
    <div>
        <div class="new-user-btn">
            <router-link :to="{ name: 'NewUser' }" class="link-create">
                <v-btn class="mx-2" fab dark color="primary" >
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </router-link>
        </div>
        <v-card class="table-structure">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Username</th>
                            <th class="text-left">Role</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.userid">
                            <td>{{ user.username }}</td>
                            <td>{{ user.role }}</td>
                            <td>
                                <v-icon small @click="dialog = true">mdi-delete</v-icon>
                            </td>
                            <v-dialog v-model="dialog" persistent max-width="290">
                                <v-card>
                                    <v-card-title class="headline">Delete Product</v-card-title>
                                    <v-card-text>Are you sure you want to delete this product?</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
                                        <v-btn color="green darken-1" text @click="deleteUserSelected(user.userid)">Confirm</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            
        </v-card>
    </div>
</template>
<script>
import getUsers from '../../services/users/getUsers'
import deleteUser from '../../services/users/deleteUser'

export default {
    name: 'Users',
    data(){
        return{
            headers: [ 
                { text: 'Username' }, 
                { text: 'Role' },
                { text:  '' }
            ],
            search: '',
            users: [],
            dialog: false
        }
    },
    created(){
        this.initialize();
    },
    methods: {
        initialize(){
            this.users = getUsers();
        },
        deleteUserSelected(userid){
            deleteUser(userid)
            .then(() => {
                this.dialog = false;
                this.users.splice(-1, 1);
            })
        },
    }
}
</script>
<style scoped>
    .new-user-btn{
        margin-left: 4%;
        padding: 2%;
    }

    .table-structure{
        margin: 5% auto;
        width: 70%;
    }
</style>