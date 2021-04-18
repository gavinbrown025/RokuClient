import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'
import TheMovieThumbnail from './TheMovieThumbnailComponent.js';

export default {
    name: "TheSliderComponent",

    props:['media'],

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

    template:`
        <section class="slider" >
            <div v-if="genre.movies.length" v-for="genre in media">
                <h2 class="catagory-title">{{genre.title}}</h2>

                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <moviethumb v-for="item in genre.movies" class="swiper-slide" :movie="item" :key="item.id"></moviethumb>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>

                </div>
            </div>
        </section>
    `,

    components: {
        moviethumb: TheMovieThumbnail,
    }
}