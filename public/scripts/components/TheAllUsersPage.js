import TheHeader from './TheHeaderComponent.js';
import UserComponent from './TheUserComponent.js';
import EditUserComponent from './TheEditUserComponent.js';

export default {
    name: "TheAllUsersComponent",


    data() {
        return (
            {
                userList: [],
                showEditUser: false,
                title: "Add user",
                manageprofiles: false,
                liveuser: {}
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

	template: `
        <div class="wrapper user-wrapper">
            <theheader @logout="$emit('logout')"></theheader>

            <section class="users-con">
                <div class="users-title">
                    <h1 class="user-message">Who's Using Roku?</h1>
                </div>

                <div :class="{'manage' : manageprofiles}" class="users">
                    <user @manageuser="editUserLB" v-for="(user, index) in userList" :liveuser="user" :key="index"></user>
                    <user class="kids-avatar"
                        :liveuser="{
                            user_avatar:'kids_avatar.svg',
                            user_fname:'Kids',
                            user_access: 2,
                        }">
                    </user>

                    <div class="user-card add" @click="editUserLB('add')">
                        <div class="user-img">
                            <img src="images/add_user.svg">
                        </div>
                        <p>Add user</p>
                    </div>
                </div>
                <a @click.prevent="showManage" class="button">Manage Profiles</a>

            </section>
            <edit-user :user="{title, liveuser}" @closeedituser="editUserLB" v-if="showEditUser"/>
        </div>
	`,

    methods: {
        editUserLB(user){
            this.showEditUser = this.showEditUser ? false : true;

            if(typeof user !== 'string'){
                this.liveuser = user;
                this.title = 'Edit User';
            }
        },
        showManage(){
            this.manageprofiles = this.manageprofiles ? false : true;
        }
    },

	components: {
        theheader: TheHeader,
		user: UserComponent,
		'edit-user': EditUserComponent,
	}
}