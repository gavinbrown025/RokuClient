import TheHeader from './TheHeaderComponent.js';
import TheMovieThumbnail from './TheMovieThumbnailComponent.js';

export default {

    name: "AllMoviesPage",

    data() {
        return {
            currentUser: {},
            retrievedMedia: [],
            filter: null
        }
    },

    template:`
        <div class="allmovies-con">
            <theheader @logout="$emit('logout')"/>
            <div class="allmovies-filter-con">
                <h2 @click="setFilter(null)">Movies <span v-if="filter">> {{filter}}</span></h2>
                <div class="allmovies-filter">
                    <span @click="setFilter('Family')">Family</span>
                    <span> | </span>
                    <span @click="setFilter('Action')">Action</span>
                    <span> | </span>
                    <span @click="setFilter('Adventure')">Adventure</span>
                    <span> | </span>
                    <span @click="setFilter('Comedy')">Comedy</span>
                </div>
            </div>
            <div class="allmovies-gallery">
                <moviethumb class="allmovies-thumb" v-for="item in retrievedMedia" :movie="item" :key="item.id"></moviethumb>
            </div>
        </div>

    `,

    created() {
        this.currentUser = JSON.parse(localStorage.getItem('cacheduser'));
        this.loadMedia(null, this.currentUser.user_access);
    },

    methods:{
        setFilter(filter){
            this.filter = filter;
            if(filter === 'All'){
                this.loadMedia(null, this.currentUser.user_access);
            } else {
                this.loadMedia(filter, this.currentUser.user_access);
            }
        },
        loadMedia(filter, access){
            let url = (filter == null) ? `api/movies/${access}` : `api/movies/${access}/${filter}`;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.retrievedMedia = data;
            })
            .catch(err => console.log(err));
        },
    },
    components:{
        theheader: TheHeader,
        moviethumb: TheMovieThumbnail,
    }
}