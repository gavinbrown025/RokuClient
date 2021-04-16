import EditUserComponent from './TheEditUserComponent.js';

export default {

    name: 'TheHeaderComponent',

    data() {
        return {
            liveuser: undefined,
            showsettings: false,
            showsearch: false,
            showEditUser: false
        }
    },

    created() {
        if(localStorage.getItem('cacheduser')){
            this.liveuser = JSON.parse(localStorage.getItem('cacheduser'));
        }
    },

    template: `
        <header>
            <div class="logo">
                <img src="images/roku-logo.png" alt="Roku Logo">
            </div>

            <div v-if="liveuser" class="header-home">
                <nav class="main-nav">
                    <ul>
                        <li>
                            <router-link to="/home">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/movies">All Movies</router-link>
                        </li>
                        <li>
                            <router-link to="/music">Music</router-link>
                        </li>
                        <li>
                            <router-link to="/kids">Kids</router-link>
                        </li>
                    </ul>
                </nav>

                <div class="header-meta">
                    <form @submit.prevent="search" class="search">
                        <input :class="{'show' : showsearch}" class="search-bar" type="text">
                        <img @click="search" src="images/search.svg" alt="search icon">
                    </form>
                    <div @click="showSettings" class="dropdown-arrow-con">
                        <div class="dropdown-arrow"></div>
                    </div>
                    <div class="user-avatar-icon">
                        <img @click="showSettings" :src="'images/'+liveuser.user_avatar" alt="user avatar">
                    </div>
                </div>

                <div :class="{'show' : showsettings}" class="user-dropdown">
                    <div class="dropdown-meta">
                        <p>{{liveuser.user_fname}}</p>
                        <div class="user-avatar-icon">
                            <img @click="showSettings" :src="'images/'+liveuser.user_avatar" alt="user avatar">
                        </div>
                    </div>
                    <ul>
                        <li class="res-nav">
                            <router-link to="/home">Home</router-link>
                        </li>
                        <li class="res-nav">
                            <router-link to="/movies">All Movies</router-link>
                        </li>
                        <li class="res-nav">
                            <router-link to="/music">Music</router-link>
                        </li>
                        <li class="res-nav">
                            <router-link to="/kids">Kids</router-link>
                        </li>
                        <li>
                            <router-link to="/users">Switch User</router-link>
                        </li>
                        <li>
                            <a @click.prevent="editUserLB">Edit Profile</a>
                        </li>
                        <li @click="$emit('logout')">
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>

            <edit-user @closeedituser="editUserLB" v-if="showEditUser"/>
        </header>
    `,
    methods: {
        showSettings(){
            this.showsettings = this.showsettings ? false : true;
        },
        showSearch(){
            this.showsearch = this.showsearch ? false : true;
        },

        editUserLB(){
            this.showEditUser = this.showEditUser ? false : true;
        },
        search() {
            console.log('search');
        },
    },
    components: {
		'edit-user': EditUserComponent,
	}
}