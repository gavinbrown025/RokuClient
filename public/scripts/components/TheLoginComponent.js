import TheHeader from './TheHeaderComponent.js';

export default {
    name: "TheLoginComponent",

    data() {
        return {
            loginInput:{
                username: "",
                password: "",
            },
            loginmessage: "",

            signupData:{
                fname:"a",
                username: "a",
                password: "a",
                email: "a@a.a",
                admin: 1,
                access: 5,
            },
            signupmessage: "",

            showsignup: false
        }
    },

    template:`
        <section class="login-con">
            <theheader></theheader>
            <form @submit.prevent="login()" id="login-form">
                <h2>Log in with your email</h2>
                <input type="text" placeholder="Username" v-model="loginInput.username">
                <input type="password" placeholder="Password" v-model="loginInput.password">
                <button type="submit" @submit.prevent="login()" class="button">CONTINUE</button>

                <P>New to ROKU?
                    <span @click="signup"> Sign Up</span>
                    <span v-if="loginmessage" class="login-error">{{loginmessage}}</span>
                </P>
            </form>
        </section>
    `,

    methods: {
        login() {
            if (this.loginInput.username !="" && this.loginInput.password !=""){

                let loginData = JSON.stringify({
                    username: this.loginInput.username,
                    password: this.loginInput.password
                });

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
                        console.log(data);
                        window.localStorage.setItem("account", data.account_id);
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

        signup(){
            let signupData = JSON.stringify({
                fname: this.signupData.fname,
                username: this.signupData.username,
                password: this.signupData.password,
                email: this.signupData.email,
                admin: this.signupData.admin,
                access: this.signupData.access
            });

            let url = `/ums/admin/signup`;

            fetch(url, {
                method: 'POST',
                body: signupData,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
        }
    },

    components: {
        theheader: TheHeader,
    }
}