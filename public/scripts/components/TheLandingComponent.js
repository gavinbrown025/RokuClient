export default {
    name: 'TheLandingComponent',

    props: ['movie'],

    template: `
        <section @mouseover="playPreview">
            <video ref="featurePreview" loop :src="'videos/' + movie.movies_trailer" alt="Featured Movie Trailer"></video>
            <div class="feature-info">
                <div class="feature-title">
                    <h3>{{movie.movies_title}}</h3>
                </div>
                    <p>{{movie.movies_storyline}}</p>
                <div class="feature-meta">
                    <a class="button">PLAY MOVIE</a>
                    <p class="movie-rating">{{movie.movies_year}}</p>
                    <span>|</span>
                    <p class="movie-runtime">{{movie.movies_runtime}}</p>
                </div>
            </div>

        </section>
    `,
    methods: {
        playPreview(){
            console.log('play');
            // this.$refs.featurePreview.volume =0;
            // this.$refs.featurePreview.play();
        }
    }
}