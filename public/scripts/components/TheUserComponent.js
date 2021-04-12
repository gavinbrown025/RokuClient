
export default {
    name: "TheUserComponent",

    props: ['liveuser'],

    created() {
        if(this.liveuser.user_avatar == null){
            this.liveuser.user_avatar = "temp_avatar.svg"
        }
    },

    template: `
        <div @click="navToHome()">
            <div class="user-img">
                <img :src="'images/' + liveuser.user_avatar">
            </div>
            <p>{{ liveuser.user_fname }}</p>
        </div>`,

    methods: {
        navToHome(){
            window.localStorage.setItem("cacheduser", JSON.stringify(this.liveuser));
            this.$router.push({ name: "home", params:{currentuser: this.liveuser}});
        }
    }
}