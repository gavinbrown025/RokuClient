import TheAvatarComponent from "./TheAvatarComponent.js";

export default {

    name: "TheEditUserComponent",

    props: ['user'],

    data() {
        return {
            avatarList:[],
            showAvatars: false,
            userData: {
                id: null,
                fname: "",
                avatar: "",
                admin: 0,
                access: 5,
            },
            message: ""
        }
    },

    created() {
        fetch(`/ums/avatar`)
        .then(res => res.json())
        .then(data => this.avatarList = data);

        if(typeof this.user.liveuser != 'undefined'){
            this.userData.id = this.user.liveuser.user_id;
            this.userData.fname = this.user.liveuser.user_fname;
            this.userData.avatar = this.user.liveuser.user_avatar;
            this.userData.admin = this.user.liveuser.user_admin;
            this.userData.access = this.user.liveuser.user_access;
        }
    },

    template: `
        <section class="adduser-con">
            <div  class="adduser-wrapper">
                <div class="adduser-header">
                    <h2>{{user.title}}</h2>
                    <a v-if="user.liveuser.user_id && !user.liveuser.user_email" @click.prevent="deleteUser()" class="user-delete">Delete</a>
                </div>

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
                        <label>Name:</label>
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

                <p>{{message}}</p>

                <div class="adduser-buttons">
                    <a v-if="user.liveuser.user_id" @click.prevent="addUser('edituser')" class="button">Save</a>
                    <a v-else @click.prevent="addUser('adduser')" class="button">Save</a>
                    <a class="button" @click.prevent="$emit('closeedituser', 'close')">Cancel</a>
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
        addUser(type) {
            if (this.userData.fname !=""){

                this.userData.admin = (this.userData.admin) ? 1 : 0;
                let account = localStorage.getItem('account');

                let userData = JSON.stringify({
                    fname: this.userData.fname,
                    admin: this.userData.admin,
                    access: this.userData.access,
                    avatar: this.userData.avatar,
                    account: account,
                    id: this.userData.id
                });

                let url = `ums/${type}`;

                fetch(url, {
                    method: 'POST',
                    body: userData,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.message = data.message;

                    if(data.success){
                        setTimeout(() =>{
                            this.$router.go();
                        },1000)
                    }
                })
                .catch(err => console.log(err));
            } else {
                this.message = "You have to put a name at least";
            }
        },
        deleteUser() {

            let id = JSON.stringify({id: this.userData.id});

            fetch('ums/deleteuser', {
                method: 'POST',
                body: id,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.message = data.message;
                if(data.success){
                    setTimeout(() =>{
                        this.$router.go();
                    },1000)
                }
            })
            .catch(err => console.log(err));
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