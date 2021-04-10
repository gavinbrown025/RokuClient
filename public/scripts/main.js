import TheLoginPage from './components/TheLoginComponent.js';
import TheAllUsersPage from './components/TheAllUsersPage.js';
import TheHomePage from './components/TheHomeComponent.js';


const router = new VueRouter({
    routes: [
        {path: '/', name: 'root', component: TheLoginPage},
        {path: '/users', name: 'users', component: TheAllUsersPage},
        {path: '/home', name: 'home', component: TheHomePage},
    ]
});

(() => {

    let vm = new Vue({
        data: {
            authenticated: false,
        },
        created: function(){
            if (window.localStorage.getItem('creds')) {
                this.authenticated = true;
                this.user = JSON.parse(window.localStorage.getItem('creds')).name;
            }
        },
        methods: {
            logout(){
                if(localStorage.getItem('cacheduser')){
                    localStorage.deleteItem('cacheduser');
                }
            }
        },
        router
    }).$mount("#app");

})();