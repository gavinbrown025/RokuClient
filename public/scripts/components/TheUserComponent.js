
export default {
    name: "TheUserComponent",

    props: ['liveuser'],

    created() {
        if(this.liveuser.user_avatar == ""){
            this.liveuser.user_avatar = "temp_avatar.svg"
        }
    },

    template: `
        <div class="user-card">
            <div @click="$emit('manageuser', liveuser)" class="manage-user-overlay">
                <img class="manage-img" src="images/edit.svg" >
            </div>
            <div @click="navToHome()" class="user-img">
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