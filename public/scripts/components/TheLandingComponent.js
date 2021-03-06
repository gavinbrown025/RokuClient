export default {
    name: 'TheLandingComponent',

    props:['featuredMovie'],

    template: `
        <section @mouseover="playPreview">
            <video ref="featurePreview" :src="'/api/movies/stream/' + featuredMovie.movies_trailer" alt="Featured Movie Trailer" autoplay loop muted></video>
            <div class="feature-info">
                <div class="feature-title">
                    <h3>{{featuredMovie.movies_title}}</h3>
                </div>
                <p class="feature-desc">{{featuredMovie.movies_storyline}}</p>
                <div class="feature-meta">
                    <a @click="showMovie(featuredMovie)" class="button">PLAY MOVIE</a>
                    <p class="movie-rating">{{featuredMovie.movies_year}}</p>
                    <span>|</span>
                    <p class="movie-runtime">{{featuredMovie.movies_runtime}}</p>
                </div>
            </div>
        </section>
    `,

    methods: {
        playPreview(){
            this.$refs.featurePreview.play();
        },
        showMovie(movie){
            window.localStorage.setItem('selectedMovie', JSON.stringify(movie));
            this.$router.push({ name: "details"});
        }
    }
}