
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

import TheHeader from './components/TheHeaderComponent.js';
import TheLoginPage from './components/TheLoginComponent.js';
import TheUsersPage from './components/TheUsersComponent.js';
import TheLanding from './components/TheLandingComponent.js';
import TheSlider from './components/TheSliderComponent.js';
import TheMovieThumbnail from './components/TheMovieThumbnailComponent.js';


const router = new VueRouter({
    routes: [
        {path: '/', name: 'root', component: TheLoginPage},
        {path: '/users', name: 'users', component: TheUsersPage},
        {path: '/home', name: 'home', component: TheLanding},
    ]
});

(() => {

    let vm = new Vue({

        data: {
            authenticated: false,
            user: "",
            featuredMovie: {},
            allMovies: [],
            moviesByYear: {
                moviesNew: {
                    title: 'New Movies',
                    movies: []
                },
                movies00s: {
                    title: 'Movies from the 2000s',
                    movies: []
                },
                movies90s: {
                    title: 'Movies from the 1990s',
                    movies: []
                },
                movies80s: {
                    title: 'Movies from the 1980s',
                    movies: []
                },
                moviesOld: {
                    title: 'Vintage Movies',
                    movies: []
                },
            },
        },

        created: function(){

            if (window.localStorage.getItem('creds')) {

                this.authenticated = true;
                this.user = JSON.parse(window.localStorage.getItem('creds')).name;

                //* Get all movies
                fetch('/api/movies')
                .then(res => res.json())
                .then(data =>{

                    data.forEach(movie => {
                        this.allMovies.push(movie);

                //? change the date scopes when get new movie content
                        if (movie.movies_year >= 2016){
                            this.moviesByYear.moviesNew.movies.push(movie);
                        }
                        if (movie.movies_year == 2015){
                            this.moviesByYear.movies00s.movies.push(movie);
                        }
                        if (movie.movies_year == 2014){
                            this.moviesByYear.movies90s.movies.push(movie);
                        }
                        if (movie.movies_year == 2013){
                            this.moviesByYear.movies80s.movies.push(movie);
                        }
                        if (movie.movies_year <= 2012) {
                            this.moviesByYear.moviesOld.movies.push(movie);
                        }
                    });
                }).catch(err => console.log(err));


                //* Get featured movie
                fetch('/api/movies/8')
                .then(res => res.json())
                .then(data =>{this.featuredMovie = data;})
                .catch(err => console.log(err));
            }

        },

        mounted() {

        },

        methods: {
            showMovie(movie){
                console.log(movie,  ' from the main boi');
            },
        },

        components: {
            //theheader: TheHeader,
            //login: TheLoginPage,
            //landing: TheLanding,
            //!signup: TheSignupPage,
            //!users: TheUserPage,
            //slider: TheSlider,
            //moviethumb: TheMovieThumbnail,
            //!movieinfo: TheMoviePage,
            //!movieplayer: TheMoviePlayer,
        },
        router
    }).$mount("#app");



    //! make less ugly
    setTimeout(() => {
        const swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            centeredSlides: true,
            slidesPerView: '2',
            loop: true,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }, 500);


})();