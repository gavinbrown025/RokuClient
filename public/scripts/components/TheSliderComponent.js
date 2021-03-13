import TheMovieThumbnail from './TheMovieThumbnailComponent.js';

export default {
    name: "TheSliderComponent",

    props: ['era'],

    template:`
    <section>
        <h2 class="catagory-title">{{era.title}}</h2>
        <div class="swiper-wrapper">
            <moviethumb @show-movie="showMovie" v-for="item in era.movies" :movie="item" :key="item.id" class="swiper-slide"></moviethumb>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <div class="swiper-pagination"></div>
    </section>

    `,
    methods: {
        showMovie(movie){
            console.log('from the slider')
            this.$emit('show-movie', movie);
        }
    },

    components: {
        moviethumb: TheMovieThumbnail,
    }
}