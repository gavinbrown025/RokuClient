import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

import TheMovieThumbnail from './components/TheMovieThumbnailComponent.js';
import TheSlider from './components/TheSliderComponent.js';
import TheLoginPage from './components/TheLoginComponent.js';

(() => {

    let vm = new Vue({

        data: {
            authenticated: false,
            user: "",
            featuredMovies: [],
            allMovies: [],
            moviesByYear: {
                moviesNew: [],
                movies00s: [],
                movies90s: [],
                movies80s: [],
                moviesOld: [],
            },
        },

        created: function(){

            if (window.localStorage.getItem('creds')) {

                this.authenticated = true;
                this.user = JSON.parse(window.localStorage.getItem('creds')).name;


                fetch('/api/movies')
                .then(res => res.json())
                .then(data =>{

                    data.forEach(movie => {
                        this.allMovies.push(movie);

                        if (movie.movies_year >= 2016){
                            this.moviesByYear.moviesNew.push(movie);
                        }
                        if (movie.movies_year == 2015){
                            this.moviesByYear.movies00s.push(movie);
                        }
                        if (movie.movies_year == 2014){
                            this.moviesByYear.movies90s.push(movie);
                        }
                        if (movie.movies_year == 2013){
                            this.moviesByYear.movies80s.push(movie);
                        }
                        if (movie.movies_year <= 2012) {
                            this.moviesByYear.moviesOld.push(movie);
                        }
                    });

                }).catch(err => console.log(err));


                fetch('/api/featured')
                .then(res => res.json())
                .then(data =>{
                    data.forEach(feature => {
                        this.featuredMovies.push(feature);
                    });
                }).catch(err => console.log(err));
            }

        },
        mounted() {

        },

        methods: {
            userDeny(e){
                console.log('e');
            }

        },

        components: {
            moviethumb: TheMovieThumbnail,
            login: TheLoginPage,
            slider: TheSlider,
        }

    }).$mount("#app");


    const swiper = new Swiper('.swiper-container', {

        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: '3',
        coverflowEffect: {
            loop: true,
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
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

})();
