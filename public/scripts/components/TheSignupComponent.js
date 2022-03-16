import TheAvatarComponent from './TheAvatarComponent.js'
import TheHeader from './TheHeaderComponent.js'

export default {
	name: 'TheSignupComponent',

	data() {
		return {
			signupData: {
				fname: '',
				username: '',
				password: '',
				email: '',
				avatar: '',
				admin: 1,
				access: 5,
				account: window.crypto.getRandomValues(new Uint32Array(1))[0],
			},
			signupmessage: '',
			showAvatars: false,
		}
	},

	template: `
        <section class="signup-con">
            <theheader></theheader>
            <form id="signup-form" @submit.prevent="signup()" class="signup">
                <div class="signup-header">
                    <h2 v-if="signupmessage">{{signupmessage}}</h2>
                    <h2 v-else >Signup</h2>
                    <div v-if="signupData.avatar" @click="seeAvatars" class="avatar-img">
                        <img :src="'images/'+signupData.avatar" alt="signup icon">
                    </div>

                    <div v-else @click="seeAvatars" class="avatar-img">
                        <img src="images/add_user.svg" alt="add user icon">
                        <p>Select Avatar</p>
                    </div>
                </div>

                <label>Name</label>
                <input v-model="signupData.fname" name="name" type="text" required>

                <label>Username</label>
                <input v-model="signupData.username" name="username" type="text" required>

                <label>Password</label>
                <input v-model="signupData.password" name="password" type="password" required>

                <label>Email</label>
                <input v-model="signupData.email" name="email" type="email" required>

                <div class="signup-buttons">
                    <a class="button" @click.prevent="signup()" href="">Save</a>
                    <router-link class="button" :to="{name: 'root'}">Cancel</router-link>
                </div>
            </form>


            <avatar-select
                v-if="showAvatars"
                @seeavatars="seeAvatars"
                @selectavatar="selectAvatar">
            </avatar-select>

        </section>
    `,
	methods: {
		signup() {
			let signupData = JSON.stringify({ ...this.signupData })
			let url = `/ums/admin/signup`

			fetch(url, {
				method: 'POST',
				body: signupData,
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					this.signupmessage = data.message
					if (data.success) {
						window.localStorage.setItem('account', this.signupData.account)
						setTimeout(() => {
							this.$router.replace({ name: 'users' })
						}, 1500)
					}
				})
				.catch((err) => console.log(err))
		},

		seeAvatars() {
			this.showAvatars = this.showAvatars ? false : true
		},

		selectAvatar(avatar) {
			this.signupData.avatar = avatar
			this.showAvatars = false
		},
	},
	components: {
		theheader: TheHeader,
		'avatar-select': TheAvatarComponent,
	},
}
