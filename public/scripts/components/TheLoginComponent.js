export default {
    name: "TheLoginComponent",

    template:
        `
        <form @submit.prevent="storeCreds" method="GET" id="login-form">
            <h2>Log in with your email</h2>

            <input type="text" placeholder="Username" v-model="username">

            <input type="password" placeholder="Password" v-model="password">

            <a @click="storeCreds" class="button">CONTINUE</a>

            <P>New to ROKU?
                <span @click="showSignUp"> Sign Up</span>
                <span v-if="loginmessage" class="login-error">{{loginmessage}}</span>
            </P>
        </form>
    `,

    data: function() {
        return {
            username: "",
            password: "",
            loginmessage: ""
        }
    },

    methods: {
        storeCreds() {
            if(this.username && this.password){
                window.localStorage.setItem("creds", JSON.stringify({name: this.username, pword: this.password}));
                window.location.href = '/home';
            } else {
                window.localStorage.removeItem("creds");
                this.loginmessage = 'Failed to Authenticate. Try Again.';
            }
        },
        showSignUp(){
            window.location.href = '/signup';
        }
    }
}