import TheAvatarComponent from "./TheAvatarComponent.js";

export default {

    name: "TheEditUserComponent",

    data() {
        return {
            title: "Add User",
            avatarList:[],
            showAvatars: false,
            userData: {
                fname: "",
                avatar: "",
                admin: 0,
                access: 5,
            },
            addusermessage: ""
        }
    },

    created() {
        fetch(`/ums/avatar`)
        .then(res => res.json())
        .then(data => this.avatarList = data);
    },

    template: `
        <section class="adduser-con">
            <div class="adduser-wrapper">
                <h2>{{title}}</h2>
                <form id="adduser-form" @submit.prevent="addUser()" class="adduser">

                    <div v-if="userData.avatar" @click="seeAvatars" class="avatar-img">
                        <img :src="'images/'+userData.avatar" alt="add user icon">
                        <p>Select Avatar</p>
                    </div>

                    <div v-else @click="seeAvatars" class="avatar-img">
                        <img src="images/add_user.svg" alt="add user icon">
                        <p>Select Avatar</p>
                    </div>

                    <div class="adduser-inputs">
                        <label>Name</label>
                        <input v-model="userData.fname" name="name" type="text">

                        <div class="maturity">
                            <p>Maturity:</p>

                            <input v-model="userData.access" name="maturity" type="radio" checked value="5">
                            <label for="maturity">Adult</label>

                            <input v-model="userData.access" name="maturity" type="radio" value="2">
                            <label for="maturity">Child</label>
                        </div>

                        <label v-if="userData.access > 2" for="admin">Admin:</label>
                        <input v-if="userData.access > 2" v-model="userData.admin" name="admin" type="checkbox" value="1">
                    </div>
                </form>

                <p>{{addusermessage}}</p>

                <div class="adduser-buttons">
                    <a class="button" @click.prevent="addUser()" href="">Save</a>
                    <a class="button" @click.prevent="$emit('closeedituser')"href="">Cancel</a>
                </div>
            </div>

            <avatar-select
                v-if="showAvatars"
                @seeavatars="seeAvatars"
                @selectavatar="selectAvatar">
            </avatar-select>

        </section>
    `,

    methods: {
        addUser() {
            if (this.userData.fname !=""){

                this.userData.admin = (this.userData.admin) ? 1 : 0;
                let account = localStorage.getItem('account');

                let userData = JSON.stringify({
                    fname: this.userData.fname,
                    admin: this.userData.admin,
                    access: this.userData.access,
                    avatar: this.userData.avatar,
                    account: account,
                });

                fetch(`ums/adduser`, {
                    method: 'POST',
                    body: userData,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.addusermessage = data.message;
                    if(data.success){
                        setTimeout(() =>{
                            this.$router.go();
                        },2000)
                    }
                })
                .catch(err => console.log(err));
            } else {
                this.addusermessage = "You have to put a name at least";
            }
        },
        editUser(){

        },
        seeAvatars(){
            this.showAvatars = this.showAvatars ? false : true;
        },
        selectAvatar(avatar){
            this.userData.avatar = avatar;
            this.showAvatars = false;
        }
    },

    components:{
        'avatar-select': TheAvatarComponent
    }

}