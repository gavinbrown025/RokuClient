import TheHeader from './TheHeaderComponent.js';
import UserComponent from './TheUserComponent.js';
import EditUserComponent from './TheEditUserComponent.js';

export default {
    name: "TheAllUsersComponent",

	template: `
	<div class="wrapper user-wrapper">
        <theheader @logout="$emit('logout')"></theheader>

        <section class="users-con">
			<div class="users-title">
				<h1 class="user-message">Who's Using Roku?</h1>
			</div>

            <div class="users">
			    <user v-for="(user, index) in userList" :liveuser="user" :key="index"></user>
                <user class="kids"
                    :liveuser="{
                        user_avatar:'kids_avatar.svg',
                        user_fname:'Kids',
                        user_access: 2,
                    }">
                </user>

                <div class="user-card add" @click="editUserLB">
                    <div class="user-img">
                        <img src="images/add_user.svg">
                    </div>
                    <p>Add user</p>
                </div>
            </div>

        </section>
        <edit-user @closeedituser="editUserLB" v-if="showEditUser"/>
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
        let account = localStorage.getItem('account');

        fetch(`/ums/admin/getusers/${account}`)
            .then(res => res.json())
            .then(data => {
                this.userList = data;
            })
            .catch(err => console.error(err));
	},
    methods: {
        editUserLB(){
            this.showEditUser = this.showEditUser ? false : true;
        }
    },

	components: {
        theheader: TheHeader,
		user: UserComponent,
		'edit-user': EditUserComponent,
	}
}