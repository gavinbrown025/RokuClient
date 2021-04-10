import TheHeader from './TheHeaderComponent.js';
import UserComponent from './TheUserComponent.js';

export default {
    name: "TheAllUsersComponent",

	template: `
	<div class="wrapper user-wrapper">
        <theheader></theheader>
        <section class="users-con">
			<div class="users-title">
				<h1 class="user-message">Who's Using Roku?</h1>
			</div>
            <div class="users">
			    <user class="user-card" v-for="(user, index) in userList" :liveuser="user" :key="index"></user>
            </div>
        </section>
    </div>
	`,

    data() {
        return (
            {
                userList: []
            }
        )
    },

	created() {
        fetch(`/ums/admin/getusers`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.userList = data;
            })
            .catch(err => console.error(err));
	},

	components: {
        theheader: TheHeader,
		user: UserComponent,
	}
}