import TheHeader from './TheHeaderComponent.js';

export default {
    name: 'TheMusicPage',

      data() {
        return ({
            current: {},
            index: 0,
            isPlaying: false,
            songs: [],
            player: new Audio(),
            query: "",
            currentTime: 0,
        })
    },

    template:`
    <div class="music-wrapper">
        <section class="player">
            <theheader @logout="$emit('logout')" />
            <h2 v-if="songs.length" class="song-title">{{current.artist.name}} - {{current.title}}</h2>
            <h2 class="song-title" v-else>Search for Songs below</h2>

            <div class="song-img">
                <img v-if="current.album" :src="current.album.cover_big" alt />
            </div>

            <div class="controls">
                <img src="images/prev.svg" class="prev" @click="prev" />
                <img src="images/play.svg" class="play" @click="play" v-if="!isPlaying" />
                <img src="images/pause.svg" class="pause" @click="pause" v-else />
                <img src="images/next.svg" class="next" @click="next" />
            </div>

            <div class="song-time">
                <span class="time">{{ getCurrentTime(currentTime) }}</span>
                <input type="range" value="0" class="time-bar" ref="timePos" />
                <span v-if="current.duration" class="time">{{ getCurrentTime(current.duration) }}</span>
                <span v-else class="time">00:00</span>
            </div>
        </section>

        <form @submit.prevent="search" class="search">
            <input v-model="query" type="text" class="search-bar" placeholder="i.e beatles" />
            <img @click="search" src="images/search.svg" alt="search icon">
        </form>

        <section class="playlist">
            <div
            v-for="song in songs"
            :key="song.id"
            @click="play(song)"
            :class="(song.id == current.id) ? 'song playing' : 'song' ">
                <p>{{song.artist.name}} - {{song.title}}</p>
                <span>{{getCurrentTime(song.duration)}}</span>
            </div>
        </section>
    </div>
    `,
    mounted() {
        this.addEventListener();
    },

    methods: {
        search() {
            fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${this.query}`,{
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                    "d55cc2858emshaf6c4e0c55f5035p1894a7jsn1f499c69d3bb",
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                }
            })
            .then(res => res.json())
            .then(data => {

                this.songs = data.data;
                this.current = this.songs[this.index];
                this.player.src = this.current.preview;
             })
            .catch((err) => {
                console.error(err);
            });
        },

        play(song) {
        if (typeof song.preview != "undefined") {
            this.current = song;
            this.index = song.index;
            this.player.src = this.current.preview;
        }

        this.player.play();
        this.player.addEventListener("ended", this.next);

        this.isPlaying = true;
        },

        pause() {
        this.player.pause();
        this.isPlaying = false;
        },

        next() {
        this.index++;
        if (this.index >= this.songs.length - 1) {
            this.index = 0;
        }
        this.current = this.songs[this.index];
        this.play(this.current);
        },

        prev() {
        this.index--;
        if (this.index < 0) {
            this.index = this.songs.length - 1;
        }
        this.current = this.songs[this.index];
        this.play(this.current);
        },

        removeSong(e) {
        this.songs = this.songs.filter((song) => song.id !== e.id);
        },

        getCurrentTime(time) {
        let minute = Math.floor(time / 60);
        let second = Math.floor(time - minute * 60);
        second = second > 9 ? second : `0${second}`;
        minute = minute > 9 ? minute : `0${minute}`;
        let formatTime = `${minute}:${second}`;
        return formatTime;
        },

        timeTrack() {
        this.$refs.timePos.value =
            (this.player.currentTime / this.current.duration) * 100;

        this.currentTime = this.player.currentTime;
        },

        updatePlayTime(e) {
        let scrubTime = (e.target.value * this.current.duration) / 100;
        this.player.currentTime = scrubTime;
        },

        addEventListener() {
        this.player.addEventListener("timeupdate", this.timeTrack);
        this.$refs.timePos.addEventListener("input", this.updatePlayTime);
        },
    },
    components:{
        theheader: TheHeader,
    }
}