import Cookies from 'js-cookie';

const SERVER_LOGIN_URL = 'http://localhost:8086/login';
const SERVER_REGISTER_URL = 'http://localhost:8086/register';
let user = {};

export default {
    setUserLogged(userLogged){
        Cookies.set('userLogged', userLogged);
    },
    getUserLogged(){
        return Cookies.get('userLogged') === undefined ? null : Cookies.get('userLogged').substring(13,20);
    },
    async login(username, password) {
        user = { username: username, password: password }

        const response = await fetch(SERVER_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await (response.status == 200 ? response.json() : Promise.reject(response.status));
    },
    async register(username,password){
        user = { username: username, password: password }

        const response = await fetch(SERVER_REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await (response.status == 200 ? response.json() : Promise.reject(response.status));
    },
    logout(){
        Cookies.remove('userLogged');
    }
}