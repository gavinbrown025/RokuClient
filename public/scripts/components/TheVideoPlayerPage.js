export default {
    name: 'TheVideoPlayer',

    data() {
        return ({
            currentMovie: {},
            isPlaying: true,
            currentTime: 0,
            volume: 100,
            player: HTMLVideoElement
        })
    },

    created() {
        this.currentMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    },

    mounted() {
        this.player = this.$refs.mainVideo;
        this.addEventListener();
    },

    template: `
        <section :player="player" class="video-player">
            <video autoplay ref="mainVideo" class="main-video" :src="'videos/'+currentMovie.movies_trailer"></video>

            <div class="video-overlay-info">
                <div class="video-topbar">
                    <h2>{{currentMovie.movies_title}}</h2>
                    <router-link to="/details">
                        <img src="images/backarrow.svg" alt=""/>
                        <span>Back</span>
                    </router-link>
                </div>

                <div class="video-controls-con">
                    <div class="video-time">
                        <span class="time">{{ getCurrentTime(currentTime) }}</span>
                        <input type="range" value="0" class="time-bar" ref="timePos" />
                        <span v-if="player.duration" class="time">{{ getCurrentTime(player.duration) }}</span>
                        <span v-else class="time">00:00</span>
                    </div>

                    <div class="video-controls">
                        <img src="images/play.svg" class="play" @click="play" v-if="!isPlaying" />
                        <img src="images/pause.svg" class="pause" @click="pause" v-else />
                        <img src="images/stop.svg" class="stop" @click="stop" />
                        <img v-if="volume == 0" src="images/mute.svg" @click="mute" class="mute-btn">
                        <img v-else src="images/sound.svg" @click="mute" class="mute-btn">
                        <input class="volume-bar" type="range" value="100" @input="volumeSet">
                    </div>
                </div>

            </div>

        </section>
    `,

    methods: {
        play() {
            this.player.play();
            this.isPlaying = true;
        },
        pause() {
            this.player.pause();
            this.isPlaying = false;
        },
        stop() {
            this.player.pause();
            this.player.currentTime = 0;
            this.isPlaying = false;
        },
        mute(){
            if(this.volume > 0){
                this.volume = 0;
            } else {
                this.volume = 1;
            }
            this.player.volume = this.volume;
        },
        volumeSet(e){
            this.volume = e.target.value / 100;
            this.player.volume = this.volume;
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
            this.$refs.timePos.value = (this.player.currentTime / this.player.duration) * 100;
            this.currentTime = this.player.currentTime;
        },

        updatePlayTime(e) {
            let scrubTime = (e.target.value * this.player.duration) / 100;
            this.player.currentTime = scrubTime;
        },

        addEventListener() {
            this.player.addEventListener("timeupdate", this.timeTrack);
            this.$refs.timePos.addEventListener("input", this.updatePlayTime);
        },
    }
}