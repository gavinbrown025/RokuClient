import TheLanding from './TheLandingComponent.js';
import TheSlider from './TheSliderComponent.js';
import TheHeader from './TheHeaderComponent.js';

export default {

    name: 'TheHomePage',

    data() {
        return {
            currentUser: undefined,
            retrievedMedia: [],
            currentMedia: {},
            sortedMedia: [],
        }
    },

    created() {
        this.currentUser = JSON.parse(localStorage.getItem('cacheduser'))
        if(!this.currentUser) {
            this.$router.replace({ name: 'root'})
        }

        fetch('api/genre')
        .then(res => res.json())
        .then(data => {
            data.forEach(genre => {
                this.sortedMedia.push({genre: genre.genre_name, id: genre.genre_id, movies:[]});
            });
        });

        this.loadMedia(this.currentUser.user_access);
    },

    methods:{
        loadMedia(rating){
            let url = `api/movies/${rating}`;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.retrievedMedia = data;
                this.currentMedia = data[Math.floor(Math.random() * data.length)];

                this.sortMedia(data);
            })
            .catch(err => console.log(err));
        },

        sortMedia(data) {
            data.forEach(movie =>{
                movie.movies_genre.forEach(moviegenre => {
                    this.sortedMedia.forEach((genre, index) =>{
                        if(moviegenre == genre.genre){
                            this.sortedMedia[index].movies.push(movie);
                        }
                    })
                });
            });
        }
    },

    template:`
        <div>
            <section class="landing">
                <theheader @logout="$emit('logout')"></theheader>
                <landing :featuredMovie="currentMedia" key="currentMedia.movies_name" class="landing-hero"></landing>
            </section>
            <sliders :media="sortedMedia"></sliders>
        </div>
    `,

    components:{
        theheader: TheHeader,
        landing: TheLanding,
        sliders: TheSlider,
    }

}
