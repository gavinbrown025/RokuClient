export default {
    name: 'TheMovieThumbnail',

    props: ['movie'],

    template: `
        <div>
            <img @click="showMovie(movie)" :src="'images/' + movie.movies_cover" alt="movie thumb">
        </div>
    `,

    methods: {
        showMovie(movie){
            window.localStorage.setItem('selectedMovie', movie.movies_id);
            this.$router.push({ name: "details"});
        }
    },
}
