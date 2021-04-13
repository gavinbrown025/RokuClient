import TheHeader from './TheHeaderComponent.js';
export default {
    name: 'MovieDetailsComponent',

    props: ['currentmovie'],

    data() {
        return ({
            selectedMovie:{}
        })
    },

    created() {
         fetch(`api/movies/${this.currentmovie}`)
            .then(res => res.json())
            .then(data => {
                this.selectedMovie = data;
            })
            .catch(err => console.log(err));
    },

    template: `
        <section>
            <theheader @logout="$emit('logout')" />
            <section class="movie-details-con">
                <div class="preview-con">
                    <video :src="'videos/'+currentmovie.movies_trailer"></video>
                    <a class="button">PLAY MOVIE</a>
                    <img src="" alt="" class="mute-btn">
                </div>
                <div class="moviedetails">
                    <h1>{{currentmovie.movies_title}}</h1>
                    rating | year | runtime
                    Description |

                    cast | genres | studio | director
                </div>
            </section>
        </section>
    `,
    components:{
        theheader: TheHeader,
    }
}