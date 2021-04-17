import TheLoginPage from './components/TheLoginComponent.js';
import TheSignupComponent from './components/TheSignupComponent.js';

import TheAllUsersPage from './components/TheAllUsersPage.js';
import TheAllMoviesPage from './components/TheAllMoviesComponent.js';

import TheHomePage from './components/TheHomeComponent.js';
import TheDetailsPage from './components/TheDetailsComponent.js';
import TheVideoPlayerPage from './components/TheVideoPlayerPage.js';

import TheMusicPage from './components/TheMusicPage.js';


const router = new VueRouter({
    routes: [
        {path: '/', name: 'root', component: TheLoginPage, beforeEnter: (to, from, next) => {
            if(localStorage.getItem('cacheduser')){
                let user = JSON.parse(localStorage.getItem('cacheduser'));
                next({name: 'home', params: {currentuser: user}});
            } else {
                next();
            }
        }},

        {path: '/signup', name: 'signup', component: TheSignupComponent},
        {path: '/users', name: 'users', component: TheAllUsersPage},
        {path: '/home', name: 'home', component: TheHomePage, props: true},
        {path: '/movies', name: 'movies', component: TheAllMoviesPage},
        {path: '/details', name: 'details', component: TheDetailsPage, props: true},
        {path: '/music', name: 'music', component: TheMusicPage},
        {path: '/video', name: 'video', component: TheVideoPlayerPage},
    ]
});

(() => {

    new Vue({
        data: {
            authenticated: false,
            currentUser: undefined,
            isAdmin: false,
        },

        created() {
            this.authenticateUser();
        },
        updated() {
            this.authenticateUser();
        },

        methods: {
            authenticateUser() {
                if(localStorage.getItem('cacheduser')){
                    this.currentUser = JSON.parse(localStorage.getItem('cacheduser'))
                    this.authenticated = true;

                    if(this.currentUser.user_admin > 0){
                        this.isAdmin = true;
                    }
                    if(this.currentUser.user_access <=2){
                        document.querySelector('#app').classList.add('kids');
                    } else {
                        document.querySelector('#app').classList.remove('kids');
                    }
                }
            },

            logout(){
                if(localStorage.getItem('cacheduser')){
                    localStorage.removeItem('cacheduser');
                }

                document.querySelector('#app').classList.remove('kids');
                this.currentUser = undefined;
                this.authenticated = false;
                this.isAdmin = false;

                this.$router.push({ name: "root"});
            }
        },
        router
    }).$mount("#app");

})();