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
            console.log('in Thumbnail');
            this.$emit('showmovie', movie);
        }
    },
}
