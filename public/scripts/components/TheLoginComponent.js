import TheHeader from './TheHeaderComponent.js';

export default {
    name: "TheLoginComponent",

    data() {
        return {
            input:{
                username: "",
                password: "",
            },
            loginmessage: "",
            showsignup: false
        }
    },

    template:`
        <section class="login-con">
            <theheader></theheader>
            <form @submit.prevent="login()" id="login-form">
                <h2>Log in with your email</h2>
                <input type="text" placeholder="Username" v-model="input.username">
                <input type="password" placeholder="Password" v-model="input.password">
                <button type="submit" @submit.prevent="login()" class="button">CONTINUE</button>

                <P>New to ROKU?
                    <span @click="showSignUp"> Sign Up</span>
                    <span v-if="loginmessage" class="login-error">{{loginmessage}}</span>
                </P>
            </form>
        </section>
    `,

    methods: {
        login() {
            if (this.input.username !="" && this.input.password !=""){

                let loginData = JSON.stringify({username: this.input.username, password: this.input.password});
                window.localStorage.setItem("creds", loginData);

                let url = `/ums/admin/login`;

                fetch(url, {
                    method: 'POST',
                    body: loginData,
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message) {
                        console.warn("user doesnt exist or something broke");
                        this.loginmessage = data.message;
                    } else {
                        data.user_name = this.input.username;
                        this.$router.replace({name: "users"});
                    }
                })
                .catch(err => console.log(err));

            } else {
                this.loginmessage = "Please fill in required fields";
            }
        },

        showSignUp(){
            this.showsignup = this.showsignup ? false : true;
        },
    },
    components: {
        theheader: TheHeader,
    }
}