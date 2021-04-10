
export default {
    name: "TheUserComponent",

    props: ['liveuser'],

    created() {
        if(this.liveuser.user_avatar == null){
            this.liveuser.user_avatar = "temp_avatar.svg"
        }
        console.log(this.liveuser.user_avatar);
    },

    template: `
        <div @click="navToHome()">
            <img :src="'images/' + liveuser.user_avatar">
            <p>{{ liveuser.user_fname }}</p>
        </div>`,

    methods: {
        navToHome(){
            window.localStorage.setItem("cacheduser", JSON.stringify(this.liveuser));
            this.$router.push({ name: "home", params:{currentuser: this.liveuser}});
        }
    }
}