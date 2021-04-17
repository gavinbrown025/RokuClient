import TheHeader from './TheHeaderComponent.js';
import TheComments from './TheCommentComponent.js';
export default {
    name: 'MovieDetailsComponent',

    data() {
        return ({
            selectedMovie:{},
            volume: 1,
        })
    },

    created() {

        let pushedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

         fetch(`api/movies/select/${pushedMovie.movies_id}`)
            .then(res => res.json())
            .then(data => {
                this.selectedMovie = data;
            })
            .catch(err => console.log(err));
    },

    template: `
        <div>
            <section class="details-con">
                <theheader @logout="$emit('logout')" />

                <div class="details-video-con">
                    <video autoplay loop ref="preiviewPlayer" :src="'videos/'+selectedMovie.movies_trailer"></video>
                    <img v-if="volume == 0" src="images/mute.svg" @click="mute" class="mute-btn">
                    <img v-else src="images/sound.svg" @click="mute" class="mute-btn">
                </div>

                <div class="details-info-con">
                    <div class="details-play">
                        <h2>{{selectedMovie.movies_title}}</h2>
                        <router-link :to="{name: 'video'}" class="button">PLAY MOVIE</router-link>
                    </div>

                    <div class="details-info">
                        <p class="details-info-main">
                            <span>{{selectedMovie.movies_urating}} Liked</span>
                            <span>{{selectedMovie.movies_year}}</span>
                            <span>{{selectedMovie.movies_arating}}</span>
                            <span>{{selectedMovie.movies_runtime}}</span>
                        </p>
                        <p class="details-info-desc">
                            {{selectedMovie.movies_storyline}}
                        </p>
                        <p>Genres: <span v-for="genre in selectedMovie.movies_genre">{{genre}}, </span></p>
                    </div>

                    <div class="details-info-meta">
                        <p>Cast:<br> <span v-for="actor in selectedMovie.movies_cast">{{actor}}, </span></p>
                        <p>Director: <span>{{selectedMovie.movies_director}}</span></p>
                        <p>Studio: <span>{{selectedMovie.movies_studio}}</span></p>
                    </div>
                </div>
                <comments :movie="selectedMovie.movies_id" :key="selectedMovie.movies_id" />
            </section>
        </div>
    `,

    mounted() {
        this.$refs.preiviewPlayer.volume = this.volume;
    },

    methods:{
        mute(){
            if(this.volume > 0){
                this.volume = 0;
            } else {
                this.volume = 1;
            }
            this.$refs.preiviewPlayer.volume = this.volume;
        }
    },
    components:{
        theheader: TheHeader,
        comments: TheComments
    }
}