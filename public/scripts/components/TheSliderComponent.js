import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

import TheMovieThumbnail from './TheMovieThumbnailComponent.js';

export default {
    name: "TheSliderComponent",

    data() {
        return ({
            allMovies: [],
            moviesByYear: {
                moviesNew: {
                    title: 'New Movies',
                    movies: []
                },
                movies00s: {
                    title: "00's Movies",
                    movies: []
                },
                movies90s: {
                    title: "90's Movies",
                    movies: []
                },
                movies80s: {
                    title: "80's Movies",
                    movies: []
                },
                moviesOld: {
                    title: 'Vintage Movies',
                    movies: []
                },
            },
        })
    },
    created(){
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
    },

    template:`
        <section class="slider" >
            <div v-for="era in moviesByYear">
                <h2 class="catagory-title">{{era.title}}</h2>

                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <moviethumb class="swiper-slide" @showmovie="showMovie" v-for="item in era.movies" :movie="item" :key="item.id"></moviethumb>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>

                </div>
            </div>
        </section>
    `,
    mounted() {
        setTimeout(() => {
            new Swiper('.swiper-container', {
                spaceBetween: 16,
                loop: true,
                slidesPerView: 2,
                //centeredSlides: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        loop: false,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                    },
                }
            });
        }, 800);
    },

    methods: {
        showMovie(movie){
            console.log(movie);
        }
    },

    components: {
        moviethumb: TheMovieThumbnail,
    }
}