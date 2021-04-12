import TheHeader from './TheHeaderComponent.js';
import UserComponent from './TheUserComponent.js';
import EditUserComponent from './TheEditUserComponent.js';

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

                <div class="user-card" @click="EditUserLB">
                    <div class="user-img add">
                        <img src="images/add_user.svg">
                    </div>
                    <p>Add user</p>
                </div>
            </div>

            <edit-user @closeedituser="EditUserLB" v-if="showEditUser"/>
        </section>
    </div>
	`,

    data() {
        return (
            {
                userList: [],
                showEditUser: false
            }
        )
    },

	created() {
        fetch(`/ums/admin/getusers`)
            .then(res => res.json())
            .then(data => {
                this.userList = data;
            })
            .catch(err => console.error(err));
	},
    methods: {
        EditUserLB(){
            this.showAddUser = this.showAddUser ? false : true;
        }
    },

	components: {
        theheader: TheHeader,
		user: UserComponent,
		'edit-user': EditUserComponent,
	}
}