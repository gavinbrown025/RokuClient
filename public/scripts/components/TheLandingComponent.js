export default {
    name: 'TheLandingComponent',

    template: `
        <section @mouseover="playPreview">
            <video ref="featurePreview" :src="'videos/' + featuredMovie.movies_trailer" alt="Featured Movie Trailer" loop muted></video>
            <div class="feature-info">
                <div class="feature-title">
                    <h3>{{featuredMovie.movies_title}}</h3>
                </div>
                <p class="feature-desc">{{featuredMovie.movies_storyline}}</p>
                <div class="feature-meta">
                    <a class="button">PLAY MOVIE</a>
                    <p class="movie-rating">{{featuredMovie.movies_year}}</p>
                    <span>|</span>
                    <p class="movie-runtime">{{featuredMovie.movies_runtime}}</p>
                </div>
            </div>
        </section>
    `,
    data() {
        return ({
            featuredMovie: {},
        })
    },

    created: function() {
        //* Get featured movie
        fetch('/api/movies/8')
        .then(res => res.json())
        .then(data =>{this.featuredMovie = data;})
        .catch(err => console.log(err));
    },

    methods: {
        playPreview(){
            this.$refs.featurePreview.play();
        }
    }
}