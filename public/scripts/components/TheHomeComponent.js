import TheLanding from './TheLandingComponent.js';
import TheSlider from './TheSliderComponent.js';
import TheHeader from './TheHeaderComponent.js';

export default {

    name: 'TheHomePage',

    data() {
        return {
            currentuser:{},
            retrievedMedia: [],
            currentMedia: {},
            sortedMedia: {
                moviesNew: {
                    title: 'New Movies',
                    movies: []
                },
                movies00s: {
                    title: "00's Movies",
                    movies: []
                },
                movies90s: {
                    title: "90's Movies",
                    movies: []
                },
                movies80s: {
                    title: "80's Movies",
                    movies: []
                },
                moviesOld: {
                    title: 'Vintage Movies',
                    movies: []
                },
            },
        }
    },

    created() {
        this.loadMedia(null, 'movies');
        if(this.currentuser){
            this.$emit('setuser', this.currentuser);
        }
    },

    methods:{
        loadMedia(filter, mediaType){
            let url = (filter == null) ? `api/${mediaType}` : `api/${mediaType}/${filter}`;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                data.forEach(movie => {
                    this.retrievedMedia.push(movie);
                });

                //*pick random
                this.currentMedia = data[Math.floor(Math.random() * data.length)];

                this.sortMedia(data);
            })
            .catch(err => console.log(err));
        },

        sortMedia(data) {
            data.forEach(movie => {
                if (movie.movies_year >= 2016){
                    this.sortedMedia.moviesNew.movies.push(movie);
                }
                if (movie.movies_year == 2015){
                    this.sortedMedia.movies00s.movies.push(movie);
                }
                if (movie.movies_year == 2014){
                    this.sortedMedia.movies90s.movies.push(movie);
                }
                if (movie.movies_year == 2013){
                    this.sortedMedia.movies80s.movies.push(movie);
                }
                if (movie.movies_year <= 2012) {
                    this.sortedMedia.moviesOld.movies.push(movie);
                }
            });
        },
    },

    template:`
        <div>
            <section class="landing">

                <theheader
                    @logout="$emit('logout')">
                </theheader>

                <landing :featuredMovie="currentMedia" key="currentMedia.movies_name" class="landing-hero"></landing>
            </section>

            <sliders :moviesByYear="sortedMedia">
            </sliders>
        </div>
    `,

    components:{
        theheader: TheHeader,
        landing: TheLanding,
        sliders: TheSlider,
    }

}
