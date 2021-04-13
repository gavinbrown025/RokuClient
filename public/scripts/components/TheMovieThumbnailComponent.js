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
            this.$router.push({ name: "details", params: {currentmovie: movie.movies_id}});
        }
    },
}
