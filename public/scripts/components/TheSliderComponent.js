import TheMovieThumbnail from './TheMovieThumbnailComponent.js';

export default {
    name: "TheSliderComponent",

    props: ['era'],

    template:`
    <section class="swiper-container">
        <div class="swiper-wrapper">
            <moviethumb v-for="item in era" :movie="item" :key="item.id" @click="showMovie" class="swiper-slide"></moviethumb>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <div class="swiper-pagination"></div>
    </section>

    `,
    methods: {
        showMovie(movie){
            this.$emit('showMovie', movie);
        }
    },

    components: {
            moviethumb: TheMovieThumbnail,
    }
}