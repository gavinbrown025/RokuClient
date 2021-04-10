import TheHeader from './TheHeaderComponent.js';

export default {
    name: "TheLoginComponent",

    template:`
        <section class="login-con">
            <theheader></theheader>
            <form @submit.prevent="login()" id="login-form">
                <h2>Log in with your email</h2>

                <input type="text" placeholder="Username" v-model="input.username">
                <input type="password" placeholder="Password" v-model="input.password">
                <a @click.prevent="login()" class="button">CONTINUE</a>

                <P>New to ROKU?
                    <span @click="showSignUp"> Sign Up</span>
                    <span v-if="loginmessage" class="login-error">{{loginmessage}}</span>
                </P>
            </form>
        </section>
    `,

    data: function() {
        return {
            input:{
                username: "",
                password: "",
            },
            loginmessage: ""
        }
    },

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
                        console.warn("user doesnt exist or something");
                        this.loginmessage = "user doesnt exist or something";
                    } else {
                        data.user_name = this.input.username;
                        this.$router.replace({name: "users"});
                    }
                })
                .catch(err => console.log(err));

            } else {
                this.loginmessage = "Invalid Credentials";
            }
        },

        showSignUp(){
            window.location.href = '/signup';
            //*this.$router.replace({name: "signup"});
        },
    },
    components: {
        theheader: TheHeader,
    }
}