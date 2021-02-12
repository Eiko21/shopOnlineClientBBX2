import Cookies from 'js-cookie'

const SERVER_LOGIN_URL = 'http://localhost:8086/login';
let user = {};

export default {
    setUserLogged(userLogged){
        Cookies.set('userLogged', userLogged);
    },
    getUserLogged(){
        return Cookies.get('userLogged') === undefined ? null : JSON.parse(Cookies.get('userLogged')).user;
    },
    login(username, password) {
        user = { username: username, userpassword: password }

        return fetch(SERVER_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( response => {
            return response.status == 200 ? response.json() : Promise.reject(response.status)
        })
        .then( userResult => { return userResult })
        .catch(err => { throw err });
    },
    logout(){
        Cookies.remove('userLogged');
    }
}