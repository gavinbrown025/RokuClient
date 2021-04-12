

export default {

    name: "TheEditUserComponent",

    data() {
        return (
            {
                input: {
                    avatar: "",
                    name: "",
                    admin: false,
                    access: 5,
                },
                title: "Add User"
            }
        )
    },

    template: `
        <section class="adduser-con">
            <div class="adduser-wrapper">
                <h2>{{title}}</h2>
                <form id="adduser-form" @submit.prevent="addUser()" class="adduser">

                    <div v-if="input.avatar" @click="chooseAvatar" class="adduser-img">
                        <img :src="'images/'+input.avatar" alt="add user icon">
                        <p>{{input.avatar}}</p>
                    </div>

                    <div v-else @click="chooseAvatar" class="adduser-img">
                        <img src="images/add_user.svg" alt="add user icon">
                        <p>Select Avatar</p>
                    </div>

                    <div class="adduser-inputs">
                        <h3>Name</h3>
                        <input v-model="input.name" name="name" type="text">

                        <div class="maturity">
                            <p>Maturity:</p>

                            <input v-model="input.access" name="maturity" type="radio" checked value="5">
                            <label for="maturity">Adult</label>

                            <input v-model="input.access" name="maturity" type="radio" value="3">
                            <label for="maturity">Child</label>
                        </div>

                        <label for="admin">Admin:</label>
                        <input v-model="input.admin" name="admin" type="checkbox" value="1">

                    </div>
                </form>
                <div class="adduser-buttons">
                    <a class="button" @click.prevent="addUser()" href="">Save</a>
                    <a class="button" @click.prevent="$emit('closeedituser')"href="">Cancel</a>
                </div>
            </div>
        </section>
    `,

    methods: {
        addUser() {
            console.log(this.input);
        //     if (this.input.username !="" && this.input.password !=""){

        //         let loginData = JSON.stringify({username: this.input.username, password: this.input.password});
        //         window.localStorage.setItem("creds", loginData);

        //         let url = `/ums/admin/login`;

        //         fetch(url, {
        //             method: 'POST',
        //             body: loginData,
        //             headers: {
        //                 'Accept': 'application/json, text/plain, */*',
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //         .then(res => res.json())
        //         .then(data => {
        //             if(data.message) {
        //                 console.warn("user doesnt exist or something broke");
        //                 this.loginmessage = data.message;
        //             } else {
        //                 data.user_name = this.input.username;
        //                 this.$router.replace({name: "users"});
        //             }
        //         })
        //         .catch(err => console.log(err));

        //     } else {
        //         this.loginmessage = "Please fill in required fields";
        //     }
        },
        editUser(){

        },
        chooseAvatar(){
            console.log("choose avatar")
        }
    },
}